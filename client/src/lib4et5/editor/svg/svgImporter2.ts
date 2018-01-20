import { workspace } from '../workspace';
import { editorObject } from '../editorObject';
import { svgAutoHeightHelper } from './svgAutoHeightHelper';
import { injectNew } from '../../tools/injector';
import { svgHelper } from './svgHelper';
import { vec3, vec2, vec4, mat4 } from "gl-matrix";
import { svgDecomposition, svgDecompositionPart } from "./svgDecomposition";
import { boundingBoxComputer } from './boundingBoxComputer';
import { imageCropper } from './imageCropper';

    export class svgImporter2
    {
        svgAutoHeightHelper:svgAutoHeightHelper = injectNew(svgAutoHeightHelper);
        boundingBoxComputer:boundingBoxComputer = injectNew(boundingBoxComputer);
        imageCropper:imageCropper = injectNew(imageCropper);

        workspace:workspace ;
        
        indexObject = 0;
        indexReimport = 0;
        tmpTranslation = vec3.create();

        async importDecompositionInWorkspace(workspace:workspace, decomposition:svgDecomposition)
        {
            this.workspace = workspace;
            let i = 0;
            for (let part of decomposition.parts) {
                i++;
                await this.import(part, i*0.02);
            }
        }

        async import(part:svgDecompositionPart, height:number)
        {
            //$('.debug').append(this.helper.canvas);
            //$('.debug').append(this.helper.canvas2);
            let size:vec2;
            let center:vec2;
            let boundingInPx:number[];
            let optimizeSize = false;
            if (optimizeSize) {
                await this.boundingBoxComputer.setImg(part.imgElement);
                this.boundingBoxComputer.setRealSizeToFit(vec2.fromValues(1, 1));
                size = this.boundingBoxComputer.getBoundingRealSize();
                center = this.boundingBoxComputer.getRealCenter();
                boundingInPx = this.boundingBoxComputer.getBoundingBoxInPx();
            }    
            else {
                size = vec2.fromValues(1, 1);
                center =  vec2.fromValues(0, 0);    
                boundingInPx = [0, 0, part.imgElement.width, part.imgElement.height];
                console.log('boundingInPx', boundingInPx);
            }
            //console.log('size :' , size, 'center', center, 'autoHeight', autoHeight);

            var l = new editorObject();
            this.workspace.pushObject(l);
            //l.topSvgId = id;
            this.imageCropper.crop(part.imgElement, boundingInPx);
            console.log('this.imageCropper.croppedCanvas ', this.imageCropper.croppedCanvas.width, this.imageCropper.croppedCanvas.height);
            

            l.setTopImg2(this.imageCropper.croppedCanvas, vec4.fromValues(-0.5*size[0], -0.5*size[1], 0.5*size[0], 0.5*size[1]));
            l.setProfileHeight(height);
            
            l.setDiffuseColor([0.5, 0.5, height]);
            mat4.identity(l.inverseTransform);
            mat4.translate(l.inverseTransform, l.inverseTransform, vec3.fromValues(center[0], center[1], 0))
            mat4.invert(l.inverseTransform, l.inverseTransform);
            
            // TODO Etienne
            //l.updateSignedDistance();
            
            //l.top.debugInfoInCanvas();
            //$('.debug').append(l.profile.canvas);              
        }
    }

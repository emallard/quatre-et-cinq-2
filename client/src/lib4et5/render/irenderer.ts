import { renderSettings } from './renderSettings';
import { signedDistance } from '../scene/signedDistance';
import { texturePacker } from './texturePacker';
import { sdFields } from '../scene/sdFields';

    export interface irenderer
    {
        setContainerAndSize(element:HTMLElement, rWidth:number, rHeight:number);

        renderDebug(x:number, y:number, settings: renderSettings);

        render(settings: renderSettings);

        getCanvas():HTMLCanvasElement;
        getViewportWidth():number;
        getViewportHeight():number;

        showBoundingBox(b:boolean);

        updateShader(sd:signedDistance, lightCount:number, packer:texturePacker);
        updateAllUniformsForAll();
        updateAllUniforms(sd: signedDistance);
        updateDiffuse(sd: signedDistance);
        updateTransform(sd: signedDistance);
        updateFloatTextures(sd: sdFields);
        updateAllPackedTextures(packer:texturePacker);
    }

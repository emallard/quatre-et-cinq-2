import { sdIntersection } from './sdIntersection';
import { camera } from '../render/camera';
import { directionalLight } from '../render/directionalLight';
import { spotLight } from '../render/spotLight';
import { scRenderer } from './scRenderer';
import { sdBorder } from './sdBorder';
import { sdBox } from './sdBox';
import { sdFields } from './sdFields';
import { sdGrid } from './sdGrid';
import { sdGrid2 } from './sdGrid2';
import { pointLight } from '../render/pointLight';
import { sdPlane } from './sdPlane';
import { sdRepeat } from './sdRepeat';
import { sdSphere } from './sdSphere';
import { sdSubtraction } from './sdSubtraction';
import { sdUnion } from './sdUnion';
import { signedDistance } from './signedDistance';
import { runAll } from '../tools/runAll';
import { scImage, scImageDTO } from './scImage';
import { sceneBase } from './sceneBase';

    export class scene
    {
        sceneBase = new sceneBase();
        constructor()
        {
            var s = this.sceneBase;
            s.register('cameraDTO', camera);
            s.register('pointLightDTO', pointLight);
            s.register('directionalLightDTO', directionalLight);
            s.register('spotLightDTO', spotLight);
            
            s.register('scRendererDTO', scRenderer);
            s.register('sdBorderDTO', sdBorder);
            s.register('sdBoxDTO', sdBox);
            s.register('sdFieldsDTO', sdFields);
            s.register('sdGridDTO', sdGrid);
            s.register('sdGrid2DTO', sdGrid2);
            s.register('sdIntersectionDTO', sdIntersection);
            s.register('sdPlaneDTO', sdPlane);
            s.register('sdRepeatDTO', sdRepeat);
            s.register('sdSphereDTO', sdSphere);
            s.register('sdSubtractionDTO', sdSubtraction);
            s.register('sdUnionDTO', sdUnion);
        }

        public setDebug(b:boolean)
        {
            this.sceneBase.debugInfo = b;
        }

        public create(sceneDTO:any, done:()=>void)
        {
            this.loadImages(sceneDTO, ()=>this.createStep2(sceneDTO, done));
            //this.loadDistanceFields(sceneDTO, ()=>this.createStep2(sceneDTO, done));
        }

        public createOne(sceneDTO:any, name:string)
        {
            return this.sceneBase.createOne(name, sceneDTO[name]);
        }

        private createStep2(sceneDTO:any, done:()=>void)
        {
            this.sceneBase.create(sceneDTO);
            done();
        }

        public get<T>(predicate:(Object)=>boolean, name:string) : T
        {
            var found = this.sceneBase[name];
            if (predicate(found))
                return found;
            throw "object not found in scene: " + name;
        }

        public getCamera(name:string) : camera
        {
            var found = this.sceneBase[name];
            if (found instanceof camera)
                return found;
            throw "camera not found : " + name;
        }

        public getSignedDistance(name: string) : signedDistance
        {
            var found = this.sceneBase[name];
            if (found) 
                return found;
            throw "signedDistance not found : " + name;
        }

        private loadImages(sceneDTO:any, done:()=>void)
        {
            console.log('load images');
            var run = new runAll();
            for (var key in sceneDTO)
            {
                var dto = sceneDTO[key];
                if (dto['type'] == 'scImageDTO')
                {
                    this.addLoadImage(run, <scImageDTO> dto);
                }
            }
            run.run(done);
        }


        private addLoadImage(run:runAll, dto:scImageDTO)
        {
            run.push((_done) => 
            {    
                var scImg = new scImage();
                dto['__instance'] = scImg;
                console.log('Load image : ' + dto.src);
                scImg.createAsyncFrom(dto, _done);
            });
        }

        /*
        private loadDistanceFields(sceneDTO:any, done:()=>void)
        {
            var run = new runAll();
            for (var key in sceneDTO)
            {
                var dto = sceneDTO[key];
                if (dto['type'] == 'scFloatTextureDTO')
                {
                    this.addLoadDistanceField(run, <scFloatTextureDTO> dto);
                }
            }
            run.run(done);
        }

        private addLoadDistanceField(run:runAll, dto:scFloatTextureDTO)
        {
            console.log('Loading distanceField : ' + dto['src']);
            run.push((_done) => 
            {    
                var df = new scFloatTexture();
                (<any> dto).__instance = df;
                df.createAsyncFrom(dto, _done);
            });
        }
        */
    }


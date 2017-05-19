import { mat4Translate } from '../../tools/jsFunctions';
import { pushExample } from './ex0';
import { camera, cameraDTO } from '../../render/camera';
import { spotLightDTO } from '../../render/spotLight';
import { sdPlaneDTO } from '../sdPlane';
import { material } from '../material';
import { sdBoxDTO } from '../sdBox';
import { sdUnionDTO } from '../sdUnion';
import { scRendererDTO } from '../scRenderer';

    pushExample("BoxAndShadow", ()=>new exBoxAndShadow());

    export class exBoxAndShadow
    {
        camera: cameraDTO = {
            type: 'cameraDTO',
            position: [1, -5, 2],//[3,-5,5],
            target : [0,1,0],
            up : [0,0,1],
            fov : Math.PI/6
        };

        light : spotLightDTO = {
            type: 'spotLightDTO',
            position : [-1, -1, 2],
            direction : [1, 1, 2],
            intensity : 1
        };

        plane : sdPlaneDTO = {
            type: 'sdPlaneDTO',
            normal: [0, 0, 1],
            material : {
                type:'materialDTO',
                diffuse : [1, 1, 1] 
            }
        };

        box : sdBoxDTO = {
            type: 'sdBoxDTO',
            halfSize: [0.3, 0.3, 0.4],
            //transform: [0, 0, 0.4],
            material : {
                type:'materialDTO',
                diffuse : [1, 0, 0] 
            },
            transform : mat4Translate(0, 0, 0.45)
        };

        union : sdUnionDTO = {
            type: 'sdUnionDTO',
            a: this.plane,
            b: this.box,
        }

        render : scRendererDTO = {
            type: 'scRendererDTO',
            spotLights: [this.light],
            directionalLights : [],
            distance : this.union,
            camera : this.camera,
        }
    }

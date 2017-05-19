import { signedDistance } from '../scene/signedDistance';
import { directionalLight } from './directionalLight';
import { spotLight } from './spotLight';
import { camera } from './camera';

    export class renderSettings
    {
        sd:signedDistance; 
        
        directionalLights:directionalLight[] = [];
        spotLights:spotLight[] = [];
        
        camera:camera = new camera();
        shadows:boolean;
        refraction:boolean;
        boundingBoxes:boolean;
    }

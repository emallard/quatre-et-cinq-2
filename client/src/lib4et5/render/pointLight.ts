import { vec3FromArray } from '../tools/dto';
import { ilight } from './ilight';
import { vec3 } from "gl-matrix";

    export class pointLightDTO
    {
        type:string;
        position:number[];
    }

    export class pointLight implements ilight
    {
        position = vec3.create();
        createFrom(dto:pointLightDTO)
        {
            vec3FromArray(this.position, dto.position);
        }
    }

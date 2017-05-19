import { vec3FromArray } from '../tools/dto';
import { ilight } from './ilight';
import { vec3 } from "gl-matrix";

    export class spotLightDTO
    {
        type:string;
        position:number[];
        direction:number[];
        intensity:number;
    }

    export class spotLight implements ilight
    {
        position = vec3.create();
        direction = vec3.create();
        intensity = 1;

        createFrom(dto:spotLightDTO)
        {
            vec3FromArray(this.position, dto.position);
            vec3FromArray(this.direction, dto.direction);
            this.intensity = dto.intensity;

            vec3.normalize(this.direction, this.direction);
        }
    }

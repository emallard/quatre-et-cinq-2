import { vec3FromArray } from '../tools/dto';
import { vec3 } from "gl-matrix";

/*
    export interface material
    {
        getColor(pos: Float32Array, out:Float32Array);
    }
*/
    export interface materialDTO
    {
        type:string;
        diffuse:number[];
    }

    export class material
    {
        diffuse = vec3.create();

        createFrom(dto:materialDTO)
        {
            vec3FromArray(this.diffuse, dto.diffuse);
        }

        getColor(out:vec3)
        {
            vec3.copy(out, this.diffuse);
        }

        setDiffuse(r:number, g:number, b:number)
        {
            vec3.set(this.diffuse, r, g, b);
        }
    }

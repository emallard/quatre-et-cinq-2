import { fmod } from '../tools/jsFunctions';
import { material, materialDTO } from './material';
import { signedDistance } from './signedDistance';
import { canCreate } from '../tools/dto';
import { vec3, mat4 } from "gl-matrix";

    export class sdGridDTO {
        type : string = 'sdGridDTO';
        size : number;
        thickness:number;
        material: materialDTO;
        
    }

    export class sdGrid implements signedDistance, canCreate<sdGridDTO>
    {
        material = new material();
        size = vec3.create();
        thickness:number;
        d = vec3.create();
        mod = vec3.create();

        createFrom(dto:sdGridDTO)
        {
            vec3.set(this.size, dto.size, dto.size, dto.size);    
            this.thickness = dto.thickness;
            this.material.createFrom(dto.material)
        }

        getDist2(pos: Float32Array, rd:Float32Array, boundingBox:boolean, debug:boolean):number
        {
            return 1000;            
        }
        

        getDist(pos: Float32Array, boundingBox:boolean, debug:boolean):number
        {
            for (var i = 0; i < 3; ++i)
            {
                this.d[i] = 0.5*this.size[i] - Math.abs( fmod(pos[i], this.size[i]) - 0.5*this.size[i] );
            }    
            var dMin = Math.min(this.d[0], this.d[1], this.d[2]);
            
            return dMin - this.thickness;
        }

        getMaterial(pos: Float32Array):material
        {
            return this.material;
        }

        getInverseTransform(out:mat4)
        {
            mat4.identity(out);
        }

        getBoundingBox(out: vec3)
        {
            vec3.set(out, 100, 100, 100);
        }
    }

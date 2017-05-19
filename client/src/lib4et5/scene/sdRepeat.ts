import { fmod } from '../tools/jsFunctions';
import { signedDistance } from './signedDistance';
import { vec3FromArray } from '../tools/dto';
import { vec3, mat4 } from "gl-matrix";

    export class sdRepeatDTO
    {
        type:string;
        sd : any;
        box : number[];
    }

    export class sdRepeat implements signedDistance
    {
        sd : signedDistance;
        box = vec3.create();
        q = vec3.create();
        
        createFrom(dto:sdRepeatDTO)
        {

            this.sd = <signedDistance> (dto.sd['__instance']);
            vec3FromArray(this.box, dto.box);
        }


        getDist2(pos: Float32Array, rd:Float32Array, boundingBox:boolean, debug:boolean):number
        {
            return 1000;
            /*
            var d = 66666;
            var l = this.array.length;
            for (var i=0; i < l; ++i)
                d = Math.max(d, this.array[i].getDist2(pos, rd, boundingBox, debug));

            return d;
            */
        }

        getDist(pos: Float32Array, boundingBox:boolean, debug:boolean):number
        {
            for (var i=0; i < 3; ++i)
            {
                this.q[i] = fmod(pos[i], this.box[i]) - 0.5*this.box[i];
            }
            
            return this.sd.getDist(this.q, boundingBox, debug);
        }


        getMaterial(pos: Float32Array)
        {
            return this.sd.getMaterial(pos);
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

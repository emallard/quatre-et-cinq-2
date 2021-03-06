import { signedDistance } from './signedDistance';
import { material } from './material';
import { canCreate } from '../tools/dto';
import { sdUnionDTO } from './sdUnion';
import { mat4, vec3 } from "gl-matrix";

    export class sdIntersectionDTO
    {
        type:string;
        a : any;
        b : any;
    }

    export class sdIntersection implements signedDistance, canCreate<sdUnionDTO>
    {
        array : signedDistance[] = [];

        createFrom(dto:sdIntersectionDTO)
        {

            this.array[0] = <signedDistance> (dto.a['__instance']);
            this.array[1] = <signedDistance> (dto.b['__instance']);
        }


        getDist2(pos: Float32Array, rd:Float32Array, boundingBox:boolean, debug:boolean):number
        {
            var d = 66666;
            var l = this.array.length;
            for (var i=0; i < l; ++i)
                d = Math.max(d, this.array[i].getDist2(pos, rd, boundingBox, debug));

            return d;
        }

        getDist(pos: Float32Array, boundingBox:boolean, debug:boolean):number
        {
            var d = 0;
            var l = this.array.length;
            for (var i=0; i < l; ++i)
                d = Math.max(d, this.array[i].getDist(pos, boundingBox, debug));
            
            return d;
        }


        getMaterial(pos: Float32Array)
        {
            var min = 666;
            var minMat:material;
            var l = this.array.length;
            for (var i=0; i < l; ++i)
            {
                if (this.array[i].getDist(pos, false, false) < min)
                {
                    minMat = this.array[i].getMaterial(pos);
                }
            }
            if (minMat == null)
                return new material();
            
            return minMat;
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

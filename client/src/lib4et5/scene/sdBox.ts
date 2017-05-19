import { vec3TransformMat4RotOnly } from '../tools/jsFunctions';
import { material, materialDTO } from './material';
import { canCreate, mat4FromArray, vec3FromArray } from '../tools/dto';
import { makeRay, Ray, raybox } from './raybox';
import { signedDistance } from './signedDistance';
import { vec3, mat4 } from "gl-matrix";

    export class sdBoxDTO {
        type : string = 'sdBoxDTO';
        halfSize : number[];
        material: materialDTO;
        transform:number[];
    }

    export class sdBox implements signedDistance, canCreate<sdBoxDTO>
    {
        halfSize = vec3.create();
        private tmp = vec3.create();
        private tmpPos = vec3.create();
        material = new material();
        inverseTransform = mat4.create();

        createFrom(dto:sdBoxDTO)
        {
            vec3FromArray(this.halfSize, dto.halfSize);
            this.material.createFrom(dto.material)
            mat4FromArray(this.inverseTransform, dto.transform)
            mat4.invert(this.inverseTransform, this.inverseTransform);    
        }

        setHalfSize(sx:number, sy:number, sz:number)
        {
            vec3.set(this.halfSize, sx, sy, sz);
        }

        transformedRay = new Ray();
        transformedRd = vec3.create();
        aabb:vec3[] = [vec3.create(), vec3.create()];

        getDist2(pos: vec3, rd:vec3, boundingBox:boolean, debug:boolean):number
        {
            this.getBoundingBox(this.aabb);
            // create a ray, from transformed position, and transformed direction
            vec3.transformMat4(this.tmp, pos, this.inverseTransform);
            vec3TransformMat4RotOnly(this.transformedRd, rd, this.inverseTransform);
            makeRay(this.transformedRay, this.tmp, this.transformedRd);

            var t = raybox.intersection(this.transformedRay, this.aabb, debug);
            if (debug) console.log('tttt ' + t);
            if (t <= 0.01)
                return this.getDist(pos, boundingBox, debug);

            return t;
        }

        getBoundingBox(out: vec3[])
        {
            vec3.scale(out[0], this.halfSize, -1);
            vec3.scale(out[1], this.halfSize, 1);
        }

        getDist(pos: vec3, boundingBox:boolean, debug:boolean):number
        {
            vec3.transformMat4(this.tmpPos, pos, this.inverseTransform);

            //vec3 d = abs(p) - b;
            //return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
            
            var dx = Math.abs(this.tmpPos[0]) - this.halfSize[0];
            var dy = Math.abs(this.tmpPos[1]) - this.halfSize[1];
            var dz = Math.abs(this.tmpPos[2]) - this.halfSize[2];
            var mc = Math.max(dx, dy, dz);

            var t = this.tmp;
            t[0] = Math.max(dx, 0);
            t[1] = Math.max(dy, 0);
            t[2] = Math.max(dz, 0);
            
            return Math.min(mc, 0) + vec3.length(t);
        }

        getMaterial(pos: vec3):material
        {
            return this.material
        }

        getInverseTransform(out:mat4)
        {
            mat4.copy(out, this.inverseTransform);
        }

    }

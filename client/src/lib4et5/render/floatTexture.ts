import { distanceField } from './distanceField';

    export class floatTexture {

        width:number;
        height:number;
        data:Float32Array;
    }

    export function createFloatTextureFromDistanceField(df:distanceField)
    {
        var texture = new floatTexture();
        texture.width = df.M;
        texture.height = df.N;
        texture.data = new Float32Array(df.M * df.N * 4);
        for (var q=0; q < texture.width*texture.height; q++)
        {
            var d = df.D[q];
            texture.data[4*q + 0] = d;
            texture.data[4*q + 1] = d;
            texture.data[4*q + 2] = d; 
            texture.data[4*q + 3] = d;
        }
        return texture;
    }

    export function updateFloatTextureFromDistanceField(texture:floatTexture, df:distanceField)
    {
        if (texture.width*texture.height != df.M*df.N)
        {
            texture.data = new Float32Array(df.M * df.N * 4);
        }
        texture.width = df.M;
        texture.height = df.N;
        for (var q=0; q < texture.width*texture.height; q++)
        {
            var d = df.D[q];
            texture.data[4*q + 0] = d;
            texture.data[4*q + 1] = d;
            texture.data[4*q + 2] = d; 
            texture.data[4*q + 3] = d;
        }
        return texture;
    }

    export function texture2D(t:floatTexture, u:number, v:number, outColor:Float32Array)
    {
        var fx = u * (t.width-1);
        var fy = v * (t.height-1);

        var x = Math.floor(fx);
        var y = Math.floor(fy);

        var dx = fx - x;
        var dy = fy - y;

        if (x == t.width-1) {
            x = t.width-2
            dx = 1;
        }
        if (y == t.height-1) {
            y = t.height-2
            dy = 1;
        }

        for (var i=0; i<4; i++)
            outColor[i] = texture2DComponent(t, x, y, dx, dy, i);
    }

    function texture2DComponent(t:floatTexture, x:number, y:number, dx:number, dy:number, comp:number):number
    {
        return texture2Dat(t, x,   y  , comp)*(1-dx)*(1-dy)
            + texture2Dat(t, x+1, y  , comp)*dx    *(1-dy)
            + texture2Dat(t, x,   y+1, comp)*(1-dx)*dy
            + texture2Dat(t, x+1, y+1, comp)*dx    *dy;
    }

    function texture2Dat(t:floatTexture, x:number, y:number, index:number):number
    {
        return t.data[4*(y*t.width + x) + index];
    }


    export function textureDebugInCanvas(texture:floatTexture, textureComponent:number, scale:number, canvas:HTMLCanvasElement)
    {
        canvas.width = texture.width;
        canvas.height = texture.height;
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var w = texture.width;
        var h = texture.height;
        for (var i=0; i < w; ++i)
        {
            for (var j=0; j < h; ++j)
            {
                var d = texture.data[4*(j*w + i)+textureComponent] * scale;
                
                var q = (h-1-j) * w + i;
                data[4*q] = 0;
                data[4*q+1]= 0;
                data[4*q+2]= 0;
                data[4*q+3]= 255;
                if (d > 0)
                {
                    data[4*q] = d;
                }
                else
                {
                    data[4*q+1] = -d;
                }
            }
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
    }


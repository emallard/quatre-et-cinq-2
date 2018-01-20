import { styleAttribute } from '../../tools/styleAttribute';
import { arrayFind } from "../../tools/jsFunctions";
import { vec2 } from "gl-matrix";
import { loadImage } from "../../tools/loadImage";

export class boundingBoxComputer {

    imgWidth:number;
    imgHeight:number;
    realSize = vec2.create();
    canvas = document.createElement('canvas');

    /*
    async setSrc(src:string)
    {
        let img = await loadImage(src);
        this.imgWidth = img.width;
        this.imgHeight = img.height;
    }*/

    async setImg(img:HTMLImageElement)
    {
        this.imgWidth = img.width;
        this.imgHeight = img.height;

        this.canvas.width = this.imgWidth;
        this.canvas.height = this.imgHeight;

        var ctx = this.canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
    }

    setRealSizeToFit(realSizeContainer:Float32Array)
    {
        var scaleX = (realSizeContainer[0]) / this.imgWidth; 
        var scaleY = (realSizeContainer[1]) / this.imgHeight;
        var scale = Math.min(scaleX, scaleY);
        this.realSize[0] = this.imgWidth * scale;
        this.realSize[1] = this.imgHeight * scale;

        console.log('scaleFActor applied to fit', scale);
    }

    getBoundingRealSize():vec2
    {
        var bounds = this.getBoundingBoxInPx();
        var pxWidth = bounds[2] - bounds[0];
        var pxHeight =  bounds[3] - bounds[1];
        return vec2.fromValues(pxWidth/this.imgWidth * this.realSize[0], pxHeight/this.imgHeight * this.realSize[1]);
    }


    getRealCenter():vec2
    {
        var bounds = this.getBoundingBoxInPx();
        var cx = 0.5*bounds[2] + 0.5*bounds[0];
        var cy = 0.5*bounds[3] + 0.5*bounds[1];
        return vec2.fromValues(
            (cx-this.imgWidth/2)/this.imgWidth * this.realSize[0], 
            -1 * ((cy-this.imgHeight/2)/this.imgHeight) * this.realSize[1]);
    }

    getBoundingBoxInPx():number[]
    {
        var ctx = this.canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        
        var bounds = [0,0,0,0];
        var first = true;
        for (var i=0; i < imageData.width; ++i)
        {
            for (var j=0; j < imageData.height; ++j)
            {
                var q = 4*(i + j*imageData.width);
                if (imageData.data[q+3] > 0 &&
                       (imageData.data[q] != 255
                     || imageData.data[q+1] != 255
                     || imageData.data[q+2] != 255))
                     {
                         if (first || i < bounds[0])
                             bounds[0] = i;
                         if (first || j < bounds[1])
                             bounds[1] = j;
                         if (first || i > bounds[2])
                             bounds[2] = i;
                         if (first || j > bounds[3])
                             bounds[3] = j;
                         
                         first = false;
                     }
            }   
        }
        return bounds;
    }

}
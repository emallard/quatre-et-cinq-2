

export class imageCropper
{

    croppedCanvas = document.createElement('canvas');

    crop(img:HTMLImageElement, boundingInPx:number[])
    {
        let w = boundingInPx[2] - boundingInPx[0] + 1;
        let h = boundingInPx[3] - boundingInPx[1] + 1;
        this.croppedCanvas.width = w;
        this.croppedCanvas.height = h;
        let ctx2 = this.croppedCanvas.getContext('2d'); 
        ctx2.drawImage(img, boundingInPx[0], boundingInPx[1], w, h, 0, 0, w, h);
    }
}
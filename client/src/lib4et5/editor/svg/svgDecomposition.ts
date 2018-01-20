
import { svgHelper } from "./svgHelper";
import { injectNew } from "../../tools/injector";
import { loadImage } from "../../tools/loadImage";
declare var $;

export class svgDecompositionPart
{
    //ids:string[];
    imgElement:HTMLImageElement;
    svgElement:SVGElement
}


export class svgDecomposition
{
    svgContent:string;
    svgRootElement:HTMLElement;
    parts:svgDecompositionPart[] = [];
    helper:svgHelper = injectNew(svgHelper); 
    
    async setSvg(svgContent:string)
    {
        this.svgContent = svgContent;
        var parser = new DOMParser();
        var doc = parser.parseFromString(svgContent, "image/svg+xml");
        this.svgRootElement = doc.documentElement;
        await this.helper.setSvgRootElement(this.svgContent, this.svgRootElement);
        
        await this.setSvg2()
    }

    private async setSvg2() {
        var foundList:SVGElement[] = [];
        for (var i=0; i < this.svgRootElement.childNodes.length; ++i)
        {
            var child = this.svgRootElement.childNodes[i];
            if (child instanceof SVGGraphicsElement && !(child instanceof SVGDefsElement))
            {
                foundList.push(child);
                console.log('first decomp: ' + child.getAttribute('id'));
            }
        }
        
        this.parts = [];
        for (let c of foundList) {
            let part = new svgDecompositionPart();
            part.svgElement = c;
            part.imgElement = await loadImage(await this.helper.drawOnlyElement(part.svgElement));
            //console.log('setSvg2 : part.imgElement ', part.imgElement.width, part.imgElement.height);
            this.parts.push(part);
        };

        //await this.ungroupFirst();

        await this.debugParts();
    }

    async debugParts() {
        //$('.debug').empty();
        console.log('debugParts');
        for (let p of this.parts) {
            let img = p.imgElement;
            img.setAttribute('style', 'border:solid black 1px; max-width:500px');
            //$('.debug').append(img);
        }
    }

    async ungroupFirst() {
        await this.ungroup(this.parts[0].svgElement);
    }

    async ungroup(svgElement:SVGElement) {
        console.log('ungroup');
        // find decompositionPart with SvgElement and add children as new part
        var oldIndex = this.parts.findIndex(p => p.svgElement == svgElement);
        var oldPart = this.parts[oldIndex];
        

        var newParts:svgDecompositionPart[] = []; 
        var childCount = oldPart.svgElement.childElementCount;
        console.log('ungroup into ' + childCount + ' children');
        for (let i=0; i<childCount; ++i) {
            var newPart = new svgDecompositionPart();
            newPart.svgElement = <SVGElement> oldPart.svgElement.children[i];
            newPart.imgElement = await loadImage(await this.helper.drawOnlyElement(newPart.svgElement));
            newParts.push(newPart);
        }

        this.parts.splice(oldIndex, 1, ...newParts);
        console.log('total part(s) : ' + this.parts.length);
    }
}
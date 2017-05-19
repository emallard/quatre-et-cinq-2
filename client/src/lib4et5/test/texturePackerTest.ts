import { resources } from '../tools/resources';
import { texturePacker } from '../render/texturePacker';
import { distanceFieldCanvas } from '../render/distanceFieldCanvas';

    export class texturePackerTest
    {
        test()
        {
            // load imgs
            resources.addImg('data/512x512.png');
            resources.addImg('data/font.png');
            resources.loadAll2(() => {this.test2();});
        }

        private test2()
        {

            var packer = new texturePacker();
            var allDfCanvas:distanceFieldCanvas[] = [];
            for (var key in resources.all)
            {
                var dfCanvas = new distanceFieldCanvas();
                var img:HTMLImageElement = resources.all[key];
                dfCanvas.computeDistanceField(img, 1, img.height/img.width);
                dfCanvas.update();

                allDfCanvas.push(dfCanvas);
                //document.body.appendChild(dfCanvas.canvas);
                //dfCanvas.debugInfoInCanvas();

                //var canvas = document.createElement('canvas');
                //textureDebugInCanvas(dfCanvas.floatTexture ,0 ,128, canvas);
                //document.body.appendChild(canvas);
            }
            
            
            packer.repack(allDfCanvas.map(c=>c.floatTexture));

            packer.debugInfoInBody(255);
            
        }
    }

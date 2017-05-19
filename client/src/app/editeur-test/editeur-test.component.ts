import { Component, OnInit } from '@angular/core';
import { resources } from "lib4et5/tools/resources";
import { getParameterByName } from "lib4et5/tools/jsFunctions";
import { index2 } from "lib4et5/test/index2";

@Component({
  selector: 'app-editeur-test',
  templateUrl: './editeur-test.component.html',
  styleUrls: ['./editeur-test.component.css']
})
export class EditeurTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {

        if (getParameterByName('isHardware') == '1')
        {
            resources.loadAll(onResourceLoaded);
        }
        else
        {
            onResourceLoaded();
        }

        function onResourceLoaded()
        {

            //var p = getParameterByName('page')
            //if (!p) p = 'index2';

            //var p2 = eval('new qec.'+p+'()');
            //var injector = new qec.injector();
            //var p2 = injector.create(qec.index2());
            var p2 = new index2();
            p2.isParallel = getParameterByName('isParallel') == '1';
            p2.isHardware = getParameterByName('isHardware') == '1';
            p2.renderSteps = getParameterByName('renderSteps') == '1';
            p2.start(document.getElementById('root'))
        


            var pickClicked = false;    
            var pickbutton = document.getElementById('pickButton');
            var renderLoopButton = document.getElementById('renderLoopButton');
            var root = document.getElementById('root');
            
            pickbutton.addEventListener("click", function(e)
            {
                pickClicked = true;
            });
            root.addEventListener("mousemove", function(e)
            {
                if (pickClicked) {
                    document.getElementById('pickX')['value'] = e.offsetX;
                    document.getElementById('pickY')['value'] = e.offsetY;
                }
            });
            root.addEventListener("mousedown", function(e)
            {
                if (pickClicked)
                {
                    pickClicked = false;
                    if (p2.debug)
                    {
                        var x = document.getElementById('pickX')['value'];
                        var y = document.getElementById('pickY')['value'];
                        p2.debug(parseFloat(x), parseFloat(y))
                    }
                }
            });

            renderLoopButton.addEventListener("click", function(e)
            {
                p2.startRenderLoop();
            });
        } 
  }

}

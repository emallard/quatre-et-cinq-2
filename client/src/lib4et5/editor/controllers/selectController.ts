import { inject } from '../../tools/injector';
import { editor } from '../editor';
import { renderCollide } from '../../render/renderCollide';
import { iController } from './icontroller';
import { vec3 } from "gl-matrix";

export class selectController implements iController {


        collide = new renderCollide(); 
        editor:editor = inject(editor);
        
        set()
        {
        }

        unset()
        {
        }

        isMouseDown = false; 

        onMouseMove(e:MouseEvent)
        {
            
            if (this.isMouseDown)
            {
               
            }
            // update layerDataProfileDistanceField
            // or move camera
        }

        onMouseDown(e:MouseEvent)
        {
            if (e.button != 0)
                return;

            this.pick(e);
            this.isMouseDown = true;
        }

        onMouseUp(e:MouseEvent)
        {
            
        }

        updateLoop()
        {

        }

        ro = vec3.create();
        rd = vec3.create();

        pick(e:MouseEvent)
        {
            var minDist = 666;
            var iMin = -1;

            this.isMouseDown = false;
            this.editor.getCamera().getRay(e.offsetX, e.offsetY, this.ro, this.rd);

            for (var i=0; i < this.editor.workspace.editorObjects.length; ++i)
            {
                this.collide.collide(this.editor.workspace.editorObjects[i].sd, this.ro, this.rd);
                //console.log(this.collide.pos);
                //console.log(this.collide.minDist);

                //this.vm.layers[i].sd.material.setDiffuse(0,1,0);

                if (this.collide.hasCollided && this.collide.dist < minDist)
                {
                    minDist = this.collide.dist;
                    iMin = i;
                }
            }

            if (iMin > -1)
            {
                //this.editorView.setSelectedIndex(iMin);
            }
            
            //this.vm.setUpdateFlag();;
        }

        onMouseWheel(e:WheelEvent)
        {

        }
    }

import { editor } from '../editor';
import { renderCollide } from '../../render/renderCollide';
import { inject, injectNew } from '../../tools/injector';
import { cameraTransforms } from './cameraTransforms';
import { arcball } from './arcball';


import { vec3, quat, mat3, vec2, mat4 } from "gl-matrix";

export class cameraArcballController
    {

        editor:editor = inject(editor);

        viewportWidth:number;
        viewportHeight:number;
        button:number;
        arcball = new arcball();
        cameraTransforms:cameraTransforms = injectNew(cameraTransforms);
        
        collide:renderCollide = injectNew(renderCollide); 
        ro = vec3.create();
        rd = vec3.create();

        tmpVec3 = vec3.create();
        tmpRotation = quat.create();

        afterInject()
        {
            this.cameraTransforms.reset();
            this.cameraTransforms.updateTransformMatrix();
        }

        setButton(button:number)
        {
            this.button = button;
        }

        //
        //  Mouse Interactions
        //

        onMouseWheel(e:WheelEvent)
        {
            if (this.isZoomEnabled)
            {
                this.hasMouseMoved = true;
                var d = Math.max(-1, Math.min(1, (e.deltaY)));
                //console.log('mousewheel', orig.deltaY);

                this.cameraTransforms.zoom(d, 1.1);
                this.cameraTransforms.updateCamera(this.editor.getCamera());
                this.editor.setRenderFlag();
            }
        }

        isPanEnabled = true;
        isRotateEnabled = true;
        isZoomEnabled = true;

        setDisabledAll(b:boolean)
        {
            this.isPanEnabled = !b;
            this.isRotateEnabled = !b;
            this.isZoomEnabled = !b;
        }

        isMouseDown:boolean;
        isRightClick:boolean;
        isLeftClick:boolean;
        isMiddleClick:boolean;
        isShiftKey:boolean;
        currentMouseXY = vec2.create();
        hasMouseMoved = false;

        startXY = vec2.create();
        startQuat = quat.create();
        startPan = mat4.create();
        up = vec3.create();
        right = vec3.create();

        
        onMouseDown(e:MouseEvent)
        {
            this.isRightClick = (e.which == 3);
            this.isLeftClick = (e.which == 1);
            this.isMiddleClick = (e.which == 2);
            this.isShiftKey = e.shiftKey;
            this.isMouseDown = true;

            // copy start state
            vec2.set(this.startXY, e.offsetX, e.offsetY)
            quat.copy(this.startQuat, this.cameraTransforms.rotation);
            mat4.copy(this.startPan, this.cameraTransforms.panTranslation);
            this.viewportWidth = this.editor.getViewportWidth();
            this.viewportHeight = this.editor.getViewportHeight();

            // pick point in 3D
            this.editor.getCamera().getRay(e.offsetX, e.offsetY, this.ro, this.rd);
            this.collide.collideAll(this.editor.getAllSd(), this.ro, this.rd);
            if (this.collide.hasCollided)
            {
                
            }
            
        }

        onMouseUp(e:MouseEvent)
        {
            this.isMouseDown = false;
        }

        dragQuat = quat.create();
        onMouseMove(e:MouseEvent)
        {
            vec2.set(this.currentMouseXY, e.offsetX, e.offsetY);
            this.hasMouseMoved = true;
        }

        updateLoop()
        {
            if (!this.hasMouseMoved)
                return;
            this.hasMouseMoved = false;
            
            
            if (this.isRotateEnabled)
            {
                if (this.isMouseDown && this.isRightClick && !this.isShiftKey)
                {
                    if (false && this.collide.hasCollided)
                    {
                        // Proj*Pan*Rot*LocalPicked = (x1,y1) => permet de déduire localpicked
                        // Proj*Pan*Rot*DeltaRot*LocalPicked = (x2,y2) => permet de déduire DeltaRot
                    }
                    else
                    {
                        var sphereRadius = 0.5*Math.min(this.viewportWidth, this.viewportHeight);
                        this.arcball.getRotationFrom2dPoints(this.viewportWidth, this.viewportHeight, sphereRadius, this.startXY, this.currentMouseXY, this.dragQuat);
                    }

                    quat.multiply(this.tmpRotation, this.dragQuat, this.startQuat);
                    this.cameraTransforms.setRotation(this.tmpRotation);

                    this.cameraTransforms.updateCamera(this.editor.getCamera());
                    this.editor.setRenderFlag();
                }
            }

            
            if (this.isPanEnabled)
            {
                if ((this.isMouseDown && this.isRightClick && this.isShiftKey)
                    || (this.isMouseDown && this.isMiddleClick))
                {

                    var xFactor = -this.cameraTransforms.zcam / this.viewportWidth;
                    var yFactor = this.cameraTransforms.zcam / this.viewportHeight;
                    this.cameraTransforms.pan(this.currentMouseXY[0] * xFactor, this.currentMouseXY[1] * yFactor)
                }
            }
            
        }
    }

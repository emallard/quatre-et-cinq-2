import { inject } from '../tools/injector';
import { heightController } from './controllers/heightController';
import { selectController } from './controllers/selectController';
import { cameraArcballController } from './controllers/cameraArcballController';
import { controllerManager } from './controllers/controllerManager';
import { Observable } from "rxjs/Observable";


export class editorControllers
{

    controllerManager:controllerManager = inject(controllerManager);
    cameraController:cameraArcballController = inject(cameraArcballController);
    selectController:selectController = inject(selectController);
    heightController:heightController = inject(heightController);

    updateLoop()
    {
        this.controllerManager.updateLoop();
    }

    onContextMenu() {return false;}
    onMouseMove(e:Event) { this.controllerManager.onMouseMove(e); }
    onMouseDown(e:Event) { this.controllerManager.onMouseDown(e); }
    onMouseUp(e:Event) { this.controllerManager.onMouseUp(e); }
    onMouseWheel(e:Event) { this.controllerManager.onMouseWheel(e); }

    setMoveController()
    {
        this.heightController.isScaleMode = false;
        this.controllerManager.setController(this.heightController);
        this.resetActiveController();
        this.isMoveControllerActive = true;
    }

    setScaleController()
    {
        this.heightController.isScaleMode = true;
        this.heightController.isScaleModeBottom = false;
        this.controllerManager.setController(this.heightController);
        this.resetActiveController();
        this.isScaleControllerActive = true;
    }

    setScaleBottomController()
    {
        this.heightController.isScaleMode = true;
        this.heightController.isScaleModeBottom = true;
        this.controllerManager.setController(this.heightController);
        this.resetActiveController();
        this.isScaleBottomControllerActive = true;
    }

    setSelectController()
    {
        this.controllerManager.setController(this.selectController);
        this.resetActiveController();
        this.isSelectControllerActive = true;
    }

    isSelectControllerActive = true;
    isMoveControllerActive = false;
    isScaleControllerActive = false;
    isScaleBottomControllerActive = false;
    
    resetActiveController()
    {
        this.isSelectControllerActive = false;
        this.isMoveControllerActive = false;
        this.isScaleControllerActive = false;
        this.isScaleBottomControllerActive = false;
    }

}
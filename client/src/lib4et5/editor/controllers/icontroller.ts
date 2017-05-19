    export interface iController
    {
        set();
        unset();
        onMouseMove(e:MouseEvent);
        onMouseDown(e:MouseEvent);
        onMouseUp(e:MouseEvent);
        onMouseWheel(e:WheelEvent);
        updateLoop();
    }
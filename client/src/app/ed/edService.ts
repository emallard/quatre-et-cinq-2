import { Injectable } from '@angular/core';
import { injector } from "lib4et5/tools/injector";
import { editor } from "lib4et5/editor/editor";

@Injectable()
export class EdService {

    injector:injector;
    private _editor:editor;
    
    constructor()
    {
        
    }
    
    editor()
    {
        if (this._editor == null)
        {
            this.injector = new injector();
            this._editor = this.injector.create(editor);
        }
        return this._editor;
    }
}

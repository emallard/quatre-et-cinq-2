import { ProfileComponent } from './profile/profile.component';
import { EditeurComponent } from './editeur/editeur.component';
import { Injectable } from '@angular/core';
import { injector } from "../../lib4et5/tools/injector";
import { editor } from "../../lib4et5/editor/editor";


@Injectable()
export class EdService {

    injector:injector;
    private _editor:editor;
    
    constructor()
    {
        
    }
    
    editor() : editor
    {
        if (this._editor == null)
        {
            this.injector = new injector();
            this._editor = this.injector.create(editor);

            this._editor.editorControllers.selectController.onSetSelectedIndex = (i)=>this.SetSelectedIndex(i);
            this._editor.editorControllers.heightController.onSetSelectedIndex = (i)=>this.SetSelectedIndex(i);
            this._editor.editorControllers.heightController.onProfileRefresh = ()=>this.profileComponent.refresh();
        }
        return this._editor;
    }

    public editeurComponent: EditeurComponent;
    public profileComponent: ProfileComponent;

    SetSelectedIndex(index: number)
    {
        this._editor.setSelectedIndex(index);
        this.profileComponent.setSelectedIndex(index);
    }

    UpdateLoop()
    {
        this._editor.updateLoop();
        this._editor.editorControllers.updateLoop();
        this.profileComponent.updateLoop();
        requestAnimationFrame(()=>this.UpdateLoop());
    }
}

import { editorControllers } from '../../../lib4et5/editor/editorControllers';
import { Component, OnInit } from '@angular/core';
import { resources } from "lib4et5/tools/resources";
import { editor } from "lib4et5/editor/editor";
import { EdService } from "app/ed/edService";

@Component({
    selector: 'app-editeur',
    templateUrl: './editeur.component.html',
    styleUrls: ['./editeur.component.css'],
})
export class EditeurComponent implements OnInit {

    private editor:editor;
    private editorControllers:editorControllers;
    constructor(private edService:EdService) { }

    ngOnInit() {

          this.editor = this.edService.editor();
          this.editorControllers = this.editor.editorControllers;
          this.editor.loadResourcesAndInit(document.getElementById('rendererElement'), () =>this.afterLoad());   
    }

    afterLoad()
    {
        this.editor.setRenderFlag();
        this.updateLoop();
    }

    // Toolbar
    //////////////////

    importToolbarVisible = true;
    modifyToolbarVisible = false;
    environmentToolbarVisible = false;
    photoToolbarVisible = false;
    printToolbarVisible = false;

    showImportToolbar() { this.resetToolbar();this.importToolbarVisible=true; }
    showModifyToolbar() { this.resetToolbar();this.modifyToolbarVisible=true;}
    showEnvironmentToolbar() { this.resetToolbar();this.environmentToolbarVisible=true;}
    showPhotoToolbar() { this.resetToolbar();this.photoToolbarVisible=true;}
    showPrintToolbar() { this.resetToolbar();this.printToolbarVisible=true;}

    resetToolbar()
    {
        this.importToolbarVisible = false;
        this.modifyToolbarVisible = false;
        this.environmentToolbarVisible = false;
        this.photoToolbarVisible = false;
        this.printToolbarVisible = false;
    }

    // Controllers
    /////////////////

   

    // Loop
    /////////////////

    private updateLoop()
    {
        //this.controllerManager.updateLoop();
        //this.profileView.updateLoop();
        //this.animateLoop();
        this.editor.updateLoop();
        requestAnimationFrame(()=>this.updateLoop());
    }

}

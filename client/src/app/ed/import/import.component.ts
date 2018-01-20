import { arrayRemove } from '../../../lib4et5/tools/jsFunctions';
import { editor } from '../../../lib4et5/editor/editor';
import { EdService } from '../edService';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { loadAsText } from "../../../lib4et5/tools/loadAsText";

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.css']
})

export class ImportComponent implements OnInit {

    importedSvgs : importedSvg[] = [];
    importedContent:string;
    editor:editor;

    constructor(private edService: EdService, public sanitizer: DomSanitizer) {
        this.editor = this.edService.editor();
    }

    ngOnInit() {
    }

    onDragOver(evt:DragEvent) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    onDrop(e:DragEvent) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        var i = 0;
        var file = files[i];
        this.readImage(files[0]);
    }
            

    onFileChange(evt: Event)
    {
        console.log(evt);
        var file = (<any>(evt.target)).files[0];
        console.log('readImage ', file); 
        this.readImage(file);
    }

    async readImage(file:File) : Promise<void>
    {
        if (!file)
            return;

        var text = await loadAsText(file);
            
        /*
        this.importedContent = reader.result;
        this.editor.importSvg(this.importedContent,    
            ()=>{}//this.editor.setSelectedIndex(0)
        );
        */
        var newSvg = new importedSvg();
        newSvg.importComponent = this;
        newSvg.src = "data:image/svg+xml;base64," + btoa(text);
        newSvg.content = text;
        this.importedSvgs.push(newSvg);

        //this.editor.addSvg(reader.result);
        //this.select(newSvg);
        await this.initDecomposition(text);
    }

    firstSelect = true;
    select(importedSvg:importedSvg)
    {
        this.importedSvgs.forEach(x => x.isActive = false);
        importedSvg.isActive = true;

        var index = this.importedSvgs.indexOf(importedSvg);
        console.log('index ' + index);
        this.editor.setSelectedSvgIndex(index, ()=>{});

        if (this.firstSelect)
        {
            this.firstSelect = false;
            this.edService.editeurComponent.showModifyToolbar();
            this.edService.editeurComponent.editorControllers.setSelectController();
        }
       
        //this.editor.importSvg(importedSvg.content,()=>{});
    }

    remove(importedSvg:importedSvg)
    {
        arrayRemove(this.importedSvgs, importedSvg)
    }

    async initDecomposition(text:string) {
        await this.editor.svgDecomposition.setSvg(text);
        this.editor.svgImporter2.importDecompositionInWorkspace(this.editor.workspace, this.editor.svgDecomposition);
        this.editor.setUpdateFlag();
    }
    decomposerSelection()
    {
        this.editor.decomposeSelection();
    }
}

export class importedSvg {

    src = '';
    content = '';
    isActive = false;
    importComponent: ImportComponent;

    onClick() : void
    {
        this.importComponent.select(this);
        //this.isActive(true);
    }

    remove() : void
    {
        this.importComponent.remove(this);
    }
}

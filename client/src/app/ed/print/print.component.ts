import { EdService } from '../edService';
import { editor } from '../../../lib4et5/editor/editor';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

    editor:editor;

    constructor(private edService: EdService, public sanitizer: DomSanitizer) {
        this.editor = this.edService.editor();
    }


    ngOnInit() {
    }

}

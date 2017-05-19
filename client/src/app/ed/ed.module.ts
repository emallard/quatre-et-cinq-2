import { EdService } from './edService';
import { ImportComponent } from './import/import.component';
import { EditeurComponent } from './editeur/editeur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { MouseWheelDirective } from './mouse-wheel.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
    {path: 'studio45', component:EditeurComponent}
    ])
  ],
  declarations: [
    EditeurComponent,
    ImportComponent,
    MouseWheelDirective
  ],
  providers: [EdService]
})
export class EdModule { }

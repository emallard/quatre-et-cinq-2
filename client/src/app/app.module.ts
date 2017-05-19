import { EdModule } from './ed/ed.module';
import { EditeurComponent } from './ed/editeur/editeur.component';
import { EdService } from './ed/edService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { NavpagesComponent } from './navpages/navpages.component';
import { EditeurTestComponent } from './editeur-test/editeur-test.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ContactComponent,
    NavpagesComponent,
    EditeurTestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EdModule,
    RouterModule.forRoot([
      {path: '', component:AccueilComponent},
      {path: 'contact', component:ContactComponent},
      {path: 'editeur-test', component:EditeurTestComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

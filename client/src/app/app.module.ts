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
import { ConnexionComponent } from './connexion/connexion.component';
import { MenuUtilisateurComponent } from './menu-utilisateur/menu-utilisateur.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ContactComponent,
    NavpagesComponent,
    EditeurTestComponent,
    ConnexionComponent,
    MenuUtilisateurComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EdModule,
    RouterModule.forRoot([
      {path: '', component:AccueilComponent},
      {path: 'contact', component:ContactComponent},
      {path: 'editeur-test', component:EditeurTestComponent},
      {path: 'connexion', component:ConnexionComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

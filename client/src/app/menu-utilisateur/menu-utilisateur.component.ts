import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu-utilisateur',
    templateUrl: './menu-utilisateur.component.html',
    styleUrls: ['./menu-utilisateur.component.css']
})
export class MenuUtilisateurComponent implements OnInit {

    estConnecte = false;

    constructor() { }

    ngOnInit() {
    }

}

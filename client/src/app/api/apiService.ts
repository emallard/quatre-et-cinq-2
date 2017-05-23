import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor()
    {
        
    }



    ajouterRoute()
    {

    }

    /*
    appelerApi<T, U>(w:{new():webService<T,U>}, t:T) : Promise<U>
    {
        var lien = this.routeurServeur.obtenirLien(w);
        return this.navigateur.appelerWebService(lien.url, t);
    }*/

    appelerApi2(url:string, parameters:any) : Promise<any>
    {
        console.log('appelerWebServiceAsync');
        return new Promise((_resolve,_reject) => {  
            var req = new XMLHttpRequest();
            req.open('POST', url, true);
            req.onreadystatechange = function (aEvt) {
                if (req.readyState == 4) {
                    if(req.status == 200)
                    {
                        console.log('resolve');
                        _resolve(req.responseText);
                    }   
                    else
                    {
                        console.log('reject');
                        _reject("Erreur pendant le chargement de la page.\n");
                    }
                }
            };
            req.send(null);
        });
    }   

    seConnecter(email:string, password:string)
    {

    }

    listeQuestions()
    {

    }

    question(id:string)
    {

    }

    repondre(id:string, reponse:string)
    {

    }
}

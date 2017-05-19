import { arrayFind } from '../../tools/jsFunctions';

    interface exExample
    {
        title:string;
        create:() =>any;
    }
    var allExamples:exExample[] = [];

    export function pushExample(title:string, f:()=>any)
    {
        console.log('push example :' + title);
        allExamples.push({title:title, create:f });
    }

    export function getExamples()
    {
        return allExamples;
    }

    export function createExample(title:string):any
    {
        var found = arrayFind(allExamples, (x) => x.title === title)
        return found.create();
    }

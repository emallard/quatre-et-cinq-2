import { canCreate } from '../tools/dto';
import { scene } from './scene';

    export class sceneBase
    {
        public debugInfo = false;

        protected creators:creator[] = []; 

        public register<T>(type:string, canCreate: {new() : canCreate<T>})
        {
            var c:creator = { 
                predicate: (o)=> o.type==type, 
                instantiate:dto => { var n = new canCreate(); n.createFrom(dto); return n;} };
            this.creators.push(c);
        }

        protected register2<T>(predicate:(dto:T)=>boolean, canCreate: {new() : canCreate<T>})
        {
            this.registerInstantiate<T>(predicate, dto => { var n = new canCreate(); n.createFrom(dto); return n;})
        }
       
        protected registerInstantiate<T>(predicate:(dto:T)=>boolean, instantiate:(dto:T)=>Object)
        {
            var c:creator = { predicate: predicate, instantiate: instantiate };
            this.creators.push(c);
        }


        public create(sceneDTO:any)
        {
            var i = 0;
            while (i++<1)
            {
                if (this.debugInfo) console.log('scene pass : ' + i);
                this.createPass(sceneDTO);
            }
        }

        protected createPass(sceneDTO:any)
        {
            var instancesFound = false;
            for (var key in sceneDTO)
            {
                if (this.debugInfo) console.log('scene instantiate : ' + key);
                var dto = sceneDTO[key];
                
                // already created
                if (dto.__instance != null)
                {
                    if (this.debugInfo) console.log('already created');
                    continue;
                }
                
                // can't be created
                if (this.hasAnySceneNullReferenceInIt(dto, scene))
                {
                    continue;
                }

                // clone dto, and replace references
                //var dto2 = this.replaceBySceneReferences(dto);
                
                //var dto2 = dto;
                // create object
                var instance = this.createOne(key, dto);
                
                // register it as a field in 'this'
                this[key] = instance;

                // register it as created in the 'scene' object
                dto.__instance = instance;

                //if (this.debugInfo) console.log('OK' , instance);
            }
        }

        protected replaceBySceneReferences(dto:any):Object
        {
            var copy = {};
            for (var key in dto)
            {
                var field = dto[key];
                if (field.__instance != null)
                {
                    if (this.debugInfo) console.log('replace ' + key + ' by its scene reference'); 
                    copy[key] = field.__instance;
                }
                else
                {
                    copy[key] = field;
                }
            }
            return copy;
        }

        protected hasAnySceneNullReferenceInIt(dto:any, sceneDTO:any):boolean
        {
            for (var key in dto)
            {
                var field = dto[key];
                if (this.isSceneReference(field, sceneDTO))
                {
                    if (field.__instance == null)
                    {
                        if (this.debugInfo) console.log('has null reference in it : ' + key);
                        return true;    
                    }
                }
            }    
            return false;
        }

        protected isSceneReference(object:any, sceneDTO:any):boolean
        {
            for (var key in sceneDTO)
            {
                if (sceneDTO[key] == object)
                    return true;
            }
            return false;
        }

        public createOne(key:string, dto:any):Object
        {
            for (var i=0; i<this.creators.length; ++i)
            {
                var c = this.creators[i];
                if (c.predicate(dto))
                {
                    return c.instantiate(dto);
                }
            }
            throw "Can't create scene object " + key;
        }
    }

    export class creator
    {
        predicate: (any)=>boolean;
        instantiate: (any) => Object;
    }


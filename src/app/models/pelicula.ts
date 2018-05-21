export class Pelicula{
    
    constructor(public id: number, public titulo:string, public genero:string, public director:string, 
        public fechaEstreno:string, public precio:number, 
        public sipnosis:string, public formato_portada:string, public nombre_portada:string, public portada:string)
    { }       
}    

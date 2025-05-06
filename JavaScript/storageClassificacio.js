export class storageClassificacio {

    puntuacions;

    constructor() {
        
        this.puntuacions = [];
    }

    getPuntuacions(){
        return this.puntuacions;
    }

    afegirPuntuacio(newPuntuacio){
        this.puntuacions.push(newPuntuacio);

    }

    vaciarPuntuacio(){
        this.puntuacions = [];
    }
}
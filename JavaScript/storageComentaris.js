export class storageComentaris {

    comentaris;

    constructor() {
        
        this.comentaris = [];
    }

    getcomentaris(){
        return this.comentaris;
    }

    afegirComentari(newComentari){
        this.comentaris.push(newComentari);

    }
}
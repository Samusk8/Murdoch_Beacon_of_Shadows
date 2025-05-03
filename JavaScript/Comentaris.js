export class Comentari {
    constructor(name, content) {
        this.name = name;
        this.content = content;
        
    }

    mostrarComentari() {
        return `
            <div class="comentario">
                <div class="nom3">
                    <p>Usuari: ${this.name}</p>
                    <p>${this.content}</p>
                </div>
            </div>
        `;
    }
}

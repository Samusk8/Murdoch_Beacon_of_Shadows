export class Comentari {
    constructor(name, content) {
        this.name = name;
        this.content = content;
        
    }

    mostrarComentari() {
        return `
            <div class="comentario">
                <div class="nom3">
                    <h5>${this.name}</h5>
                    <p>${this.content}</p>
                </div>
            </div>
        `;
    }
}

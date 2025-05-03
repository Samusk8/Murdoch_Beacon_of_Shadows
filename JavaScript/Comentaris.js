export class Comentari {
    constructor(name, content) {
        this.name = name;
        this.content = content;
        this.api_token = 'GHCki2tUqpMxPYBI6KnHEZD98ffEEeZMcts6J1QAh7FLDh3H7MpLcX4YQ7km';
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

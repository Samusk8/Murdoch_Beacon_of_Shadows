export class Classificacio {
    constructor(name, puntuacion) {
        this.name = name;
        this.puntuacion = puntuacion;
    }

    mostrarClassificacio() {
        return `
            <h5 class="user">
                ${this.name} - ${this.puntuacion}
            </h5>
        `;
    }
}

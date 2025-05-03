export class Classificacio {
    constructor(name, puntuacion) {
        this.name = name;
        this.puntuacion = puntuacion;
    }

    mostrarClassificacio() {
        return `
            <li class="user">
                ${this.name} - ${this.puntuacion}
            </li>
        `;
    }
}

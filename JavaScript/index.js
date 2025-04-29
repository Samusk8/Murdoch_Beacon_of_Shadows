import { Comentari } from "./Comentaris.js";
import { storageComentaris } from "./storageComentaris.js";
let gestorComentaris = new storageComentaris();

async function mostrarComentaris() {
    await descargarComentaris();
    limpiarMostrarComentaris();

    let comentaris = gestorComentaris.getcomentaris();
    let ComentariInfoHTML = '';

    comentaris.forEach((comentari) => {
        ComentariInfoHTML += comentari.mostrarComentari();
    });

    document.getElementById("comentario").innerHTML = ComentariInfoHTML;
}

mostrarComentaris();

function limpiarMostrarComentaris() {
    document.getElementById("comentario").innerHTML = '';
}

async function descargarComentaris() {
    try {
        const respostaComentaris = await fetch('https://phpstack-1076337-5399863.cloudwaysapps.com/api/comments/pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS');

        if (!respostaComentaris.ok) throw new Error("Error de xarxa");

        const data = await respostaComentaris.json();
        const comentaris = data.data; // Accedim a l'array de comentaris

        comentaris.forEach(({ name, content }) => {
            const comentari = new Comentari(name, content);
            gestorComentaris.afegirComentari(comentari);
        });

    } catch (err) {
        alert("Error al carregar base de dades");
        console.error(err);
    }
}
import { Classificacio } from "./Classificacio.js";
import { Comentari } from "./Comentaris.js";
import { Post } from "./Post.js";
import { storageClassificacio } from "./storageClassificacio.js";
import { storageComentaris } from "./storageComentaris.js";
import { storagePost } from "./storagePost.js";

let gestorComentaris = new storageComentaris();
let gestorPuntuacions = new storageClassificacio();
let gestorPosts = new storagePost();


mostrarComentaris();
mostrarPuntuacions();
//mostrarPosts();

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



function limpiarMostrarComentaris() {
    document.getElementById("comentario").innerHTML = '';
}


document.getElementById("enviarComentari").addEventListener("click", async () => {
    const nom = document.getElementById("nomUsuari").value;
    const text = document.getElementById("textComentari").value;

    if (nom === "" || text === "") {
        alert("Has d'omplir tots els camps.");
        return;
    }

    const token = "GHCki2tUqpMxPYBI6KnHEZD98ffEEeZMcts6J1QAh7FLDh3H7MpLcX4YQ7km";

    try {
        const resposta = await fetch("https://phpstack-1076337-5399863.cloudwaysapps.com/api/comments/pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: nom,
                content: text,
               
            })
        });

        if (!resposta.ok) throw new Error("Error en enviar el comentari");

        alert("Comentari enviat correctament!");

        // Afegim el comentari localment i actualitzem la vista
        const nouComentari = new Comentari(nom, text);
        gestorComentaris.afegirComentari(nouComentari);
        mostrarComentaris();

        // Neteja del formulari
        document.getElementById("nomUsuari").value = "";
        document.getElementById("textComentari").value = "";

    } catch (err) {
        console.error(err);
        alert("Error en enviar el comentari.");
    }
});



async function descargarPuntuacions() {
    try {
        const respostaPuntuacions = await fetch('https://phpstack-1076337-5399863.cloudwaysapps.com/api/classification/GHCki2tUqpMxPYBI6KnHEZD98ffEEeZMcts6J1QAh7FLDh3H7MpLcX4YQ7km');

        if (!respostaPuntuacions.ok) throw new Error("Error de xarxa");

        const data = await respostaPuntuacions.json();
        const puntuacions = data.data; // Accedim a l'array de puntuacions

        puntuacions.forEach(({ name, puntuacion }) => {
            const puntuacio = new Classificacio(name, puntuacion);
            gestorPuntuacions.afegirPuntuacio(puntuacio);
        });

    } catch (err) {
        alert("Error al carregar base de dades");
        console.error(err);
    }
}

async function mostrarPuntuacions() {
    await descargarPuntuacions();
    limpiarMostrarPuntuacions();

    let puntuacions = gestorPuntuacions.getPuntuacions();
    let puntuacioInfoHTML = '';

    puntuacions.forEach((puntuacio) => {
        puntuacioInfoHTML += puntuacio.mostrarClassificacio();
    });

    document.getElementById("rankingBox").innerHTML = puntuacioInfoHTML;
}


function limpiarMostrarPuntuacions() {
    document.getElementById("rankingBox").innerHTML = '';
}

async function descargarPosts() {
    try {
        const respostaPosts = await fetch('https://phpstack-1076337-5399863.cloudwaysapps.com/api/posts/pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS');

        if (!respostaPosts.ok) throw new Error("Error de xarxa");

        const data = await respostaPosts.json();
        const posts = data.data; // Accedim a l'array de posts

        posts.forEach(({ title, content }) => {
            const post = new Post(title, content);
            gestorPosts.afegirPost(post);
        });

    } catch (err) {
        alert("Error al carregar base de dades");
        console.error(err);
    }
}

async function mostrarPosts() {
    await descargarPosts();
    limpiarMostrarPosts();

    let posts = gestorPosts.getPosts();
    let PostInfoHTML = '';

    posts.forEach((post) => {
        PostInfoHTML += post.mostrarPost();
        console.log(post)
    });

    document.getElementById("post").innerHTML = PostInfoHTML;
}



function limpiarMostrarPosts() {
    document.getElementById("post").innerHTML = '';
}
import { Classificacio } from "./Classificacio.js";
import { Comentari } from "./Comentaris.js";
import { Post } from "./Post.js";
import { storageClassificacio } from "./storageClassificacio.js";
import { storageComentaris } from "./storageComentaris.js";
import { storagePost } from "./storagePost.js";

let gestorComentaris = new storageComentaris();
let gestorPuntuacions = new storageClassificacio();
let gestorPosts = new storagePost();
const btnEnviarFormulario = document.getElementById("enviarFormulario");
if (btnEnviarFormulario) {
    btnEnviarFormulario.addEventListener("click", function (event) {
        event.preventDefault();
        enviarFormularioContacto();
    });
}


const btnEnviarComentari = document.getElementById("enviarComentari");
if (btnEnviarComentari) {
    btnEnviarComentari.addEventListener("click", function () {
        enviarComentari();
    });
}


mostrarComentaris();
mostrarPuntuacions();
mostrarPosts();
setInterval(mostrarComentaris, 300000);
setInterval(mostrarPuntuacions, 300000);

async function descargarComentaris() {
    try {
        const respostaComentaris = await fetch('https://phpstack-1076337-5399863.cloudwaysapps.com/api/comments/GHCki2tUqpMxPYBI6KnHEZD98ffEEeZMcts6J1QAh7FLDh3H7MpLcX4YQ7km');

        if (!respostaComentaris.ok) throw new Error("Error de xarxa");

        const data = await respostaComentaris.json();
        const comentaris = data.data; 

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
    console.log("hola")
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
    const contenedor = document.getElementById("comentario");
    if (contenedor) {
        contenedor.innerHTML = "";
    }
}


async function enviarComentari() {

    const nomUsuari = document.getElementById("nomUsuari").value;
    const comentari = document.getElementById("textComentari").value;
    const apiToken = 'GHCki2tUqpMxPYBI6KnHEZD98ffEEeZMcts6J1QAh7FLDh3H7MpLcX4YQ7km';

    const body = {
        api_token: apiToken,
        name: nomUsuari,
        content: comentari
    };

    try {
        const response = await fetch(`https://phpstack-1076337-5399863.cloudwaysapps.com/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });

        const result = await response.json();

        if (response.ok) {
            alert("¡Comentario enviado!");
        } else {
            console.error("Error al enviar comentario:", result);
            alert("Hubo un error al enviar tu comentario.");
        }

    } catch (error) {
        console.error("Error de red:", error);
        alert("Error de red al intentar enviar el comentario.");
    }
}


async function enviarFormularioContacto() {

    const apiToken = 'GHCki2tUqpMxPYBI6KnHEZD98ffEEeZMcts6J1QAh7FLDh3H7MpLcX4YQ7km';
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;

    if (!nombre || !email || !asunto || !mensaje) {
        alert("Por favor, rellena todos los campos.");
        return;
    }
    const body = {
        api_token: apiToken,
        nombre: nombre,
        email: email,
        asunto: asunto,
        mensaje: mensaje
    };

    try {
        const response = await fetch(`https://phpstack-1076337-5399863.cloudwaysapps.com/api/contact`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });

    const result = await response.json();

    if (response.ok) {
        alert("¡Mensaje enviado!");
    } else {
        console.error("Error en el envío:", result);
        alert("Error al enviar mensaje de contacto.");
    }

    } catch (error) {
        
        alert("Error de red al intentar enviar el mensaje.");
    }
}



async function descargarPuntuacions() {
    try {
        const respostaPuntuacions = await fetch('https://phpstack-1076337-5399863.cloudwaysapps.com/api/classification/GHCki2tUqpMxPYBI6KnHEZD98ffEEeZMcts6J1QAh7FLDh3H7MpLcX4YQ7km');

        if (!respostaPuntuacions.ok) throw new Error("Error de xarxa");

        const data = await respostaPuntuacions.json();
        const puntuacions = data.data;

        puntuacions.forEach(({ name, puntuacion }) => {
            const puntuacio = new Classificacio(name, puntuacion);
            gestorPuntuacions.afegirPuntuacio(puntuacio);
        });

    } catch (err) {
        alert("Error al carregar base de dades");
       
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
    const contenedor = document.getElementById("rankingBox");
    if (contenedor) {
        contenedor.innerHTML = "";
    }
}

async function descargarPosts() {
    try {
        const respostaPosts = await fetch('https://phpstack-1076337-5399863.cloudwaysapps.com/api/posts/pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS');

        if (!respostaPosts.ok) throw new Error("Error de xarxa");

        const data = await respostaPosts.json();
        const posts = data.data; 

        posts.forEach(({ title, content }) => {
            const post = new Post(title, content);
            gestorPosts.afegirPost(post);
        });

    } catch (err) {
        alert("Error al carregar base de dades");
        
    }
}

async function mostrarPosts() {
    await descargarPosts();
    limpiarMostrarPosts();

    let posts = gestorPosts.getPosts();
    let PostInfoHTML = '';

    posts.forEach((post) => {
        PostInfoHTML += post.mostrarPost();
        
    });

    document.getElementById("post").innerHTML = PostInfoHTML;
}



function limpiarMostrarPosts() {
    document.getElementById("post").innerHTML = '';
}
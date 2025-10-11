document.addEventListener('DOMContentLoaded', () => {
    fraseFlor.textContent = frases[0];
})

const flor = document.getElementById('flor-container');
const fraseFlor = document.getElementById('frase-mensaje');
const botonFlor = document.getElementById('btn-continue');
const reproductorUrl = "./reproductor/reproductor-page.html";

const frases = ["1 año mas juntos mi vida", "Otra vuelta al sol, donde vivimos ditintos momentos, muchas emociones y nuevos capitulos de nuestra historia.", "Como aquellos bailes en una alameda...", "se termiron transformando en dos años maravillosos de mi vida.","Dos años que son solo el inicio de muchos mas.", "Mi compañera de vida", "Te amo mi Sofhia", "Gracias por elegirme cada día", "Por hacerme la persona mas feliz del mundo", "Por ser mi amiga, mi confidente, mi amor", "Por ser tú, simplemente tú.", "Feliz aniversario mi amor."];

let indiceFraseActual = 0;

// Cambiar la frase al hacer clic en el botón
botonFlor.addEventListener('click', () => {
    // La funcion seleciona la frase segun el indice actual y la muestra en el div
    fraseFlor.textContent = frases[indiceFraseActual];
    //Se aumenta el indice para la siguiente frase
    indiceFraseActual++;
    // Si el indice es mayor o igual al numero de frases, se reinicia a 0
    if(indiceFraseActual >= frases.length) {
        window.location.href = reproductorUrl; 
        return;
    }});



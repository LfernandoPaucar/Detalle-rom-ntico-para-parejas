document.addEventListener('DOMContentLoaded', () => {
    fraseFlor.textContent = frases[0];
})

const flor = document.getElementById('flor-container');
const fraseFlor = document.getElementById('frase-mensaje');
const botonFlor = document.getElementById('boton-flor');

const frases = ["Se que no te lo digo a menudo", "pero la vida fue muy gentil conmigo al ponerte en mi camino", "y quiero que sepas que te amo con todo mi corazón.", " y aunque a veces no haga las cosas bien en los momentos que lo necesitas","siempre me ezforzare por darte la mejor version de mi", "Te regalo esta rosa amarilla, como simbolo de que mi vida es mas brillante y feliz desde que estas en ella.", "Te amo mi Sofhia"];

let indiceFraseActual = 0;

// Cambiar la frase al hacer clic en el botón
botonFlor.addEventListener('click', () => {
    // La funcion seleciona la frase segun el indice actual y la muestra en el div
    fraseFlor.textContent = frases[indiceFraseActual];
    //Se aumenta el indice para la siguiente frase
    indiceFraseActual++;
    // Si el indice es mayor o igual al numero de frases, se reinicia a 0
    if(indiceFraseActual >= frases.length) {
        indiceFraseActual = 0;
    }});



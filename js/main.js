// js/main.js

const boton = document.querySelector('.hamburguesa');
const menu = document.querySelector('.menu');

// Cuando alguien hace clic en el botón...
boton.addEventListener('click', () => {
    // ...le ponemos o quitamos la clase "activado" al menú
    menu.classList.toggle('activado');
});
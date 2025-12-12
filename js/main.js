const boton = document.querySelector('.hamburguesa');
const menu = document.querySelector('.menu');

if (boton && menu) {
    boton.addEventListener('click', () => {
        menu.classList.toggle('activado');
    });
}

const formulario = document.getElementById('form-contacto');
const aviso = document.getElementById('mensaje-aviso');

if (formulario) {
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        if (aviso) {
            aviso.textContent = '¡Gracias! Tu mensaje ha sido enviado exitosamente.';
            aviso.classList.add('alerta-exito');
            
            setTimeout(() => {
                aviso.classList.remove('alerta-exito');
                aviso.textContent = '';
            }, 3000);
        }
        
        formulario.reset();
    });
}
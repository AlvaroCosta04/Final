// 1. Variable para guardar los productos que traigamos de la API
let productosTotales = [];

// 2. Elemento del DOM donde vamos a "pintar" las tarjetas
const contenedor = document.getElementById('lista-productos');

// 3. Función principal que se ejecuta al cargar la página
async function cargarProductos() {
    try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        const datos = await respuesta.json();
        productosTotales = datos;
        
        // 1. Primero mostramos todo por defecto
        mostrarProductos(productosTotales);

        // 2. Revisamos si la URL tiene una categoría "guardada"
        const params = new URLSearchParams(window.location.search);
        const categoriaUrl = params.get('cat');

        // 3. Si existe la categoría, aplicamos el filtro
        if (categoriaUrl) {
            // Un pequeño truco: actualizamos el botón activo también
            const botonFiltro = document.querySelector(`button[onclick="filtrar('${categoriaUrl}')"]`);
            if(botonFiltro) {
                // Quitamos la clase active de todos y se la damos al correcto
                document.querySelectorAll('.btn').forEach(b => b.classList.remove('active')); // Si usas clase active
                // Simplemente ejecutamos el filtro
                filtrar(categoriaUrl); 
            } else {
                filtrar(categoriaUrl);
            }
        }
        
    } catch (error) {
        console.error("Error al cargar productos:", error);
        contenedor.innerHTML = '<p>Hubo un error cargando el catálogo.</p>';
    }
}

// 4. Función para dibujar las tarjetas en la pantalla
function mostrarProductos(listaProductos) {
    // Limpiamos el contenedor (borramos el "Cargando...")
    contenedor.innerHTML = '';

    // Recorremos cada producto de la lista
    listaProductos.forEach(producto => {
        // Creamos el HTML de cada tarjeta usando las comillas invertidas ``
        const tarjetaHTML = `
            <div class="tarjeta">
                <img src="${producto.image}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p class="precio">$${producto.price}</p>
                <button class="btn" onclick="verDetalle(${producto.id})">Ver Detalles</button>
            </div>
        `;
        
        // Agregamos la tarjeta al contenedor
        contenedor.innerHTML += tarjetaHTML;
    });
}

// 5. Función para filtrar (La llaman los botones del HTML)
function filtrar(categoria) {
    if (categoria === 'all') {
        // Si es 'all', mostramos todo
        mostrarProductos(productosTotales);
    } else {
        // Si no, filtramos por la categoría exacta de la API
        const filtrados = productosTotales.filter(item => item.category === categoria);
        mostrarProductos(filtrados);
    }
}

// 6. Función dummy para el botón "Ver Detalles" (Requisito futuro)
function verDetalle(id) {
    // Redirige a la página detalle pasando el ID en la URL
    window.location.href = `detalle.html?id=${id}`;
}

// Ejecutamos la carga inicial
cargarProductos();
let productosTotales = [];
const contenedor = document.getElementById('lista-productos');

async function cargarProductos() {
    try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        productosTotales = await respuesta.json();

        const categoriaUrl = new URLSearchParams(window.location.search).get('cat');

        if (categoriaUrl) {
            filtrar(categoriaUrl);
        } else {
            mostrarProductos(productosTotales);
        }

    } catch (error) {
        console.error("Error:", error);
        contenedor.innerHTML = '<p>Error al cargar el catálogo.</p>';
    }
}

function mostrarProductos(lista) {
    let html = '';

    lista.forEach(producto => {
        html += `
            <div class="tarjeta">
                <img src="${producto.image}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p class="precio">$${producto.price}</p>
                <button class="btn" onclick="verDetalle(${producto.id})">Ver Detalles</button>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function filtrar(categoria) {
    if (categoria === 'all') {
        mostrarProductos(productosTotales);
    } else {
        const filtrados = productosTotales.filter(item => item.category === categoria);
        mostrarProductos(filtrados);
    }
}

function verDetalle(id) {
    window.location.href = `./detalle.html?id=${id}`;
}

cargarProductos();
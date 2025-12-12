// 1. Obtener el ID de la URL (ej: detalle.html?id=5)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const contenedor = document.getElementById('detalle-producto');

async function cargarDetalle() {
    if (!id) {
        contenedor.innerHTML = '<p>Producto no especificado.</p>';
        return;
    }

    try {
        // 2. Pedir a la API solo ESTE producto
        const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);
        const producto = await respuesta.json();

        // 3. Dibujar el HTML del detalle
        contenedor.innerHTML = `
            <div class="detalle-imagen">
                <img src="${producto.image}" alt="${producto.title}">
            </div>
            <div class="detalle-info">
                <h2>${producto.title}</h2>
                <p class="categoria">Categoría: ${producto.category}</p>
                <p class="descripcion">${producto.description}</p>
                <p class="precio-grande">$${producto.price}</p>
                <button class="btn">Comprar Ahora</button>
            </div>
        `;
    } catch (error) {
        console.error(error);
        contenedor.innerHTML = '<p>Error al cargar el producto.</p>';
    }
}

cargarDetalle();
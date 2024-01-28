// Obtener la tabla de productos
const tablaProductos = document.querySelector('.table');

// Función para obtener los productos desde el localStorage
function obtenerProductosFavoritos() {
    const productosFavoritos = JSON.parse(localStorage.getItem('productosFavoritos')) || [];
    return productosFavoritos;
}

// Función para mostrar los productos favoritos en la tabla
function mostrarProductosFavoritos() {
    const productosFavoritos = obtenerProductosFavoritos();

    // Limpiar la tabla antes de mostrar los productos
    tablaProductos.innerHTML = '';

    productosFavoritos.forEach((producto, index) => {
        const fila = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td class="table__productos">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h6 class="title">${producto.nombre}</h6>
                </td>
                <td class="table__price"><p>${producto.precio}</p></td>
                <td class="table__cantidad">
                    <button class="delete btn btn-danger" onclick="quitarDeFavoritos(${index})">Quitar de Favoritos</button>
                </td>
            </tr>
        `;
        tablaProductos.innerHTML += fila;
    });

    // Calcular y mostrar el total
    const total = productosFavoritos.reduce((acc, producto) => acc + parseFloat(producto.precio.replace('$', '').replace(',', '')), 0);
    document.querySelector('.itemCartTotal').textContent = `Total: $${total.toFixed(2)}`;
}

// Función para añadir un producto a favoritos
function agregarAFavoritos(producto) {
    const productosFavoritos = obtenerProductosFavoritos();
    productosFavoritos.push(producto);
    localStorage.setItem('productosFavoritos', JSON.stringify(productosFavoritos));
    mostrarProductosFavoritos();
}

// Función para quitar un producto de favoritos
function quitarDeFavoritos(index) {
    const productosFavoritos = obtenerProductosFavoritos();
    productosFavoritos.splice(index, 1);
    localStorage.setItem('productosFavoritos', JSON.stringify(productosFavoritos));
    mostrarProductosFavoritos();
}

// Función para simular la compra 
function comprar() {
    alert("Compra realizada. Gracias por tu compra!");

    localStorage.removeItem('productosFavoritos');
    mostrarProductosFavoritos();
}

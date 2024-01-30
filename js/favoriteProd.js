// Obtener la tabla de productos
const tablaProductos = document.querySelector('.table');
const tableElement = document.querySelector('tbody');
/*const favoriteProduc = JSON.parse(localStorage.getItem('favoriteProducs')) || []*/
let arrFavoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];


// Función para mostrar los productos favoritos en la tabla
function listFavoriteProduc() {
    // Limpiar la tabla antes de mostrar los productos
    tableElement.innerHTML = '';
    arrFavoriteProducts.forEach(element => {
      tableElement.innerHTML +=`
            <tr>
                <th class="py-auto" scope="row">${element.code}</th>
                <td class="table__productos">
                    <img src="${element.imgUrl}" alt="${element.name}">
                    <h6 class="title">${element.name}</h6>
                </td>
                <td class="table__price"><p>$${element.price}</p></td>
                <td class="table__cantidad">
                    <button class="delete btn btn-danger" onclick= "deleteFavorite('${element.code}')" >Quitar de Favoritos</button>
                </td>
            </tr>
        `;
    }); console.log(arrFavoriteProducts)

}
    // Calcular y mostrar el total
    const total = arrFavoriteProducts.reduce((acc, element) => acc + parseFloat(element.price.replace('$', '').replace(',', '')), 0);
    document.querySelector('.itemCartTotal').textContent = `Total: $${total.toFixed(2)}`;


// Función para quitar un producto de favoritos
window.deleteFavorite = function (code) {
    let newFavoriteProducts = arrFavoriteProducts.filter((element)=> element.code !== code);
arrFavoriteProducts = newFavoriteProducts;
    localStorage.setItem('favoriteProducts', JSON.stringify(arrFavoriteProducts)); 
    listFavoriteProduc();
}

// Función para simular la compra 
function comprar() {
    alert("Compra realizada. Gracias por tu compra!");

    localStorage.removeItem('favoriteProducts');
    listFavoriteProduc();
}
listFavoriteProduc();
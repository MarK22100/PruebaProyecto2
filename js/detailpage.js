const arrFavoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
const arrayProducts = JSON.parse(localStorage.getItem("products")) || [];

let title = document.getElementById('title');
let category = document.getElementById('category');
let image = document.getElementById('image');
let price = document.getElementById('price');
let description = document.getElementById('description');
let stock = document.getElementById('stock');
let addFavorite = document.getElementById('addFavorite');


let productId = new URLSearchParams(window.location.search).get('codigo');

function detailPage() {
    const prodSelec = arrayProducts.filter((element) => {
        return element.code == productId
    })[0]

    if (!prodSelec) {
        window.location.href = "/index.html"
    }
    title.innerText = prodSelec.name;
    category.innerText = "CATEGORIA: " + prodSelec.category;
    image.src = prodSelec.imgUrl;
    price.innerText = "$" + prodSelec.price;
    description.innerText = prodSelec.description;
    stock.innerText = "STOCK: " + prodSelec.stock;
}

detailPage();


window.addFavProduct = function () {



    const favoriteProduct = arrayProducts.find((element) => {
        return element.code === productId;
    })
    if (arrFavoriteProducts.includes(favoriteProduct)) {
        Swal.fire({
            title: "Ups!!!",
            text: "Este producto ya esta en tu lista de favoritos",
            icon: "info"
        });
    }
    else {
        console.log(favoriteProduct);
        arrFavoriteProducts.push(favoriteProduct);
        localStorage.setItem('favoriteProducts', JSON.stringify(arrFavoriteProducts));

    }
}

window.enabledBtnFav = function() {
    const sesionCheck = JSON.parse(sessionStorage.getItem('userSesion'));
    if (sesionCheck!=null) {
        addFavorite.addEventListener('click', addFavProduct);
    }
    else{
        Swal.fire({
            title: "Ups!!!",
            text: "Para añadir productos a favoritos debes iniciar sesion!!",
            icon: "info"
        });
    }
}


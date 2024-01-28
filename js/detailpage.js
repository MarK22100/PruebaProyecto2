const arrFavoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
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
    category.innerText = prodSelec.category;
    image.src = prodSelec.imgUrl;
    price.innerText = prodSelec.price;
    description.innerText = prodSelec.description;
    stock.innerText = prodSelec.stock;
}

detailPage();


window.addFavProduct = function() {

    const favoriteProduct = arrayProducts.find((element) => {
        return element.code === productId;
    })
     
         if (arrFavoriteProducts.includes(favoriteProduct)) {
             Swal.fire({
                 title: "Ups??",
                 text: "Este prodecto ya esta en tu lista de favoritos",
                 icon: "info"
             });
         }
         else {

            arrFavoriteProducts.push(favoriteProduct);
            localStorage.setItem('favoriteProducts', JSON.stringify(arrFavoriteProducts));

        }
}

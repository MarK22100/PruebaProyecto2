let arrayProduct = JSON.parse(localStorage.getItem("productos")) || [];

let title = document.getElementById('title');
let category = document.getElementById('category');
let image = document.getElementById('image');
let price = document.getElementById('price');
let description = document.getElementById('description');
let stock = document.getElementById('stock');

function detailPage(){
    const arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];

    let productId = new URLSearchParams(window.location.search).get('codigo');
    const prodSelec = arrayProductos.filter((element) =>{
        return element.codigo == productId
    })[0]

    if(!prodSelec){
        window.location.href="/index.html"
    }
    title.innerText = prodSelec.title;
    category.innerText = prodSelec.category;
    image.innerText = prodSelec.image;
    price.innerText = prodSelec.price;
    description.innerText = prodSelec.description;
    stock.innerText = prodSelec.stock;
}
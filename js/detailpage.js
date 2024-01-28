let arrayProduct = JSON.parse(localStorage.getItem("products")) || [];

let title = document.getElementById('title');
let category = document.getElementById('category');
let image = document.getElementById('image');
let price = document.getElementById('price');
let description = document.getElementById('description');
let stock = document.getElementById('stock');

function detailPage(){
    const arrayProducts = JSON.parse(localStorage.getItem("products")) || [];

    let productId = new URLSearchParams(window.location.search).get('code');
    const prodSelec = arrayProducts.filter((element) =>{
        return element.code == productId
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

detailPage();
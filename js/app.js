let cardProducts = document.getElementById("cardProducts")
const arrayProducts = JSON.parse(localStorage.getItem("products")) || [] ; 

function CrearCards() {
    cardProducts.innerHTML = ""; 
    arrayProducts.forEach((element) => {
        cardProducts.innerHTML += `
        <div class="product-item card shadow h-100 m-2" style="min-width: 280px;" category="${element.category}">
        <img src="${element.imgUrl}" class="card-img-top" style="height: 300px" alt="${element.description}" >
        <div class="card-body text-center">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${element.description}</p>A
          <p class="card-text">$${element.price}</p>
          <a href="#">
          <button type="button" class="btn btn-dark btn-custom-hoveer" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Comprar
          </button>
        </a>
        <a href="/detailPage.html?codigo=${element.code}">
          <button type="button" class="btn btn-danger btn-custom-colours btn-custom-hoveer" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Ver mas
          </button>
          </a>
        </div>
      </div>
      `
     });
    }

CrearCards()

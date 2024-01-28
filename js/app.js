let cardProducts = document.getElementById("cardProducts")
const arrayProducts = JSON.parse(localStorage.getItem("products")) || [] ; 

function CrearCards() {
    cardProducts.innerHTML = ""; 
    arrayProducts.forEach((element) => {
        cardProducts.innerHTML += `
        <div class="product-item card  shadow w-auto m-2" style="min-width: 280px; max-width: 280px" category="${element.category}">
        <img src="${element.imgUrl}" class="card-img-top" style="height: 300px" alt="${element.description}" >
        <div class="card-body text-center">
          <h5 class="card-title text-colour-title">${element.name}</h5>
          <p class="card-text"> Si quieres ver más información sobre los podructos dale click al boton de detalle </p>A
          <p class="card-text">$${element.price}</p>
          
          <a href="../pages/errorpage.html" class="btn btn-dark btn-custom-hoveer btn-custom-colours"  >
          Comprar
          </a>
       
          <a href="./pages/detailpage.html?codigo=${element.code}" class="btn btn-dark btn-custom-hoveer-negative btn-custom-colours-negative" >
          Detalle
          </a>
        </div>
      </div>
      `
     });
    }

CrearCards()

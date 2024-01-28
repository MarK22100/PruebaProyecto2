let cardProduct = document.getElementById("cardProduct")
console.log(cardProduct);
function CrearCards() {
    const arrayProduct = JSON.parse(localStorage.getItem("product")) || [] ; 
    cardProduct.innerHTML = ""; 
    arrayProduct.forEach((element) => {
        cardProductos.innerHTML += `
        <div class="col mb-4">
        <div class="card product-item card mx-auto shadow" style="max-width: 350px;" id="cardProduct" category="${element.category}">
          <img src="${element.url}" class="card-img-top" style="height: 300px" alt="...">
          <div class="card-body text-center">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.descripcion}.</p>
            <p class="card-text">$ ${element.price}</p>
            <button type="button" class="btn btn-dark btn-custom-hoveer" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <a href="./pages/errorpage.html">Comprar</a>
            </button>
            <a href="#">
              <button type="button" class="btn btn-danger btn-custom-colours btn-custom-hoveer" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ver mas
              </button>
            </a>
          </div>
        </div>
      </div>
      `
     });
    }


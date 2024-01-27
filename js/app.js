let cardProductos = document.getElementById("cardProductos")
console.log(cardProductos);
function CrearCards() {
    const arrayProductos = JSON.parse(localStorage.getItem("productos")) || [] ; 
    cardProductos.innerHTML = ""; 
    arrayProductos.forEach((element) => {
        cardProductos.innerHTML += `
        <div class="card shadow h-100 m-2" style="min-width: 280px;" id="cardProductos" category="${element.categoria}">
        <img src="${element.imgUrl}" class="card-img-top" style="height: 300px" alt="${element.descripcion}" >
        <div class="card-body text-center">
          <h5 class="card-title">${element.nombre}</h5>
          <p class="card-text">${element.descripcion}</p>
          <p class="card-text">$${element.precio}</p>
          <a href="#">
          <button type="button" class="btn btn-dark btn-custom-hoveer" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Comprar
          </button>
        </a>
        <a href="#">
          <button type="button" class="btn btn-danger btn-custom-colours btn-custom-hoveer" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Ver mas
          </button>
          </a>
        </div>
      </div>`
        
     });
}

CrearCards()
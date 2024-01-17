let cardProductos = document.getElementById("cardProductos")
console.log(cardProductos);
function CrearCards() {
    const arrayProductos = JSON.parse(localStorage.getItem("productos")) || [] ; 
    cardProductos.innerHTML = ""; 
    arrayProductos.forEach((element) => {
        cardProductos.innerHTML += `
        <div class="card mt-5 mx-auto card shadow" style="width: 18rem;" id="cardProductos">
        <img src="${element.imgUrl}" class="card-img-top" style="height: 300px" alt="${element.descripcion}">
        <div class="card-body text-center">
          <h5 class="card-title">${element.nombre}</h5>
          <p class="card-text">${element.descripcion}</p>
          <p class="card-text">$ ${element.precio}</p>
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Comprar
          </button>
    
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">¿Desea continuar con la compra?</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  
                </div>
                <div class="modal-body">
                    Presione continuar para seguir con su compra
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">No</button>
                  <button type="button" class="btn btn-success">Continuar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
        
     });
}


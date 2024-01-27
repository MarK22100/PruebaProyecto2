/**
 * Se requieren helpers de validación de:
 * Name de producto
 * Price
 * Categoría
 * Imágen
 * Descripción
 * Stock
 */
import {
    validateInputRequired,
    validateInputPrice,
    validateInputCategory,
    validateInputUrl,
    validateInputDescription,
    validateInputStock,
    validateAll,
    getAleatoryCode,
    getRoleUserLog
  } from "./hellpers.js";
  
import { checkAdmin } from "./user.js";

let adminLi=document.getElementById('adminLi');
checkAdmin(adminLi);

let arrayProducts = JSON.parse(localStorage.getItem("products")) || [];
let bodyTabla = document.querySelector("tbody");
let inputName = document.getElementById("name");
let inputPrice = document.getElementById("Price");
let inputCategory = document.getElementById("category");
let inputImgUrl = document.getElementById("imgUrl");
let inputDescription = document.getElementById("description");
let inputStock = document.getElementById("stock");
console.log(bodyTabla);
let form = document.getElementById('formProducts');
inputCode.value = getAleatoryCode();

form.addEventListener("submit", saveProduct);

inputCode.addEventListener("blur", () => {
validateInputRequired(inputCode);
});

inputName.addEventListener("blur", () => {
validateInputRequired(inputName);
});

inputDescription.addEventListener("blur", () => {
validateInputDescription(inputDescription);
});

inputDescription.addEventListener("blur", () => {
validateInputCategory(inputCategory);
});

inputDescription.addEventListener("blur", () => {
validateInputStock(inputStock);
});

inputPrice.addEventListener("blur", () => {
validateInputPrice(inputPrice);
});

inputImgUrl.addEventListener("blur", () => {
validateInputUrl(inputImgUrl);
});

listProducts();

let isEdition = false;

function saveProduct(e) {
    e.preventDefault();
    if (
        validateAll(
        inputCode,
        inputName,
        inputDescription,
        inputCategory,
        inputStock,
        inputPrice,
        inputImgUrl
        )
    ) {
      if (isEdition) {
        saveProductEdited();
      } else {
        CreateProduct();
      }
    } else {
      Swal.fire({
        title: "Ups",
        text: "Todos los campos son requeridos.",
        icon: "error",
      });
    }
  }

function CreateProduct() {
    console.log('Entró en guardar producto');
    const newProduct = {
        code: inputCode.value,
        name: inputName.value,
        description: inputDescription.value,
        category: inputCategory.value,
        stock: inputStock.value,
        Price: inputPrice.value,
        imgUrl: inputImgUrl.value,
    };

    arrayProducts.push(newProduct);
    Swal.fire({
        title: "Éxito",
        text: "El producto se guardó correctamente",
        icon: "success",
    });
    cleanForm();
    listProducts();
}

function saveProductEdited() {
  let indexProduct = arrayProducts.findIndex((element) => {
    return element.code === inputCode.value;
  });

  if (indexProduct !== -1) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a cambiar los datos de un producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        arrayProducts[indexProduct].code = inputCode.value;
        arrayProducts[indexProduct].name = inputName.value;
        arrayProducts[indexProduct].description = inputDescription.value;
        arrayProducts[indexProduct].Price = inputPrice.value;
        arrayProducts[indexProduct].imgUrl = inputImgUrl.value;
        isEdition = false;
        Swal.fire({
          title: "Exito",
          text: "El producto se actualizo correctamente",
          icon: "success",
        });

        cleanForm();
        listProducts();
      } else {
        isEdition = false;
        cleanForm();
      }
    });
  } else {
    console.log(
      "Entró en el else de guardar producto editado porque el code no existe"
    );
  }
}

window.cleanForm = function () {
    form.reset();
    inputCode.className = "form-control";
    inputCode.value = getAleatoryCode();
    inputName.className = "form-control";
    inputDescription.className = "form-control";
    inputCategory.className = "form-control";
    inputStock.className = "form-control";
    inputPrice.className = "form-control";
    inputImgUrl.className = "form-control";
    GuardarLocalStorage();
};

function GuardarLocalStorage() {
    localStorage.setItem("products", JSON.stringify(arrayProducts));
}

function validateRole(){
    console.log('Entró en checkAdmin');
    const role=getRoleUserLog();

    if(role!=='Admin'){
        window.location.replace('/index.html');
    };  
};

function listProducts() {
    bodyTabla.innerHTML = "";
    arrayProducts.forEach((element) => {
        bodyTabla.innerHTML += ` <tr>                  
            <th scope="row">${element.code}</th>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>$ ${element.Price}</td>
            <td><a href="${element.imgUrl}" target="_blank" title="Ver Imagen">${element.imgUrl}</a></td>
            <td class="">
            <div class="d-flex">
            <a href='#titulo' class="btn btn-warning mx-1" onclick="PrepararEdicion('${element.code}')">Editar</a>
            <button type="button" class="btn btn-danger mx-1" onclick="BorrarProducto('${element.code}')" >Eliminar</button>
            </div>
            </td>                
        </tr>`;
    });
}

window.PrepararEdicion = function (code) {
  const productoAEditar = arrayProducts.find((element) => {
    return element.code === code;
  });
  if (productoAEditar !== undefined) {
    inputCode.value = productoAEditar.code;
    inputName.value = productoAEditar.name;
    inputDescription.value = productoAEditar.description;
    inputPrice.value = productoAEditar.Price;
    inputImgUrl.value = productoAEditar.imgUrl;
  }
  isEdition = true;

window.BorrarProducto = function (code) {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "Los cambios no se podrán revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const nuevoArrProductos = arrayProducts.filter(
        (element) => element.code !== code
      );
      arrayProducts = nuevoArrProductos;
      Swal.fire({
        title: "Exito",
        text: "El producto se elimino correctamente",
        icon: "success",
      });
      GuardarLocalStorage();
      listProducts();
    }
  });

};

validateRole();
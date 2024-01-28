import {validateAll} from "./hellpers.js";


let arrayProducts = JSON.parse(localStorage.getItem("products")) || [];
let bodyTabla = document.querySelector("tbody");
let inputCode = document.getElementById("code");
let inputName = document.getElementById("name");
let inputCategory = document.getElementById("category");
let inputDescription = document.getElementById("description");
let inputStock = document.getElementById("stock");
let inputPrice = document.getElementById("price");
let inputImgUrl = document.getElementById("imgUrl");

inputCode.value = setCode();

console.log(bodyTabla);
let form = document.getElementById('formProducts');
form.addEventListener("submit", saveProd);

listProduct();

let isEdit = false;

function saveProd(e) {
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
      if (isEdit) {
        saveProdEdit();
      } else {
        createProd();
      }
    } else {
      Swal.fire({
        title: "Ups",
        text: "Todos los campos son requeridos.",
        icon: "error",
      });
    }
  }

  function createProd() {
    console.log('Entró en guardar producto');
    const newProduc = {
        code: inputCode.value,
        name: inputName.value,
        description: inputDescription.value,
        category: inputCategory.value,
        stock: inputStock.value,
        price: inputPrice.value,
        imgUrl: inputImgUrl.value,
    };

    arrayProducts.push(newProduc);
    Swal.fire({
        title: "Éxito",
        text: "El producto se guardó correctamente",
        icon: "success",
    });
    cleanForm();
    listProduct();
}
function saveProdEdit() {
    let indexProduc = arrayProducts.findIndex((element) => {
      return element.code === inputCode.value;
    });
  
    if (indexProduc !== -1) {
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
          arrayProducts[indexProduc].code = inputCode.value;
          arrayProducts[indexProduc].name= inputName.value;
          arrayProducts[indexProduc].description = inputDescription.value;
          arrayProducts[indexProduc].category= inputCategory.value;
          arrayProducts[indexProduc].stock = inputStock.value;
          arrayProducts[indexProduc].price = inputPrice.value;
          arrayProducts[indexProduc].imgUrl = inputImgUrl.value;
          isEdit = false;
          Swal.fire({
            title: "Exito",
            text: "El producto se actualizo correctamente",
            icon: "success",
          });
  
          cleanForm();
          listProduct();
        } else {
          isEdit = false;
          listProduct();
        }
      });
    } else {
        Swal.fire({
            title: "El elemento no pertence a lista",
            text: "Producto no enlistado",
            icon: "info"
          });
      console.log(
        "entro en el else de guardar producto editado por q el codigo no existe dentro del arrProductos"
      );
    }
  }
window.cleanForm = function() {
    form.reset();
    inputCode.className = "form-control";
    inputCode.value = setCode();
    inputName.className = "form-control";
    inputDescription.className = "form-control";
    inputCategory.className = "form-control";
    inputStock.className = "form-control";
    inputPrice.className = "form-control";
    inputImgUrl.className = "form-control";
    saveInLocalStorage();
};
function saveInLocalStorage() {
    localStorage.setItem("products", JSON.stringify(arrayProducts));
}
function listProduct() {
    bodyTabla.innerHTML = "";
    arrayProducts.forEach((element) => {
        bodyTabla.innerHTML += ` <tr>                  
            <th scope="row">${element.code}</th>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>${element.category}</td>
            <td>${element.stock}</td>
            <td>$ ${element.price}</td>
            <td><a href="${element.imgUrl}" target="_blank" title="Ver Imagen">${element.imgUrl}</a></td>
            <td class="">
            <div class="d-flex">
            <a href='#titulo' class="btn btn-warning mx-1" onclick="prepareEdit('${element.code}')">Editar</a>
            <button type="button" class="btn btn-danger mx-1" onclick="deleteProd('${element.code}')" >Eliminar</button>
            </div>
            </td>                
        </tr>`;
    });
}
window.prepareEdit = function (code) {
    const producToEdit = arrayProducts.find((element) => {
      return element.code === code;
    });
    if (producToEdit !== undefined) {
      inputCode.value = producToEdit.code;
      inputName.value = producToEdit.name;
      inputDescription.value = producToEdit.description;
      inputStock.value = producToEdit.stock;
      inputCategory.value = producToEdit.category;
      inputPrice.value = producToEdit.price;
      inputImgUrl.value = producToEdit.imgUrl;
    }
    isEdit = true;
}
window.deleteProd = function (code) {
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
        const newArrayProd = arrayProducts.filter(
          (element) => element.code !== code
        );
        arrayProducts = newArrayProd;
        Swal.fire({
          title: "Exito",
          text: "El producto se elimino correctamente",
          icon: "success",
        });
        saveInLocalStorage();
        listProduct();
      }
    });
  
  }

  function setCode() {
    let code;
    let codesList = arrayProducts.map((element) => element.code);
  
    do {
        code = Math.floor(0 + Math.random() * 9999);
    } while (codesList.includes(code));
    
    return code;
  }

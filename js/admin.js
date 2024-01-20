/**
 * Se requieren helpers de validación de:
 * Nombre de producto
 * Precio
 * Categoría
 * Imágen
 * Descripción
 * Stock
 */
import {
    validarInputRequerido,
    validarInputPrecio,
    validarInputCategoria,
    validarInputUrl,
    validarInputDescripcion,
    validarInputStock,
    validarTodo,
    ObtenerCodigoAleatorio,
    getRoleUserLog
  } from "./hellpers.js";
  
  import { checkAdmin } from "./user.js";
  
  let adminLi=document.getElementById('adminLi');
  checkAdmin(adminLi);
  
  let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
  let bodyTabla = document.querySelector("tbody");
  let inputNombre = document.getElementById("nombre");
  let inputPrecio = document.getElementById("precio");
  let inputCategoria = document.getElementById("categoria");
  let inputImgUrl = document.getElementById("imgUrl");
  let inputDescripcion = document.getElementById("descripcion");
  let inputStock = document.getElementById("stock");
  console.log(bodyTabla);
  let form = document.getElementById('formProductos');
  inputCodigo.value = ObtenerCodigoAleatorio();
  
  form.addEventListener("submit", GuardarProducto);
  
  inputCodigo.addEventListener("blur", () => {
    validarInputRequerido(inputCodigo);
  });
  
  inputNombre.addEventListener("blur", () => {
    validarInputRequerido(inputNombre);
  });
  
  inputDescripcion.addEventListener("blur", () => {
    validarInputDescripcion(inputDescripcion);
  });

  inputDescripcion.addEventListener("blur", () => {
    validarInputCategoria(inputCategoria);
  });

  inputDescripcion.addEventListener("blur", () => {
    validarInputStock(inputStock);
  });

  inputPrecio.addEventListener("blur", () => {
    validarInputPrecio(inputPrecio);
  });
  
  inputImgUrl.addEventListener("blur", () => {
    validarInputUrl(inputImgUrl);
  });
  
  ListarProductos();
  
  let esEdicion = false;
  
  function GuardarProducto(e) {
    e.preventDefault();
    if (
      validarTodo(
        inputCodigo,
        inputNombre,
        inputDescripcion,
        inputCategoria,
        inputStock,
        inputPrecio,
        inputImgUrl
      )
    ) {
        CrearProducto();
    } else {
      Swal.fire({
        title: "Ups",
        text: "Todos los campos son requeridos.",
        icon: "error",
      });
    }
  }
  
  function CrearProducto() {
    console.log('Entró en guardar producto');
    const nuevoProducto = {
      codigo: inputCodigo.value,
      nombre: inputNombre.value,
      descripcion: inputDescripcion.value,
      categoria: inputCategoria.value,
      stock: inputStock.value,
      precio: inputPrecio.value,
      imgUrl: inputImgUrl.value,
    };
  
    arrayProductos.push(nuevoProducto);
    Swal.fire({
      title: "Éxito",
      text: "El producto se guardó correctamente",
      icon: "success",
    });
    LimpiarFormulario();
    ListarProductos();
  }
  
  window.LimpiarFormulario = function () {
    form.reset();
    inputCodigo.className = "form-control";
    inputCodigo.value = ObtenerCodigoAleatorio();
    inputNombre.className = "form-control";
    inputDescripcion.className = "form-control";
    inputCategoria.className = "form-control";
    inputStock.className = "form-control";
    inputPrecio.className = "form-control";
    inputImgUrl.className = "form-control";
    GuardarLocalStorage();
  };
  
  function GuardarLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
  }
  
  function ValidateRole(){
    console.log('Entró en checkAdmin');
    const role=getRoleUserLog();
  
    if(role!=='Admin'){
      window.location.replace('/index.html');
    };  
  };
  
  ValidateRole();
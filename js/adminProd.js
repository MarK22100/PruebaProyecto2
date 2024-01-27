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
      if (esEdicion) {
        GuardarProductoEditado();
      } else {
        CrearProducto();
      }
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

function GuardarProductoEditado() {
  let indexProducto = arrayProductos.findIndex((element) => {
    return element.codigo === inputCodigo.value;
  });

  if (indexProducto !== -1) {
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
        arrayProductos[indexProducto].codigo = inputCodigo.value;
        arrayProductos[indexProducto].nombre = inputNombre.value;
        arrayProductos[indexProducto].descripcion = inputDescripcion.value;
        arrayProductos[indexProducto].precio = inputPrecio.value;
        arrayProductos[indexProducto].imgUrl = inputImgUrl.value;
        esEdicion = false;
        Swal.fire({
          title: "Exito",
          text: "El producto se actualizo correctamente",
          icon: "success",
        });

        LimpiarFormulario();
        ListarProductos();
      } else {
        esEdicion = false;
        LimpiarFormulario();
      }
    });
  } else {
    console.log(
      "entro en el else de guardar producto editado por q el codigo no existe dentro del arrProductos"
    );
  }
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
/*
function ValidateRole(){
    console.log('Entró en checkAdmin');
    const role=getRoleUserLog();

    if(role!=='Admin'){
        window.location.replace('/index.html');
    };  
};
*/
function ListarProductos() {
    bodyTabla.innerHTML = "";
    arrayProductos.forEach((element) => {
        bodyTabla.innerHTML += ` <tr>                  
            <th scope="row">${element.codigo}</th>
            <td>${element.nombre}</td>
            <td>${element.descripcion}</td>
            <td>$ ${element.precio}</td>
            <td><a href="${element.imgUrl}" target="_blank" title="Ver Imagen">${element.imgUrl}</a></td>
            <td class="">
            <div class="d-flex">
            <a href='#titulo' class="btn btn-warning mx-1" onclick="PrepararEdicion('${element.codigo}')">Editar</a>
            <button type="button" class="btn btn-danger mx-1" onclick="BorrarProducto('${element.codigo}')" >Eliminar</button>
            </div>
            </td>                
        </tr>`;
    });
}

window.PrepararEdicion = function (codigo) {
  const productoAEditar = arrayProductos.find((element) => {
    return element.codigo === codigo;
  });
  if (productoAEditar !== undefined) {
    inputCodigo.value = productoAEditar.codigo;
    inputNombre.value = productoAEditar.nombre;
    inputDescripcion.value = productoAEditar.descripcion;
    inputPrecio.value = productoAEditar.precio;
    inputImgUrl.value = productoAEditar.imgUrl;
  }
  esEdicion = true;

window.BorrarProducto = function (codigo) {
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
      const nuevoArrProductos = arrayProductos.filter(
        (element) => element.codigo !== codigo
      );
      arrayProductos = nuevoArrProductos;
      Swal.fire({
        title: "Exito",
        text: "El producto se elimino correctamente",
        icon: "success",
      });
      GuardarLocalStorage();
      ListarProductos();
    }
  });

};
}

import {validateInputsSignUp, validateSignIn } from "./hellpers.js";

//Elements
let formSignUp= document.getElementById('formSignUp');
let adminUserBtn = document.getElementById('adminUserBtn');
let adminProdBtn = document.getElementById('adminProdBtn');
let prodSelected = document.getElementById('prodSelected');
let btnSignIn = document.getElementById('btnSignIn');
let btnSignOut = document.getElementById('btnSignOut');

//Sava data on LS
let userReg = JSON.parse(localStorage.getItem('userReg')) || [];
let usersAdmin = JSON.parse(localStorage.getItem('usersAdmin')) || [];

//Elements SignUp
let nameInp=document.getElementById('nameInput');
let emailInp=document.getElementById('emailInput');
let passwordInp=document.getElementById('passInput');
let repPassInp=document.getElementById('repPassInput')
//

//Elements SignIn
let emailSignIn = document.getElementById('emailSignIn');
let passSignIn = document.getElementById('passSignIng');

//Buttons
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

checkSesion()
export function checkSesion(){
    const sesionSignIn = JSON.parse(sessionStorage.getItem('userSesion'));
    if (sesionSignIn == null) {
        adminUserBtn.href='/index.html',
        adminProdBtn.href='/index.html',
        prodSelected.href='/index.html'
        
    }
    if (sesionSignIn!=null) {
        btnSignIn.className='d-none';
        btnSignOut.className='btn btnSignOut';

        if (sesionSignIn.emailUser === "admin@example.com") {
            btnSignIn.className='d-none';
            btnSignOut.className='btn btnSignOut';
            prodSelected.className='nav-link';
            adminProdBtn.className='nav-link';
            adminUserBtn.className='nav-link';
        
            }
            else{
            prodSelected.className='nav-link';
            document.getElementById('btnSignIn').className='d-none';
            document.getElementById('btnSignOut').className='btn btnSignOut';
            }
        }
        
    

}

function adminExists(usersAdmin) {
    return usersAdmin.some(user => user.nameUser === 'admin');
}



registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// Create User
window.createUser = function(){
    const newUser = {
        nameUser : nameInp.value,
        emailUser : emailInp.value,
        passUser : passwordInp.value,
        admin : false

    }
    if (validateInputsSignUp(nameInp,emailInp,passwordInp)){
        if (userReg.some((v)=>{
            return v.emailUser === emailInp.value;
        })) {
            Swal.fire({
                confirmButtonColor: "#ff5e00",
                iconColor: "#ff5e00",
                icon: "info",
                title: "Revisar...",
                text: "Usuario ya registrado"
              });
        }
        else if(passwordInp.value !== repPassInp.value){
            Swal.fire({
                confirmButtonColor: "#ff5e00",
                iconColor: "#ff5e00",
                icon: "info",
                title: "Revisar...",
                text: "La contraseñas no coinciden"
              });
        }
        else{
            userReg.push(newUser)
            localStorage.setItem('userReg',JSON.stringify(userReg));
            Swal.fire({
                confirmButtonColor: "#ff5e00",
                icon: "success",
                title: "Listo!",
                text: "Usuario registrado"
              });
            LimpiaFormulario()
        }
    }
    /*
    else{
        Swal.fire({
            confirmButtonColor: "#ff5e00",
            iconColor: "#ff5e00",
            icon: "info",
            title: "Oops...",
            text: "Revisar o completar los datos"
          });
    }
*/
}

//SignIn User
window.signIn = function(){
    const userSesion = {
        emailUser : emailSignIn.value,
        passUser : passSignIn.value 
    }
    if(validateSignIn(emailSignIn))
    {
            JSON.parse(sessionStorage.getItem('userSesion'))
                if (userReg.some((v)=>{
                    return v.emailUser === emailSignIn.value && v.passUser === passSignIn.value;
                })) {
                sessionStorage.setItem('userSesion',JSON.stringify(userSesion));
                prodSelected.className='nav-link';
                checkSesion()
                Swal.fire({
                    confirmButtonColor: "#ff5e00",
                    icon: "success",
                    text: "Inicio de sesion exitoso!",
                  });
                  setTimeout(()=>{
                    $('#signInModal').modal('hide')
                    },1500);
                    
                }
                else if(usersAdmin.some((v)=>{
                    return v.emailUser === emailSignIn.value && v.passUser === passSignIn.value
                })){
                    sessionStorage.setItem('userSesion',JSON.stringify(userSesion));
                    checkSesion()
                    Swal.fire({
                        confirmButtonColor: "#ff5e00",
                        icon: "success",
                        text: "Inicio de sesion exitoso!",
                      });
                    setTimeout(()=>{
                        $('#signInModal').modal('hide')
                    },1500);
                }
                else{
                    Swal.fire({

                        confirmButtonColor: "#ff5e00",
                        icon: "error",
                        text: "Revisa usuario o contraseña",
                      });
                }
    }
    else{
        Swal.fire({
            iconColor: "#ff5e00",
            confirmButtonColor: "#ff5e00",
            icon: "info",
            text: "Todos los campos son obligatorios",
          });
    }
}
// Función para crear el usuario administrador
function createAdmin() {

    // Verifica si el usuario administrador ya existe
    if (!adminExists(usersAdmin)) {
        let usersAdmin = JSON.parse(localStorage.getItem('usersAdmin')) || [];
       
        // Crea el usuario administrador
        const admin = {
            nameUser: 'admin',
            emailUser: 'admin@example.com',
            passUser: 'Admin2023',
            admin: true
        };

        // Agrega el usuario administrador a usersAdmin
        usersAdmin.push(admin);

        // Guarda usersAdmin en el localStorage
        localStorage.setItem('usersAdmin', JSON.stringify(usersAdmin));
    }
}

// Llama a createAdmin cuando la página se carga
window.onload = createAdmin;


function LimpiaFormulario(){
    formSignUp.reset()
    nameInp.className='form-control'
    emailInp.className='form-control'
    passwordInp.className='form-control'
    repPassInp.className='form-control'
}

let showPass = false;
let showRepPass = false;
let showPassSignIn = false;

window.pass = function(){

    if (showPass == true) {
        document.getElementById('passInput').type='password';
        document.getElementById('passIcon').src='/src/eye.svg';
        showPass = false;
    }
    else{
        document.getElementById('passInput').type='text';
        document.getElementById('passIcon').src='/src/eye-slash.svg';
        showPass = true;
        ;
    }
}
window.repPass = function(){

    if (showRepPass == true) {
        document.getElementById('repPassInput').type='password';
        document.getElementById('repPassIcon').src='/src/eye.svg';
        showRepPass = false;
    }
    else{
        document.getElementById('repPassInput').type='text';
        document.getElementById('repPassIcon').src='/src/eye-slash.svg';
        showRepPass = true;
        ;
    }
}
window.passSg = function(){
    if (showPassSignIn == true) {
        document.getElementById('passSignIng').type='password';
        document.getElementById('passSignIngIcon').src='/src/eye.svg';
        showPassSignIn = false;
    }
    else{
        document.getElementById('passSignIng').type='text';
        document.getElementById('passSignIngIcon').src='/src/eye-slash.svg';
        showPassSignIn = true;
    }
}
window.logOut = function(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Desea cerrar sesion?",
        text: "Si cierra sesion se eliminara sus productos favoritos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Cerrar Sesion!",
        cancelButtonText: "No, Mantener sesion iniciada!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Listo!!!",
            text: "Sesion finalizada",
            icon: "success",
            confirmButtonColor: "#ff5e00",
        });
        localStorage.removeItem('favoriteProducts')
         sessionStorage.clear()
         setTimeout(()=>{
        window.location ="/index.html";
    },1500)
}});
    
}

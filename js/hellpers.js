export function validateInputReq(input){
    if (input.value.trim().length>3  && input.value.trim().length <= 200) {
        input.className ="form-control is-valid"
        return true;
    }
    else{
        input.className ="form-control is-invalid"
        return false;
    }
}
export function validateEmail(input){
    const regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regExEmail.test(input.value)) {
        input.className = "form-control is-valid";
        return true;  
    }
    else{
        input.className = "form-control is-invalid";
        return false;
    }
}
export function validatePassword(input){
    const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if (regExPass.test(input.value)) {
        input.className = "form-control is-valid";
        return true;  
    }
    else{
        input.className = "form-control is-invalid";
        return false;
    }
}

export function validateInputsSignUp(nameInp, emailInp, passwordInp){
    if (validateInputReq(nameInp)&&validateEmail(emailInp)&&validatePassword(passwordInp)) {
        return true;
    }else{
        return false;
    }
}
export function validateSignIn(emailSignIn, passSignIn){
    if (validateEmail(emailSignIn)&&validatePassword(passSignIn)) {
        return true;
    }else{
        return false;
    }
}
//VALIDATES FORM INPUTS PRODUCT

export function validateAll(code, name, description, category, stock, price, img){
    if (validateInputReq(code)&&validateInputReq(name)&&validateInputReq(description)&&validatePrice(price)&&validateInputReq(img)&&validateStock(stock)&&validateInputReq(category)) {
        return true;
    }else{
        return false;
    }
}
export function validatePrice(input){
    const regexNum = /^[0-9]+$/;
    if (regexNum.test(input.value)) {
        input.className = "form-control is-valid";
        return true;  
    }
    else{
        input.className = "form-control is-invalid";
        return false;
    }

}
export function validateStock(input){
    const regexNum = /^[0-9]+$/;
    if (regexNum.test(input.value)) {
        input.className = "form-control is-valid";
        return true;  
    }
    else{
        input.className = "form-control is-invalid";
        return false;
    }

}


/*
export function generarCodigo() {
    let code;
    let codesList = arrayProducts.map((element) => element.code);
  
    do {
        code = Math.floor(0 + Math.random() * 9999);
    } while (codesList.includes(code));
    
    return code;
}


///Validation
//  SignIn
emailSignIn.addEventListener('blur',()=>{validateinputRequerido(emailSignIn)});
passSignIn.addEventListener('blur',()=>{validateinputRequerido(passSignIn)});
//  SignUp
nameInp.addEventListener('blur',()=>{validateinputRequerido(nameInp)});
emailInp.addEventListener('blur',()=>{validateinputRequerido(emailInp)});
passwordInp.addEventListener('blur',()=>{validateinputRequerido(passwordInp)});
repPassInp.addEventListener('blur',()=>{validateinputRequerido(repPassInp)});
*/
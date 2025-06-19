function init(){
    //ESCUCHA EL EVENTO SUBMIT DEL FORMULARIO
    $("#formRegistro").on("submit", function(e){
        //EVITA QUE EL FORMULARIO DE ENVIE AUTOMATICAMENTE
        e.preventDefault();
        
        //VALIDA EL FORMULARIO ANTES DE ENVIARLO
        if(isFormValid()){//SI ES VALIDO LO ENVIA
            registrar(e);
        }else{// CASO CONTRARIO MUESTRA MENSAJES DE ERROR.
            displayValidationMessages();
        }
    })
}

function isFormValid(){
    //usa Validator.js de CLOUDFLARE para validar cada campo del fomrulario.
    return validateEmail();
}

function validateEmail(){
    var email=$("#email").val();
    var isValid = validator.isEmail(email);
    //muestra el mensaje de error si la validacion no es exitosa
    displayErrorMessage("#email", isValid, "Ingrese Correo Electrónico");
    return isValid;
}

function displayErrorMessage(fieldSelector, isValid, message){
    //busca el elemento de mensaje de error y actualiza su contenido
    var errorField = $(fieldSelector).next(".validation-error");
    errorField.text(isValid ? "" : message);
    errorField.toggleClass("text-danger", !isValid);
}

function displayValidationMessages(){
    validateEmail();
}

function registrar(e){
    e.preventDefault();
    var formData = new FormData($("#formRegistro")[0]);
    $.ajax({
        url:"../../controller/usuario.php?op=registrar",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            console.log("Guardado en la BBD!"+datos);
        }
    });
}

init();

console.log("test");
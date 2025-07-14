// Inicializa los eventos y validaciones del formulario de registro
function init(){
    //ESCUCHA EL EVENTO SUBMIT DEL FORMULARIO
    $("#formRegistro").on("submit", function(e){
        //EVITA QUE EL FORMULARIO SE ENVIE AUTOMATICAMENTE
        e.preventDefault();
        
        //VALIDA EL FORMULARIO ANTES DE ENVIARLO
        if(isFormValid()){//SI ES VALIDO LO ENVIA
            registrar(e);
        }else{// CASO CONTRARIO MUESTRA MENSAJES DE ERROR.
            displayValidationMessages();
        }
    })
}

// Valida todos los campos del formulario antes de enviarlo
function isFormValid(){
    //usa Validator.js de CLOUDFLARE para validar cada campo del fomrulario.
    return validateEmail() && validateText("nomb_y_apell") && validatePassword() && validatePasswordMatch();
}

// Valida que el email tenga formato correcto y muestra mensaje de error si no es válido
function validateEmail(){
    var email=$("#email").val();
    var isValid = validator.isEmail(email);
    //muestra el mensaje de error si la validacion no es exitosa
    displayErrorMessage("#email", isValid, "Este campo es obligatorio");
    return isValid;
}

// Valida que un campo de texto no esté vacío y muestra mensaje de error si es necesario - IMPLEMENTAR que no se pueda ingresar digitos numericos.
function validateText(fieldId){
    var value = $("#" + fieldId).val();
    // Valida que el campo no esté vacío y que no contenga dígitos numéricos
    var isNotEmpty = validator.isLength(value, { min: 1 });
    var hasNoDigits = !/[0-9]/.test(value);
    var isValid = isNotEmpty && hasNoDigits;
    // Mensaje personalizado según el error
    var message = !isNotEmpty ? "Este campo es obligatorio" : (!hasNoDigits ? "No se permiten números" : "");
    displayErrorMessage("#" + fieldId, isValid, message);
    return isValid;
}

// Valida que la contraseña tenga al menos 8 caracteres y muestra mensaje de error si no cumple
function validatePassword(){
    var password = $("#contrasenia").val();
    //usa Validator.js de CLOUDFLARE para validar la contraseña. Valida que la contraseña tenga al menos 8 caracteres.
    var isValid = validator.isLength(password, { min: 8 });
    //muestra el mensaje de error si la validacion no es exitosa
    displayErrorMessage("#contrasenia", isValid, "La contraseña debe tener al menos 8 caracteres.");
    //retorna el resultado de la validacion
    return isValid;
}

// Valida que las contraseñas coincidan y muestra mensaje de error si no coinciden
function validatePasswordMatch(){
    var contraseña = $("#contrasenia").val();
    var confirmPassword = $("#pswd_confirm").val();
    //usa Validator.js de CLOUDFLARE para validar la contraseña. Valida que la contraseña tenga al menos 8 caracteres.
    var isValid = validator.equals(contraseña, confirmPassword);
    //muestra el mensaje de error si la validacion no es exitosa
    displayErrorMessage("#pswd_confirm", isValid, "Las contraseñas no coinciden.");
    //retorna el resultado de la validacion
    return isValid;
}

// Muestra u oculta el mensaje de error para un campo específico
function displayErrorMessage(fieldSelector, isValid, message){
    //busca el elemento de mensaje de error y actualiza su contenido
    var errorField = $(fieldSelector).next(".validation-error");
    errorField.text(isValid ? "" : message);
    errorField.toggleClass("text-danger", !isValid);
}

// Ejecuta todas las validaciones para mostrar los mensajes de error correspondientes
function displayValidationMessages(){
    //Llama a la funcion de validacion de email para mostrar el mensaje de error y valida el campo de email.
    validateEmail();
    //Llama a la funcion de validacion de texto para mostrar el mensaje de error y valida el campo de nombres y apellidos.
    validateText("nomb_y_apell");
    //Llama a la funcion de validacion de contraseña para mostrar el mensaje de error y valida el campo de contraseña.
    validatePassword();
    //Llama a la funcion de validacion de contraseña para mostrar el mensaje de error y valida el campo de confirmacion de contraseña.
    validatePasswordMatch();
}

// Envía los datos del formulario por AJAX si la validación es exitosa
function registrar(){
    //Previene el comportamiento por defecto del evento submit y envía los datos del formulario a través de AJAX.
    var formData = new FormData($("#formRegistro")[0]);
    $.ajax({
        url:"../../controller/usuario.php?op=registrar",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            console.log("Almacenado!"+datos);
        }
    });
}

// Inicializa el script al cargar la página
init();
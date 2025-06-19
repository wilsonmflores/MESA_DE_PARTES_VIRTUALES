<?php
    require_once("../config/conexion.php");
    require_once("../model/Usuario.php");

    $usuario = new Usuario();
    
    switch($_GET["op"]){
        case "registrar":
            $usuario->registrar_usuario($_POST["nomb_y_apell"], $_POST["email"], $_POST["contrasenia"]);
            break;
    }
?>
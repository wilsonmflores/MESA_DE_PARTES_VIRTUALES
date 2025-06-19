<?php
    class Usuario extends Conectar{

        public function registrar_usuario($nomb_y_apell, $email, $contrasenia){
            $conectar=parent::conexion();
            parent::set_names();
            $sql="INSERT INTO usuario(nomb_y_apell, email, contrasenia) VALUE(?,?,?)";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $nomb_y_apell);
            $sql->bindValue(2, $email);
            $sql->bindValue(3, $contrasenia);
            $sql->execute();
        }
    }
?>
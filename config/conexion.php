<?php
    class Conectar{
        
        protected $dbh;

        protected function conexion(){
            try{
                $conectar = $this->dbh = new PDO("mysql:local=localhost; dbname=mesadepartes","soporte","HeH8jI6aMi");
                return $conectar;
            }catch(Exception $e){
                print "Error de BD: ".$e->getMessage()."<br>";
                die();
            }
        }

        public function set_names(){
            return $this->dbh->query("SET NAMES 'utf8'");
        }
        
        public static function ruta(){
            return "http://mesa_de_partes_virtuales.test/";
        }
    }

?>
<?php 
function Conectarse() 
{ 
   if (!($link=mysql_connect("localhost","sgigeniv","b4Qf214tdS"))) 
   { 
      echo "Error conectando a la base de datos."; 
      exit(); 
   } 
   if (!mysql_select_db("sgigeniv_dnp",$link)) 
   { 
      echo "Error seleccionando la base de datos."; 
      exit(); 
   } 
   return $link; 
} 
?>

<?php
   include("conectar.php"); 
   include("FichaAPDF.php"); 

   $Ruta = $_GET['Ruta'];
   $obj = ArmarPDF($Ruta, 1,'F');
?>
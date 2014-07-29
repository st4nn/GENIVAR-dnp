<?php 
   include("conectar.php"); 
	$link=Conectarse(); 

	$Componente = $_POST['idComponente'];
	
	$result=mysql_query("SELECT IdComponenteDefinicio, Descripcion FROM ComponenteDefinicion WHERE IdComponente = '$Componente' ORDER BY IdComponenteDefinicio ",$link); 

	class Definicion
	{
		public $Id;
		public $Nombre;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Definiciones[$Index] = new Definicion();
		
		$Definiciones[$Index]->Id = $row['IdComponenteDefinicio'];
		$Definiciones[$Index]->Nombre = utf8_encode($row['Descripcion']);
	
		$Index++;	
	} 
	
	echo json_encode($Definiciones);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
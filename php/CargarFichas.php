<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	$result=mysql_query("SELECT IdProyecto, FichaNum, Nombre FROM Proyectos WHERE Estado <> 'Borrado' ORDER BY IdProyecto",$link); 

	class Ficha
	{
		public $IdProyecto;
		public $Nombre;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Fichas[$Index] = new Ficha();
		
		$Fichas[$Index]->IdProyecto = $row['IdProyecto'];
		$Fichas[$Index]->Nombre = $row['FichaNum'] . ": " . utf8_encode($row['Nombre']);
	
		$Index++;	
		
	} 
	
	echo json_encode($Fichas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
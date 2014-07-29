<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	$IdSector = $_POST['IdSector'];
	$result=mysql_query("SELECT idIndicador, Indicador, Descripcion FROM Indicadores WHERE Sector_idSector = $IdSector ORDER BY idIndicador",$link); 

	class Indicador
	{
		public $IdIndicador;
		public $Indicador;
		public $Nombre;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Indicadores[$Index] = new Indicador();
		
		$Indicadores[$Index]->IdIndicador = $row['idIndicador'];
		$Indicadores[$Index]->Indicador = $row['Indicador'];
		$Indicadores[$Index]->Nombre = utf8_encode($row['Descripcion']);
	
		$Index++;	
		
	} 
	
	echo json_encode($Indicadores);
  mysql_free_result($result); 
  mysql_close($link); 
?> 

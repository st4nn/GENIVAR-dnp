<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	$result=mysql_query("SELECT IdSector, Nombre FROM  Sector ORDER BY IdSector",$link); 

	class Sector
	{
		public $IdSector;
		public $Nombre;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Sectores[$Index] = new Sector();
		
		$Sectores[$Index]->IdDepartamento = $row['IdSector'];
		$Sectores[$Index]->Nombre = $row['Nombre'];
	
		$Index++;	
		
	} 
	
	echo json_encode($Sectores);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
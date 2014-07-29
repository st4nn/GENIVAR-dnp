<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	$IdSector = $_POST['IdSector'];
	$result=mysql_query("SELECT IdSubcomponente, Subcomponente, Descripcion FROM  SubComponentes WHERE Sector_idSector = $IdSector ORDER BY IdSubcomponente",$link); 

	class Subcomponente
	{
		public $IdSubcomponente;
		public $Subcomponente;
		public $Nombre;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Subcomponentes[$Index] = new Subcomponente();
		
		$Subcomponentes[$Index]->IdSubcomponente = $row['IdSubcomponente'];
		$Subcomponentes[$Index]->Subcomponente = $row['Subcomponente'];
		$Subcomponentes[$Index]->Nombre = utf8_encode($row['Descripcion']);
	
		$Index++;	
		
	} 
	
	echo json_encode($Subcomponentes);
  mysql_free_result($result); 
  mysql_close($link); 
?> 

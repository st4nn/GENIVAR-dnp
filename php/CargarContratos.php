<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$result=mysql_query("SELECT idContrato, NumContrato FROM Contratos ORDER BY idContrato",$link); 

	class Contrato
	{
		public $IdContrato;
		public $Nombre;
		public $label;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Contratos[$Index] = new Contrato();
		
		$Contratos[$Index]->IdContrato = $row['idContrato'];
		$Contratos[$Index]->label = $row['NumContrato'];
		$Contratos[$Index]->Nombre = $row['NumContrato'];
	
		$Index++;	
	} 
	
	echo json_encode($Contratos);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
<?php 
   include("conectar.php"); 

	$link=Conectarse(); 

	$IdProyecto = $_POST['IdProyecto'];

	$sql = "SELECT 
				p2.idContrato AS 'IdContrato',
				p2.NumContrato AS 'NumContrato'
			FROM 
				Contratos_has_Proyectos AS p1,
				Contratos AS p2
			WHERE 
				p1.Proyectos_IdProyecto = $IdProyecto
				AND p1.Contratos_idContrato = p2.idContrato
					";

	$result = mysql_query($sql, $link); 

	class Contrato
	{
		public $IdContrato;
		public $NumContrato ;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Contratos = new Contrato();
		
		$Contratos->IdContrato = utf8_encode($row['IdContrato']);	
		$Contratos->NumContrato = utf8_encode($row['NumContrato']);
	} 
	
	echo json_encode($Contratos);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
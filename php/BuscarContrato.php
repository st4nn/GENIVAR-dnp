<?php 
   include("conectar.php"); 

	$link=Conectarse(); 

	$pParametro = addslashes($_POST['Parametro']);
	$pValor = addslashes(utf8_decode($_POST['Valor']));
		
		$Cadena = "$pParametro LIKE '%$pValor%'";

		if ($pParametro == "IdContrato")
		{
			$Cadena = "$pParametro LIKE '$pValor'";			
		}
	$sql = "SELECT
				*
			FROM 
				Contratos
			WHERE
				$Cadena";
//
	$result = mysql_query($sql, $link); 

	class Contrato
	{
		public $IdContrato;

		public $NumContrato ;
		public $FechaDeFirma ;
		public $Contratista ;
		public $ModalidadDelProceso  ;
		public $ObjetoSuscripcion ;
		public $ValorInicial  ;
		public $FechaRegistroPtaInicial ;
		public $PlazoEjecucionInicial  ;
		public $FechaInicio ;
		public $FechaTerminacion ;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Contratos[$Index] = new Contrato();
		
		$Contratos[$Index]->IdContrato = utf8_encode($row['idContrato']);	

		$Contratos[$Index]->NumContrato = utf8_encode($row['NumContrato']);
		$Contratos[$Index]->FechaDeFirma = utf8_encode($row['FechaDeFirma']); 
		$Contratos[$Index]->Contratista  = utf8_encode($row['Contratista']);
		$Contratos[$Index]->ModalidadDelProceso   = utf8_encode($row['ModalidadDelProceso']);
		$Contratos[$Index]->ObjetoSuscripcion  = utf8_encode($row['ObjetoSuscripcion']);
		$Contratos[$Index]->ValorInicial   = utf8_encode($row['ValorInicial']);
		$Contratos[$Index]->FechaRegistroPtaInicial  = utf8_encode($row['FechaRegistroPtaInicial']);
		$Contratos[$Index]->PlazoEjecucionInicial   = utf8_encode($row['PlazoEjecucionInicial']);
		$Contratos[$Index]->FechaInicio  = utf8_encode($row['FechaInicio']);
		$Contratos[$Index]->FechaTerminacion  = utf8_encode($row['FechaTerminacion']);
	
		$Index++;	
	} 
	
	echo json_encode($Contratos);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
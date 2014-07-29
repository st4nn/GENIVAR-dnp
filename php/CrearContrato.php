<?php 
//'" . utf8_decode($CE_Descripcion) . "',
   require("conectar.php"); 

	$link=Conectarse(); 

	$IdUsuario = addslashes(utf8_decode($_POST['IdUsuario']));

	$NumContrato = addslashes(utf8_decode($_POST['NumContrato']));
	$FechaDeFirma = addslashes(utf8_decode($_POST['FechaDeFirma']));
	$Contratista = addslashes(utf8_decode($_POST['Contratista']));
	$ModalidadDelProceso = addslashes(utf8_decode($_POST['ModalidadDelProceso']));
	$ObjetoSuscripcion = addslashes(utf8_decode($_POST['ObjetoSuscripcion']));
	$ValorInicial = addslashes(utf8_decode($_POST['ValorInicial']));
	$FechaRegistroPtaInicial = addslashes(utf8_decode($_POST['FechaRegistroPtaInicial']));
	$PlazoEjecucionInicial = addslashes(utf8_decode($_POST['PlazoEjecucionInicial']));
	$FechaInicio = addslashes(utf8_decode($_POST['FechaInicio']));
	$FechaTerminacion = addslashes(utf8_decode($_POST['FechaTerminacion']));
	
		
	$Fecha = DATE('Y-m-d H:i:s', time());
	
	$sql = "INSERT INTO
				Contratos
				(NumContrato, FechaDeFirma, Contratista, ModalidadDelProceso, ObjetoSuscripcion, ValorInicial, FechaRegistroPtaInicial, PlazoEjecucionInicial, FechaInicio, FechaTerminacion)
			VALUES
				(
					'$NumContrato', 
					'$FechaDeFirma', 
					'$Contratista', 
					'$ModalidadDelProceso', 
					'$ObjetoSuscripcion', 
					'$ValorInicial', 
					'$FechaRegistroPtaInicial', 
					'$PlazoEjecucionInicial', 
					'$FechaInicio', 
					'$FechaTerminacion'
				)
				";

	$result = mysql_query($sql, $link);

	$IdContrato = mysql_insert_id();
	
	if ($IdContrato > 0)
	{
		$sql = "INSERT INTO 
					Transacciones 
					(IdUsuario, IdUsuarioMaestro, Operacion, Fecha) 
				VALUES 
				(
					'$IdUsuario', 
					'$IdUsuario', 
					'" . utf8_decode('Creación de Contrato: ') . "$IdContrato', 
					'$Fecha'
				);";

		$result = mysql_query($sql, $link);
	}

	mysql_close($link);	
	echo $IdContrato;
	
?> 

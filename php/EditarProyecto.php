<?php 
//'" . utf8_decode($CE_Descripcion) . "',
   require("conectar.php"); 
	$link=Conectarse(); 

	$IdUsuario = addslashes($_POST['IdUsuario']);
	$IdProyecto = addslashes($_POST['IdProyecto']);
	$IdContrato = addslashes($_POST['IdContrato']);

	$FichaNum = addslashes(utf8_decode($_POST['FichaNum']));
	$Nombre = addslashes(utf8_decode($_POST['Nombre']));
	$Componente = addslashes(utf8_decode($_POST['Componente']));
	$DefinicionComponente = addslashes(utf8_decode($_POST['DefinicionComponente']));
	$Subcomponente = addslashes(utf8_decode($_POST['Subcomponente']));
	$Indicador = addslashes(utf8_decode($_POST['Indicador']));
	$IdSector = addslashes(utf8_decode($_POST['IdSector']));
	$FechaInicio = addslashes(utf8_decode($_POST['FechaInicio']));
	$FechaFin = addslashes(utf8_decode($_POST['FechaFin']));
	$Entidad = addslashes(utf8_decode($_POST['Entidad']));
	$Expediente = addslashes(utf8_decode($_POST['Expediente']));
	$Consultora = addslashes(utf8_decode($_POST['Consultora']));
	$CostoTotal = addslashes(utf8_decode($_POST['CostoTotal']));
		
	$Fecha = DATE('Y-m-d H:i:s', time());
	
	$sql = "DELETE FROM Contratos_has_Proyectos
			WHERE
				Proyectos_IdProyecto = $IdProyecto;
				";

	$result = mysql_query($sql, $link);

	$sql = "INSERT INTO 
					Contratos_has_Proyectos 
					(Contratos_idContrato, Proyectos_IdProyecto) 
				VALUES 
				(
					'$IdContrato',
					'$IdProyecto'
				);";

	$result = mysql_query($sql, $link);

	$sql = "UPDATE Proyectos
				SET FichaNum = '$FichaNum', Nombre = '$Nombre', Componente = '$Componente' , Subcomponente = '$Subcomponente' , Indicador = '$Indicador', DefinicionComponente = '$DefinicionComponente'
			WHERE
				IdProyecto = $IdProyecto;
				";

	$result = mysql_query($sql, $link);

	$sql = "UPDATE 	ProyectoDatos
				SET
					IdProyecto = '$IdProyecto',
					IdSector = '$IdSector', 
					FechaInicio = '$FechaInicio', 
					FechaFin = '$FechaFin',
					Entidad = '$Entidad',
					Expediente = '$Expediente',
					Consultora = '$Consultora',
					CostoTotal = '$CostoTotal'
				WHERE
					IdProyecto = $IdProyecto;
				";

		$result = mysql_query($sql, $link);

		$sql = "INSERT INTO 
					Transacciones 
					(IdUsuario, IdUsuarioMaestro, Operacion, Fecha) 
				VALUES 
				(
					'$IdUsuario', 
					'$IdUsuario', 
					'" . utf8_decode('Actualización de Proyecto: ') . "$IdProyecto', 
					'$Fecha'
				);";

		$result = mysql_query($sql, $link);
	
	mysql_close($link);	
?> 

<?php 
//'" . utf8_decode($CE_Descripcion) . "',
   require("conectar.php"); 
	$link=Conectarse(); 

	$IdUsuario = $_POST['IdUsuario'];
	$IdProyecto = $_POST['IdProyecto'];

	$FichaNum = $_POST['FichaNum'];
	$Nombre = $_POST['Nombre'];
	$IdSector = $_POST['IdSector'];
	$FechaInicio = $_POST['FechaInicio'];
	$FechaFin = $_POST['FechaFin'];
	$Entidad = $_POST['Entidad'];
	$Expediente = $_POST['Expediente'];
	$Consultora = $_POST['Consultora'];
	$CostoTotal = $_POST['CostoTotal'];
	$Fuente = $_POST['Fuente'];
	
		
	$Fecha = DATE('Y-m-d H:i:s', time());
	
	$sql = "UPDATE Proyectos
				SET FichaNum = '$FichaNum', Nombre = '$Nombre'
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
					CostoTotal = '$CostoTotal',
					Fuente = $Fuente
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

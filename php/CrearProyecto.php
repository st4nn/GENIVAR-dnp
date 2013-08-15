<?php 
//'" . utf8_decode($CE_Descripcion) . "',
   require("conectar.php"); 
	$link=Conectarse(); 

	$IdUsuario = $_POST['IdUsuario'];

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
	
	$Des_ObjetivoGeneral = $_POST['Des_ObjetivoGeneral'];
	$Des_ObjetivoEspecifico = $_POST['Des_ObjetivoEspecifico'];
	$Des_Alcance = $_POST['Des_Alcance'];
	$Des_Productos = $_POST['Des_Productos'];
	$Des_Resultados = $_POST['Des_Resultados'];
	$Des_Inversion = $_POST['Des_Inversion'];
	$Des_Herramientas = $_POST['Des_Herramientas'];
	$Des_MejoresPracticas = $_POST['Des_MejoresPracticas'];
	$Des_Obsevaciones = $_POST['Des_Obsevaciones'];
		
	$Fecha = DATE('Y-m-d H:i:s', time());
	
	$sql = "INSERT INTO
				Proyectos
				(FichaNum, Nombre)
			VALUES
				(
					'$FichaNum',
					'$Nombre'
				)
				";

	$result = mysql_query($sql, $link);

	$IdProyecto = mysql_insert_id();
	
	if ($IdProyecto > 0)
	{
		$sql = "INSERT INTO
			Login_has_Proyectos
				(Login_IdLogin, Proyectos_IdProyecto)
		VALUES
			(
				'$IdUsuario',
				'$IdProyecto'
			)";

		$result = mysql_query($sql, $link);
		

		$sql = "INSERT INTO
					ProyectoDatos
					(
						IdProyecto, 
						IdSector, 
						FechaInicio, 
						FechaFin,
						Entidad,
						Expediente,
						Consultora,
						CostoTotal,
						Fuente
					)
				VALUES
					(
						'$IdProyecto', 
						'$IdSector', 
						'$FechaInicio', 
						'$FechaFin',
						'$Entidad',
						'$Expediente',
						'$Consultora',
						'$CostoTotal',
						'$Fuente'
					)";

		$result = mysql_query($sql, $link);

		$sql = "INSERT INTO
					Descripcion
						(
							IdProyecto,
							ObjetivoGeneral,
							ObjetivosEspecificos,
							Alcance,
							Productos,
							Resultados,
							Inversion,
							Herramientas,
							MejoresPracticas,
							Observaciones
						)
				VALUES
					(
						'$IdProyecto',
						'$Des_ObjetivoGeneral',
						'$Des_ObjetivoEspecifico',
						'$Des_Alcance',
						'$Des_Productos',
						'$Des_Resultados',
						'$Des_Inversion',
						'$Des_Herramientas',
						'$Des_MejoresPracticas',
						'$Des_Obsevaciones'
					)";
		echo $sql;
		$result = mysql_query($sql, $link);

		$sql = "INSERT INTO 
					Transacciones 
					(IdUsuario, IdUsuarioMaestro, Operacion, Fecha) 
				VALUES 
				(
					'$IdUsuario', 
					'$IdUsuario', 
					'" . utf8_decode('Creación de Proyecto: ') . "$IdProyecto', 
					'$Fecha'
				);";

		$result = mysql_query($sql, $link);
	}

	mysql_close($link);	
	echo $IdProyecto;
	
?> 

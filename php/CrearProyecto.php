<?php 
//'" . utf8_decode($CE_Descripcion) . "',
   require("conectar.php"); 
   include("FichaAPDF.php"); 

	$link=Conectarse(); 

	$IdUsuario = addslashes(utf8_decode($_POST['IdUsuario']));

	$FichaNum = addslashes(utf8_decode($_POST['FichaNum']));
	$Nombre = addslashes(utf8_decode($_POST['Nombre']));
	$Contrato = addslashes(utf8_decode($_POST['Contrato']));
	$Componente = addslashes(utf8_decode($_POST['Componente']));
	$DefinicionComponente = addslashes(utf8_decode($_POST['DefinicionComponente']));
	$SubComponente = addslashes(utf8_decode($_POST['Subcomponente']));
	$Indicador = addslashes(utf8_decode($_POST['Indicador']));
	$IdSector = addslashes(utf8_decode($_POST['IdSector']));
	$FechaInicio = addslashes(utf8_decode($_POST['FechaInicio']));
	$FechaFin = addslashes(utf8_decode($_POST['FechaFin']));
	$Entidad = addslashes(utf8_decode($_POST['Entidad']));
	$Expediente = addslashes(utf8_decode($_POST['Expediente']));
	$Consultora = addslashes(utf8_decode($_POST['Consultora']));
	$CostoTotal = addslashes(utf8_decode($_POST['CostoTotal']));
	//$Fuente = addslashes(utf8_decode($_POST['Fuente']));
	
	$Des_ObjetivoGeneral = addslashes(utf8_decode($_POST['Des_ObjetivoGeneral']));
	$Des_ObjetivoEspecifico = addslashes(utf8_decode($_POST['Des_ObjetivoEspecifico']));
	$Des_Alcance = addslashes(utf8_decode($_POST['Des_Alcance']));
	$Des_Actividades = addslashes(utf8_decode($_POST['Des_Actividades']));
	$Des_Productos = addslashes(utf8_decode($_POST['Des_Productos']));
	$Des_Resultados = addslashes(utf8_decode($_POST['Des_Resultados']));
	$Des_Inversion = addslashes(utf8_decode($_POST['Des_Inversion']));
	$Des_Herramientas = addslashes(utf8_decode($_POST['Des_Herramientas']));
	$Des_Obsevaciones = addslashes(utf8_decode($_POST['Des_Obsevaciones']));
		
	$Fecha = DATE('Y-m-d H:i:s', time());
	
	$sql = "INSERT INTO
				Proyectos
				(FichaNum, Nombre, Componente, Subcomponente, Indicador, DefinicionComponente)
			VALUES
				(
					'$FichaNum',
					'$Nombre',
					'$Componente',
					'$SubComponente',
					'$Indicador',
					'$DefinicionComponente'
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
						CostoTotal
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
						'$CostoTotal'
					)";
		$result = mysql_query($sql, $link);

		$sql = "INSERT INTO
					Descripcion
						(
							IdProyecto,
							ObjetivoGeneral,
							ObjetivosEspecificos,
							Actividades,
							Alcance,
							Productos,
							Resultados,
							Inversion,
							Herramientas,
							Observaciones
						)
				VALUES
					(
						'$IdProyecto',
						'$Des_ObjetivoGeneral',
						'$Des_ObjetivoEspecifico',
						'$Des_Actividades',
						'$Des_Alcance',
						'$Des_Productos',
						'$Des_Resultados',
						'$Des_Inversion',
						'$Des_Herramientas',
						'$Des_Obsevaciones'
					)";
		$result = mysql_query($sql, $link);

		$sql = "INSERT INTO 
					Contratos_has_Proyectos 
					(Contratos_idContrato, Proyectos_IdProyecto) 
				VALUES 
				(
					'$Contrato',
					'$IdProyecto'
				);";
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

		$obj = ArmarPDF($Contrato, $IdProyecto,'F');
	}

	mysql_close($link);	
	echo $IdProyecto;
	
?> 

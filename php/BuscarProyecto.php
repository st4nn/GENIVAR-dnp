<?php 
   include("conectar.php"); 

	$link=Conectarse(); 

	$pFichaNum = addslashes($_POST['FichaNum']);
	$pNombre = addslashes($_POST['Nombre']);
	$pIdSector = addslashes($_POST['IdSector']);
	$pFechaInicio = addslashes($_POST['FechaInicio']);
	$pFechaFin = addslashes($_POST['FechaFin']);
	$pEntidad = addslashes($_POST['Entidad']);
	$pExpediente = addslashes($_POST['Expediente']);
	$pConsultora = addslashes($_POST['Consultora']);
	$pCostoTotal_i = addslashes($_POST['CostoTotal_i']);
	$pCostoTotal_o = addslashes($_POST['CostoTotal_o']);
	$pComponente = addslashes($_POST['Componente']);
	//$pFuente = addslashes($_POST['Fuente']);
	
	$pDescripcion = $_POST['Descripcion'];
	$lenCondicion = 2;
	$Cadena = '';
	
	if($pComponente)
	{ 	$Cadena .= "AND p1.Componente = $pComponente ";	$lenCondicion = 3;}

	if($pFichaNum)
	{	$Cadena = "OR p1.FichaNum LIKE '%$pFichaNum%' ";  	}
	if($pNombre)
	{ 	$Cadena .= "OR p1.Nombre LIKE '%$pNombre%' ";	}
	
	
	if($pIdSector)
	{	$Cadena .= "OR p2.IdSector = '$pIdSector' "; 	}
	if($pFechaInicio)
	{	$Cadena .= "OR p2.FechaInicio = '$pFechaInicio' ";	}
	if($pFechaFin)
	{	$Cadena .= "OR p2.FechaFin = '$pFechaFin' ";				}
	if($pEntidad)
	{	$Cadena .= "OR p2.Entidad LIKE '%$pEntidad%' ";	}
	if($pExpediente)
	{	$Cadena .= "OR p2.Expediente LIKE '%$pExpediente%' ";	}
	if($pConsultora)	
	{	$Cadena .= "OR p2.Consultora LIKE '%$pConsultora%' ";	}
	if($pCostoTotal_i)
	{	$Cadena .= "OR p2.CostoTotal BETWEEN '$pCostoTotal_i' AND  '$pCostoTotal_o' ";	}
	if($pCostoTotal_o)
	{	$Cadena .= "OR p2.CostoTotal BETWEEN '$pCostoTotal_i' AND  '$pCostoTotal_o' ";	}
	
	/*
	if($pFuente)
	{	$Cadena .= "OR p2.Fuente LIKE '%$pFuente%' ";	}
	*/

	if($pDescripcion)
	{	
		$Cadena .= "OR ObjetivoGeneral LIKE '%$pDescripcion%' 
					OR ObjetivosEspecificos LIKE '%$pDescripcion%' 
					OR Alcance LIKE '%$pDescripcion%' 
					OR Productos LIKE '%$pDescripcion%' 
					OR Resultados LIKE '%$pDescripcion%' 
					OR Inversion LIKE '%$pDescripcion%' 
					OR Herramientas LIKE '%$pDescripcion%' 
					OR MejoresPracticas LIKE '%$pDescripcion%' 
					OR Observaciones LIKE '%$pDescripcion%' ";	
	}	


	
	$Cadena = substr($Cadena, $lenCondicion);
	
	if (!$Cadena)
	{ $Cadena = '1=1'; 	}
	
	$sql = "SELECT
				p1.IdProyecto,
				p1.FichaNum,
				p1.Nombre,
				p1.Componente,
				p1.DefinicionComponente,
				p1.Subcomponente,
				p1.Indicador,
				p2.IdSector,
				p2.FechaInicio,
				p2.FechaFin,
				p2.Entidad,
				p2.Expediente,
				p2.Consultora,
				p2.CostoTotal,
				p2.Fuente,
				p3.ObjetivoGeneral,
				p3.ObjetivosEspecificos,
				p3.Alcance,
				p3.Productos,
				p3.Resultados,
				p3.Inversion,
				p3.Herramientas,
				p3.MejoresPracticas,
				p3.Observaciones
			FROM 
				Proyectos AS p1,
				ProyectoDatos AS p2,
				Descripcion AS p3
			WHERE
				p1.IdProyecto = p2.IdProyecto
				AND p1.IdProyecto = p3.IdProyecto
				AND p2.IdProyecto = p3.IdProyecto
				AND p1.Estado <> 'Borrado'
				AND ( $Cadena )
			ORDER BY p1.IdProyecto";
//
	$result = mysql_query($sql, $link); 

	class Proyecto
	{
		public $IdProyecto;

		public $FichaNum;
		public $Nombre;
		public $Componente;
		public $DefinicionComponente;
		public $Indicador;
		public $IdSector;
		public $FechaInicio;
		public $FechaFin;
		public $Entidad;
		public $Expediente;
		public $Consultora;
		public $CostoTotal;
		public $Fuente;
		
		public $Des_ObjetivoGeneral;
		public $Des_ObjetivoEspecifico;
		public $Des_Alcance;
		public $Des_Productos;
		public $Des_Resultados;
		public $Des_Inversion;
		public $Des_Herramientas;
		public $Des_MejoresPracticas;
		public $Des_Obsevaciones;

		public $NumContrato;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Proyectos[$Index] = new Proyecto();
		
		$Proyectos[$Index]->IdProyecto = utf8_encode($row['IdProyecto']);
		$Proyectos[$Index]->FichaNum = utf8_encode($row['FichaNum']);
		$Proyectos[$Index]->Nombre = utf8_encode($row['Nombre']);
		$Proyectos[$Index]->Componente = utf8_encode($row['Componente']);
		$Proyectos[$Index]->Indicador = utf8_encode($row['Indicador']);
		$Proyectos[$Index]->DefinicionComponente = utf8_encode($row['DefinicionComponente']);
		$Proyectos[$Index]->Subcomponente = utf8_encode($row['Subcomponente']);

		$Proyectos[$Index]->IdSector = utf8_encode($row['IdSector']);
		$Proyectos[$Index]->FechaInicio = utf8_encode($row['FechaInicio']);
		$Proyectos[$Index]->FechaFin = utf8_encode($row['FechaFin']);
		$Proyectos[$Index]->Entidad = utf8_encode($row['Entidad']);
		$Proyectos[$Index]->Expediente = utf8_encode($row['Expediente']);
		$Proyectos[$Index]->Consultora = utf8_encode($row['Consultora']);
		$Proyectos[$Index]->CostoTotal = utf8_encode($row['CostoTotal']);
		$Proyectos[$Index]->Fuente = utf8_encode($row['Fuente']);

		$Proyectos[$Index]->ObjetivoGeneral = utf8_encode($row['ObjetivoGeneral']);
		$Proyectos[$Index]->ObjetivosEspecificos = utf8_encode($row['ObjetivosEspecificos']);
		$Proyectos[$Index]->Alcance = utf8_encode($row['Alcance']);
		$Proyectos[$Index]->Productos = utf8_encode($row['Productos']);
		$Proyectos[$Index]->Resultados = utf8_encode($row['Resultados']);
		$Proyectos[$Index]->Inversion = utf8_encode($row['Inversion']);
		$Proyectos[$Index]->Herramientas = utf8_encode($row['Herramientas']);
		$Proyectos[$Index]->MejoresPracticas = utf8_encode($row['MejoresPracticas']);
		$Proyectos[$Index]->Observaciones = utf8_encode($row['Observaciones']);

		$sql2 = "SELECT p2.NumContrato AS 'NumContrato'
				FROM Contratos_has_Proyectos AS p1,
					 Contratos AS p2
				WHERE p1.Proyectos_IdProyecto = '" . $row['IdProyecto'] . "' 
						AND p1.Contratos_idContrato = p2.idContrato
					";

	   	$Proyectos[$Index]->NumContrato = " ";

	   	$result2 = mysql_query($sql2, $link);		
		if ($result2)
		{
			$row2 = mysql_fetch_row($result2);
			$Proyectos[$Index]->NumContrato = $row2['0'];
			mysql_free_result($result2);
		}
	
		$Index++;	
	} 
	
	echo json_encode($Proyectos);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
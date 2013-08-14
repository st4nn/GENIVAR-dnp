<?php 
   include("conectar.php"); 

	$link=Conectarse(); 

	$pFichaNum = $_POST['FichaNum'];
	$pNombre = $_POST['Nombre'];
	$pIdSector = $_POST['IdSector'];
	$pFechaInicio = $_POST['FechaInicio'];
	$pFechaFin = $_POST['FechaFin'];
	$pEntidad = $_POST['Entidad'];
	$pExpediente = $_POST['Expediente'];
	$pConsultora = $_POST['Consultora'];
	$pCostoTotal = $_POST['CostoTotal'];
	$pFuente = $_POST['Fuente'];
	
	$pDescripcion = $_POST['Descripcion'];

	$Cadena = '';
	
	if($pFichaNum)
	{	$Cadena = "OR p1.FichaNum = '$pFichaNum' ";  	}
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
	if($pCostoTotal)
	{	$Cadena .= "OR p2.CostoTotal LIKE '%$pCostoTotal%' ";	}
	if($pFuente)
	{	$Cadena .= "OR p2.Fuente LIKE '%$pFuente%' ";	}

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


	
	$Cadena = substr($Cadena, 2);
	
	if (!$Cadena)
	{ $Cadena = '1=1'; 	}
	
	$sql = "SELECT
				p1.IdProyecto,
				p1.FichaNum,
				p1.Nombre,
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
				AND ( $Cadena )";
//
	$result = mysql_query($sql, $link); 

	class Proyecto
	{
		public $IdProyecto;

		public $FichaNum;
		public $Nombre;
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
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Proyectos[$Index] = new Proyecto();
		
		$Proyectos[$Index]->IdProyecto = $row['IdProyecto'];
		$Proyectos[$Index]->FichaNum = $row['FichaNum'];
		$Proyectos[$Index]->Nombre = $row['Nombre'];

		$Proyectos[$Index]->IdSector = $row['IdSector'];
		$Proyectos[$Index]->FechaInicio = $row['FechaInicio'];
		$Proyectos[$Index]->FechaFin = $row['FechaFin'];
		$Proyectos[$Index]->Entidad = $row['Entidad'];
		$Proyectos[$Index]->Expediente = $row['Expediente'];
		$Proyectos[$Index]->Consultora = $row['Consultora'];
		$Proyectos[$Index]->CostoTotal = $row['CostoTotal'];
		$Proyectos[$Index]->Fuente = $row['Fuente'];

		$Proyectos[$Index]->ObjetivoGeneral = $row['ObjetivoGeneral'];
		$Proyectos[$Index]->ObjetivosEspecificos = $row['ObjetivosEspecificos'];
		$Proyectos[$Index]->Alcance = $row['Alcance'];
		$Proyectos[$Index]->Productos = $row['Productos'];
		$Proyectos[$Index]->Resultados = $row['Resultados'];
		$Proyectos[$Index]->Inversion = $row['Inversion'];
		$Proyectos[$Index]->Herramientas = $row['Herramientas'];
		$Proyectos[$Index]->MejoresPracticas = $row['MejoresPracticas'];
		$Proyectos[$Index]->Observaciones = $row['Observaciones'];
	
		$Index++;	
	} 
	
	echo json_encode($Proyectos);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
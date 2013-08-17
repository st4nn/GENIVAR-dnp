<?php 
//'" . utf8_decode($CE_Descripcion) . "',
/*
Vista:
	I: envía el fichero al navegador de forma que se usa la extensión (plug in) si está disponible. El nombre dado en nombre se usa si el usuario escoge la opción "Guardar como..." en el enlace que genera el PDF.
	D: envía el fichero al navegador y fuerza la descarga del fichero con el nombre especificado por nombre.
	F: guarda el fichero en un fichero local de nombre nombre.
*/
   require('../Tools/FPDF/fpdf.php');
   
function ArmarPDF($RutaPDF, $IdProyecto, $Destino)
{
	if ($RutaPDF)
	{
		$RutaPDF = "../Documentos/" . $RutaPDF . "/";
	}
	else
	{
		$RutaPDF = "../Documentos/";
	}

	if(!file_exists($RutaPDF))
	{
		mkdir ($RutaPDF);
	}


	$link=Conectarse(); 

	$sql = "SELECT
				p1.FichaNum,
				p1.Nombre,
				p4.Nombre AS 'IdSector',
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
				Descripcion AS p3,
				Sector AS p4
			WHERE
				p1.IdProyecto = p2.IdProyecto
				AND p1.IdProyecto = p3.IdProyecto
				AND p2.IdProyecto = p3.IdProyecto
				AND p2.IdSector = p4.idSector
				AND p1.IdProyecto = '$IdProyecto';";

   	$result = mysql_query($sql, $link);

   	while($row = mysql_fetch_array($result))
	{ 
		$FichaNum = $row['FichaNum'];
		$Nombre = $row['Nombre'];

		$IdSector = $row['IdSector'];
		$FechaInicio = $row['FechaInicio'];
		$FechaFin = $row['FechaFin'];
		$Entidad = $row['Entidad'];
		$Expediente = $row['Expediente'];
		$Consultora = $row['Consultora'];
		$CostoTotal = $row['CostoTotal'];
		$Fuente = $row['Fuente'];

		$ObjetivoGeneral = $row['ObjetivoGeneral'];
		$ObjetivosEspecificos = $row['ObjetivosEspecificos'];
		$Alcance = $row['Alcance'];
		$Productos = $row['Productos'];
		$Resultados = $row['Resultados'];
		$Inversion = $row['Inversion'];
		$Herramientas = $row['Herramientas'];
		$MejoresPracticas = $row['MejoresPracticas'];
		$Observaciones = $row['Observaciones'];
	} 

	$pdf = new FPDF();
	
	$pdf->AddPage();
	$pdf->SetFont('Arial','B',12);
	
	$pdf->Cell(0,10,utf8_decode("DEPARTAMENTO NACIONAL DE PLANEACIÓN"),0,1,'C');
	$pdf->MultiCell(0,5,utf8_decode("EVALUACIÓN DEL PROGRAMA DE APOYO AL PROCESO DE PARTICIPACIÓN PRIVADA Y CONCESIÓN EN INFRAESTRUCTURA, TERCERA ETAPA (PPCI-3)"),0,'C',0);

		$pdf->Ln();

	$pdf->Cell(0,10,utf8_decode("FICHA TÉCNICA No."),0,0,'C');
	$pdf->setX(125);
	$pdf->Cell(0,10,utf8_decode($FichaNum),0,0,'L');

		$pdf->Ln();
		$pdf->Ln();

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("PROYECTO:"),0,0,'L');
	$pdf->SetFont('Arial','',11);
	$pdf->setX(105);
	$pdf->Cell(0,6,utf8_decode($Nombre),0,1,'L');

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("SECTOR DE ACTIVIDAD ECONÓMICA:"),0,0,'L');
	$pdf->SetFont('Arial','',11);
	$pdf->setX(105);
	$pdf->Cell(0,6,utf8_decode($IdSector),0,1,'L');

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("FECHA DE INICIO:"),0,0,'L');
	$pdf->SetFont('Arial','',11);
	$pdf->setX(105);
	$pdf->Cell(0,6,utf8_decode($FechaInicio),0,1,'L');

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("FECHA DE TERMINACIÓN:"),0,0,'L');
	$pdf->SetFont('Arial','',11);
	$pdf->setX(105);
	$pdf->Cell(0,6,utf8_decode($FechaFin),0,1,'L');

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("ENTIDAD BENEFICIARIA:"),0,0,'L');
	$pdf->SetFont('Arial','',11);
	$pdf->setX(105);
	$pdf->Cell(0,6,utf8_decode($Entidad),0,1,'L');

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("NÚMERO DE EXPEDIENTE EN ARCHIVO DEL DNP:"),0,0,'L');
	$pdf->setX(105);
	$pdf->SetFont('Arial','',11);
	$pdf->Cell(0,6,utf8_decode($Expediente),0,1,'L');

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("PERSONA/ENTIDAD CONSULTORA:"),0,0,'L');
	$pdf->SetFont('Arial','',11);
	$pdf->setX(105);
	$pdf->Cell(0,6,utf8_decode($Consultora),0,1,'L');

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("COSTO TOTAL DEL PROYECTO:"),0,0,'L');
	$pdf->SetFont('Arial','',11);
	$pdf->setX(105);
	$pdf->Cell(0,6,"Col $" . utf8_decode($CostoTotal),0,1,'L');

	$pdf->SetFont('Arial','B',11);
	$pdf->Cell(0,6,utf8_decode("FUENTE DE FINANCIAMIENTO:"),0,0,'L');
	$pdf->SetFont('Arial','',11);
	$pdf->setX(105);
	$pdf->Cell(0,6,utf8_decode($Fuente),0,1,'L');

		$pdf->Ln();

	$pdf->Cell(0,6,utf8_decode("DESCRIPCIÓN GENERAL DEL PROYECTO:"),0,1,'L');
	/******/
	$txt = "OBJETIVO GENERAL \n" . 'Las versiones anteriores ';
	$txt2 = utf8_decode("OBJETIVOS ESPECíFICOS") . "\n" . 'Las versiones anteriores trataban los arrays como el string Array, aaaLas versiones anteriores trataban los arrays como el string Array, aaa Las versiones anteriores trataban los arrays coLas versiones anteriores trataban los arrays como el string Array, aaamo el string Array, aaa';
	$txt3 = 'Las versiones anteriores trataban los arrays como el string Array, aaaLas versiones anteriores trataban los arrays como el string Array, aaa Las versiones anteriores trataban los arrays coLas versiones anteriores trataban los arrays como el string Array, aaamo el string Array, aaa';
	/******/

	$pdf->Cell(65,7,"TEMA",1, 0, 'C');
	$pdf->Cell(120,7,utf8_decode("DESCRIPCIÓN"),1, 1, 'C');
	

	$ObjetivoGeneral = "OBJETIVO GENERAL \n" . $ObjetivoGeneral;
	$ObjetivosEspecificos = "OBJETIVOS ESPECÍFICOS\n" . $ObjetivosEspecificos;
	
	$varH = floor((strlen($ObjetivoGeneral)+strlen($ObjetivosEspecificos))/69);
	if ($varH == 0)
		{$varH = -1;}


	$pdf->Cell(65, (($varH +3) * 7),"1. OBJETIVO DEL ESTUDIO " ,1, 0, 'J');
	$pdf->MultiCell(120,7,utf8_decode($ObjetivoGeneral),'R', 'J');
		$pdf->setX(75);
	$pdf->MultiCell(120,7,utf8_decode($ObjetivosEspecificos),'LRB', 'J');

	$pdf->Cell(65, (flOor((strlen($Alcance)/69)+1) * 7),"2. ALCANCE DEL ESTUDIO " ,1, 0, 'J');
	$pdf->MultiCell(120,7,utf8_decode($Alcance),1, 'J');

	$pdf->Cell(65, (flOor((strlen($Productos)/69)+1) * 7),"3. PRODUCTOS DEL ESTUDIO " ,1, 0, 'J');
	$pdf->MultiCell(120,7,utf8_decode($Productos),1, 'J');

	$pdf->Cell(65, (flOor((strlen($Resultados)/69)+1) * 7),"4. PRINCIPALES RESULTADOS " ,1, 0, 'J');
	$pdf->MultiCell(120,7,utf8_decode($Resultados),1, 'J');

	
	for ($i = strlen($Inversion); $i < 136; $i++)
	{
		$Inversion .= " ";
	}

	$pdf->Cell(65, (flOor((strlen($Inversion)/69)+1) * 7) ,' ' ,1, 'J');
	$varY = $pdf->GetY();
	$pdf->setX(10);
	$pdf->Write(7, utf8_decode("5. MONTO DE INVERSIÓN \nGENERADO "));
	$pdf->setXY(75, $varY);
	$pdf->MultiCell(120,7,utf8_decode($Inversion),1, 'J');


	for ($i = strlen($Herramientas); $i < 270; $i++)
	{
		$Herramientas .= " ";
	}
	$pdf->Cell(65, (flOor((strlen($Herramientas)/69)+1) * 7),' ' ,1, 'J');
	$varY = $pdf->GetY();
	$pdf->setX(10);
	$pdf->Write(7, utf8_decode("6. PRINCIPALES HERRAMIENTAS \nMETODOLÓGICAS/\nPROCEDIMIENTOS \nTÉCNICOS UTILIZADOS"));
	$pdf->setXY(75, $varY);
	$pdf->MultiCell(120,7,utf8_decode($Herramientas) . "\n",'R', 'J');

		$pdf->ln();
	$pdf->Cell(65, (flOor((strlen($MejoresPracticas)/69)+1) * 7),utf8_decode("7. MEJORES PRÁCTICAS") ,1, 0, 'J');
	$pdf->MultiCell(120,7,utf8_decode($MejoresPracticas),1, 'J');

	$pdf->Cell(65, (flOor((strlen($Observaciones)/69)+1) * 7),utf8_decode("8. OBSERVACIONES") ,1, 0, 'J');
	$pdf->MultiCell(120,7,utf8_decode($Observaciones),1, 'J');
	
	$pdf->Output("$RutaPDF". "FichaNo_$IdProyecto.pdf", $Destino);
}
?> 

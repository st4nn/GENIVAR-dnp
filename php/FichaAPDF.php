<?php 
/*
Vista:
	I: envía el fichero al navegador de forma que se usa la extensión (plug in) si está disponible. El nombre dado en nombre se usa si el usuario escoge la opción "Guardar como..." en el enlace que genera el PDF.
	D: envía el fichero al navegador y fuerza la descarga del fichero con el nombre especificado por nombre.
	F: guarda el fichero en un fichero local de nombre nombre.
*/

   require_once('../Tools/FPDF/fpdf.php');   

function ArmarPDF($RutaPDF, $IdProyecto, $Destino)
{
	if ($IdProyecto)
	{
		//$ArchivoPDF = ArmarPDF('', $IdProyecto, 'I');	
		$link=Conectarse(); 

		$sql = "SELECT p2.NumContrato AS 'NumContrato'
				FROM Contratos_has_Proyectos AS p1,
					 Contratos AS p2
				WHERE p1.Proyectos_IdProyecto = $IdProyecto
						AND p1.Contratos_idContrato = p2.idContrato
					";

	   	$result = mysql_query($sql, $link);

	   	while($row = mysql_fetch_array($result))
		{ 
			$RutaPDF = $row['NumContrato'];
		}

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

		$sql = "SELECT
					p1.FichaNum,
					p1.Nombre,
					p5.idComponente AS 'ComponenteId',
					p5.Nombre AS 'ComponenteNom',
					p5.Descripcion AS 'ComponenteDesc',
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
					Sector AS p4,
					Componentes AS p5
				WHERE
					p1.IdProyecto = p2.IdProyecto
					AND p1.IdProyecto = p3.IdProyecto
					AND p2.IdProyecto = p3.IdProyecto
					AND p2.IdSector = p4.idSector
					AND p1.Componente = p5.idComponente
					AND p1.IdProyecto = '$IdProyecto';";

	   	$result = mysql_query($sql, $link);

	   	while($row = mysql_fetch_array($result))
		{ 
			$FichaNum = $row['FichaNum'];
			$Nombre = $row['Nombre'];
			$ComponenteId = $row['ComponenteId'];
			$Componente = $row['ComponenteNom'];
			$ComponenteDesc = $row['ComponenteDesc'];

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

		class PDF extends FPDF
{
// Cabecera de página
function Header()
	{
	    // Logo
	    $this->Image('../css/imagenes/head_logo2.png',25,5,-150);
	    $this->Image('../css/imagenes/Logo3.png',60,80,80);
	    
	    // Salto de línea
	    $this->Ln(20);
	}

// Pie de página
	function Footer()
	{
	    // Posición: a 1,5 cm del final
	    $this->SetY(-15);
	    // Arial italic 8
	    $this->SetFont('Arial','I',8);
	    // Número de página
	    $this->Cell(0,10,utf8_decode('Página ').$this->PageNo().'/{nb}',0,0,'C');
	}
}

		$pdf = new PDF();
		$pdf->SetMargins(35, 5, 30, 30);
		$pdf->AliasNbPages();

		$pdf->AddPage();
		$pdf->SetFont('Arial','B',12);
		$pdf->Cell(0,10,utf8_decode("DEPARTAMENTO NACIONAL DE PLANEACIÓN"),0,1,'C');
		$pdf->MultiCell(0,5,utf8_decode("EVALUACIÓN DEL PROGRAMA DE APOYO AL PROCESO DE PARTICIPACIÓN PRIVADA Y CONCESIÓN EN INFRAESTRUCTURA, TERCERA ETAPA (PPCI-3)"),0,'C',0);

			$pdf->Ln();

		$pdf->Cell(0,10,utf8_decode("FICHA TÉCNICA No."),0,0,'C');
		$pdf->setX(130);
		$pdf->Cell(0,10,utf8_decode($FichaNum),0,0,'L');

			$pdf->Ln();
			$pdf->Ln();

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("PROYECTO/CONSULTORÍA:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		$pdf->MultiCell(60,7,utf8_decode($Nombre),'0', 'J');
		//$pdf->Cell(0,6,utf8_decode($Nombre),0,1,'L');

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("SECTOR DE ACTIVIDAD ECONÓMICA:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		//$pdf->Cell(0,6,utf8_decode($IdSector),0,1,'L');
		$pdf->MultiCell(60,7,$IdSector,'0', 'J');

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("FECHA DE INICIO:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		$pdf->Cell(0,6,utf8_decode($FechaInicio),0,1,'L');

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("FECHA DE TERMINACIÓN:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		$pdf->Cell(0,6,utf8_decode($FechaFin),0,1,'L');

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("ENTIDAD BENEFICIARIA:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		//$pdf->Cell(0,6,utf8_decode($Entidad),0,1,'L');
		$pdf->MultiCell(60,7,utf8_decode($Entidad),'0', 'J');

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("NÚMERO DE EXPEDIENTE DNP:"),0,0,'L');
		$pdf->setX(127);
		$pdf->SetFont('Arial','',11);
		//$pdf->Cell(0,6,utf8_decode($Expediente),0,1,'L');
		$pdf->MultiCell(60,7,utf8_decode($Expediente),'0', 'J');

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("CONSULTOR Persona Natural/Jurídica:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		//$pdf->Cell(0,6,utf8_decode($Consultora),0,1,'L');
		$pdf->MultiCell(60,7,utf8_decode($Consultora),'0', 'J');

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("COSTO TOTAL DEL PROYECTO/CONSULTORÍA:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		$pdf->Cell(0,6,"Col $" . utf8_decode(number_format($CostoTotal,0, ",", ".")),0,1,'L');

		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("COMPONENTE:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		$pdf->MultiCell(60,7,$Componente . " : (" . $ComponenteDesc . ")",'0', 'J');
/*
		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(0,6,utf8_decode("FUENTE DE FINANCIAMIENTO:"),0,0,'L');
		$pdf->SetFont('Arial','',11);
		$pdf->setX(127);
		//$pdf->Cell(0,6,utf8_decode($Fuente),0,1,'L');
		$pdf->MultiCell(90,7,utf8_decode($Fuente),'0', 'J');
*/
			$pdf->Ln();

		$pdf->Cell(0,6,utf8_decode("DESCRIPCIÓN GENERAL DEL PROYECTO:"),0,1,'L');
	
			$pdf->Ln();

		$pdf->Cell(65,7,"TEMA",'B', 0, 'C');
		$pdf->Cell(89,7,utf8_decode("DESCRIPCIÓN"),'LB', 1, 'C');
	

		$ObjetivoGeneral = "OBJETIVO GENERAL \n" . $ObjetivoGeneral;
		$ObjetivosEspecificos = "OBJETIVOS ESPECÍFICOS\n" . $ObjetivosEspecificos;
	
		$varH = floor((strlen($ObjetivoGeneral)+strlen($ObjetivosEspecificos))/69);
		if ($varH == 0)
			{$varH = -1;}


		$pdf->Cell(65, 7,"1. OBJETIVO DEL ESTUDIO " ,0, 0, 'J');
		$pdf->MultiCell(89,7,utf8_decode($ObjetivoGeneral),'L', 'J');
			$pdf->setX(100);
		$pdf->MultiCell(90,7,utf8_decode($ObjetivosEspecificos),'L', 'J');

		if ($ComponenteId == 1)
		{
			$pdf->Cell(65, 7,"2. ALCANCE DEL ESTUDIO " ,'TR', 0, 'J');
			$pdf->MultiCell(89,7,utf8_decode($Alcance),'LT', 'J');

			$pdf->Cell(65, 7,"3. PRODUCTOS DEL ESTUDIO " ,'TR', 0, 'J');
			$pdf->MultiCell(89,7,utf8_decode($Productos),'LT', 'J');

			$pdf->Cell(65, 7,"4. PRINCIPALES RESULTADOS " ,'TR', 0, 'J');
			$pdf->MultiCell(89,7,utf8_decode($Resultados),'LT', 'J');

			$Inversion_ = " ";
			for ($i = strlen($Inversion); $i < 136; $i++)
			{
				$Inversion_ .= " ";
			}

			$pdf->Cell(65, (flOor((strlen($Inversion)/69)+1) * 7) ,' ' ,'TR', 'J');
			$varY = $pdf->GetY();
			$pdf->setX(35);
			$pdf->Write(7, utf8_decode("5. MONTO DE INVERSIÓN \nGENERADO (Millones de Pesos)"));
			$pdf->setXY(100, $varY);
			$pdf->MultiCell(89,7,($Inversion/1000000) . $Inversion_,'LT', 'J');


			for ($i = strlen($Herramientas); $i < 270; $i++)
			{
				$Herramientas .= " ";
			}
			$pdf->Cell(65, 7,' ' ,'TR', 'J');
			$varY = $pdf->GetY();
			$pdf->setX(35);
			$pdf->Write(7, utf8_decode("6. PRINCIPALES HERRAMIENTAS \nMETODOLÓGICAS/\nPROCEDIMIENTOS \nTÉCNICOS UTILIZADOS"));
			$pdf->setXY(100, $varY);
			$pdf->MultiCell(89,7,utf8_decode($Herramientas),'LT', 'J');
		}

			$pdf->ln();
		/*	
		$pdf->Cell(65, 7,utf8_decode("7. MEJORES PRÁCTICAS") ,'TR', 0, 'J');
		$pdf->MultiCell(120,7,utf8_decode($MejoresPracticas),'LT', 'J');
		*/

		$pdf->Cell(65, 7,utf8_decode("8. OBSERVACIONES") ,'TR', 0, 'J');
		$pdf->MultiCell(89,7,utf8_decode($Observaciones),'LT', 'J');
		ob_end_clean();
		$pdf->Output("$RutaPDF". "FichaNo_$FichaNum.pdf", $Destino);
	}
	else
	{
		echo utf8_decode("No se especificó el Número de Ficha");
	}}
?> 

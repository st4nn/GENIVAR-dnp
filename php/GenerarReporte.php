<?

	
	header("Content-Type: application/vnd.ms-excel");
	header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	header("content-disposition: attachment;filename=Reporte.xls");
	
	

	include("conectar.php"); 
	$link=Conectarse(); 

	$sql = "SELECT
				p1.IdProyecto AS 'NumInterno',
				p1.FichaNum AS 'FichaNum',
				p1.Nombre AS 'Proyecto',
				p1.Componente AS 'Componente',
				p6.Descripcion AS 'ComponenteDesc',
				p1.Subcomponente AS 'SubComponente',
				p7.Descripcion AS 'SubComponenteDesc',
				p8.Descripcion AS 'Indicador',
				p3.Nombre AS 'Sector',
				p2.FechaInicio AS 'FechaDeInicio',
				p2.FechaFin AS 'FechaFin',
				p2.Entidad AS 'Entidad',
				p2.Expediente AS 'NumExpedienteDNP',
				p2.Consultora AS 'Consultora',
				p2.CostoTotal AS 'Costo',
				p4.NumContrato AS 'ContratoNum',
				p4.FechaDeFirma AS 'FechaFirma',
				p4.Contratista AS 'Contratista',
				p4.ModalidadDelProceso AS 'Modalidad',
				p4.ObjetoSuscripcion AS 'Objeto',
				p4.ValorInicial AS 'ValorInicial',
				p4.FechaRegistroPtaInicial AS 'FechaRegistroPtaInicial',
				p4.PlazoEjecucionInicial AS 'PlazoEjecucionInicial'
			FROM
				Proyectos AS p1,
				ProyectoDatos AS p2,
				Sector AS p3,
				Contratos AS p4,
				Contratos_has_Proyectos AS p5,
				Componentes AS p6,
				SubComponentes AS p7,
				Indicadores AS p8

			WHERE
					p1.idProyecto=	p2.idProyecto
				AND p2.idSector = p3.idSector
				AND p1.idProyecto = p5.Proyectos_IdProyecto
				AND p4.idContrato = p5.Contratos_idContrato
				AND p1.Componente = p6.idComponente
				AND p1.Subcomponente = p7.idSubcomponente
				AND p1.Indicador = p8.idIndicador
				AND p1.Estado <> 'Borrado';";
//
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>

	<body>
		<table border=1>
		   <thead>
		   	<img type='image' src='http://sgigenivar.com/css/imagenes/head_logo.png'/>
			<img type='image' src='http://sgigenivar.com/css/imagenes/LogoGenivar-mini.png'/>
			<!--<img type='image' src='http://sgigenivar.com/css/imagenes/LogoWsp-mini.png'/>-->
		   	<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
			<tr>
				<th>NumInterno</th>
				<th>FichaNum</th>
				<th>Proyecto</th>
				<th>Componente</th>
				<th>Descripción Componente</th>
				<th>SubComponente</th>
				<th>Descripción Subcomponente</th>
				<th>Indicador</th>
				<th>Sector</th>
				<th>FechaDeInicio</th>
				<th>FechaFin</th>
				<th>Entidad</th>
				<th>NumExpedienteDNP</th>
				<th>Consultora</th>
				<th>Costo</th>
				<th>ContratoNum</th>
				<th>FechaFirma</th>
				<th>Contratista</th>
				<th>Modalidad</th>
				<th>Objeto</th>
				<th>ValorInicial</th>
				<th>FechaRegistroPtaInicial</th>
				<th>PlazoEjecucionInicial</th>
			</tr>
		   </thead>
		   <tbody>
   	<?
   		$result = mysql_query($sql, $link);
		while($row = mysql_fetch_array($result))
		{ 
		   	echo "<tr>
					<td style='text-align:center;'>" . utf8_encode($row['NumInterno']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['FichaNum']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Proyecto']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Componente']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['ComponenteDesc']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['SubComponente']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['SubComponenteDesc']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Indicador']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Sector']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['FechaDeInicio']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['FechaFin']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Entidad']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['NumExpedienteDNP']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Consultora']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Costo']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['ContratoNum']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['FechaFirma']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Contratista']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Modalidad']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['Objeto']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['ValorInicial']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['FechaRegistroPtaInicial']) . "</td>
					<td style='text-align:center;'>" . utf8_encode($row['PlazoEjecucionInicial']) . "</td>
				</tr>";
		} 
	?>
		   </tbody>
		</table>
	</body>

</html>
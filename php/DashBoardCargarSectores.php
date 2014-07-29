<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$result=mysql_query("
		SELECT 
			COUNT(*) AS 'Cantidad', 
		        p1.Componente AS 'Componente',
		        p2.IdSector AS 'Sector',
		        p3.Nombre AS 'Label'
		FROM 
			Proyectos AS p1 ,
		        ProyectoDatos AS p2,
		        Sector AS p3
		WHERE 
			p1.IdProyecto = p2.IdProyecto
		        AND p2.IdSector = p3.IdSector
		        AND p1.Estado <> 'Borrado' 
		GROUP BY 
			p1.Componente, p3.IdSector;",$link); 

	class Resultado
	{
		public $Cantidad;
		public $Label;
		public $Componente;
		public $IdSector;
	}
	
	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Fichas[$Index] = new Resultado();
		
		$Fichas[$Index]->Cantidad = $row['Cantidad'];
		$Fichas[$Index]->Label = utf8_encode($row['Label']) . " C-" . $row['Componente'];
		$Fichas[$Index]->Componente = $row['Componente'];
		$Fichas[$Index]->IdSector = $row['Sector'];
	
		$Index++;	
	} 
	
	echo json_encode($Fichas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 

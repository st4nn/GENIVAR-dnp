<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$result=mysql_query("SELECT COUNT(*) AS 'Cantidad', YEAR(p1.FechaInicio) AS 'Anio' FROM ProyectoDatos AS p1, Proyectos as p2 WHERE p1.idProyecto = p2.idProyecto AND p2.Estado <> 'Borrado' GROUP BY YEAR(p1.FechaInicio)",$link); 

	class Resultado
	{
		public $Cantidad;
		public $Label;
	}
	
	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Fichas[$Index] = new Resultado();
		
		$Fichas[$Index]->Cantidad = $row['Cantidad'];
		$Fichas[$Index]->Label = $row['Anio'];
		
	
		$Index++;	
	} 
	
	echo json_encode($Fichas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
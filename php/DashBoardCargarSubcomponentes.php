<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$sql = "
		SELECT 
			COUNT(p1.idProyecto ) AS 'Cantidad', 
			p2.Descripcion AS 'Descripcion' 
		FROM 
			Proyectos AS p1, 
			SubComponentes as p2 
		WHERE 
			p1.SubComponente = p2.idSubComponente 
			AND p1.Estado <> 'Borrado' 
			GROUP BY p1.SubComponente";
	
	$result=mysql_query($sql,$link); 

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
		$Fichas[$Index]->Label = utf8_encode($row['Descripcion']);
		
	
		$Index++;	
	} 
	
	echo json_encode($Fichas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
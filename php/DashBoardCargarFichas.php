<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$result=mysql_query("SELECT COUNT(*) AS 'Cantidad', Componente as 'Componente' FROM Proyectos WHERE Estado <> 'Borrado' GROUP BY Componente DESC;",$link); 

	class Ficha
	{
		public $Cantidad;
		public $Label;
	}
	class obj
	{
		public $a;
		public $b;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Fichas[$Index] = new Ficha();
		
		
		$Fichas[$Index]->Cantidad = new obj();
		/*$Fichas[$Index]->Cantidad->a = $Index;
		$Fichas[$Index]->Cantidad->b = $row['Cantidad'];*/
		
		$Fichas[$Index]->Cantidad = $row['Cantidad'];
		$Fichas[$Index]->Label = $row['Componente'];
	
		$Index++;	
	} 
	
	echo json_encode($Fichas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
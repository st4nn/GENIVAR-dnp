<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	$result=mysql_query("SELECT IdDepartamento, Nombre FROM  Departamento ORDER BY IdDepartamento",$link); 

	class Departamento
	{
		public $IdDepartamento;
		public $Nombre;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Departamentos[$Index] = new Departamento();
		
		$Departamentos[$Index]->IdDepartamento = $row['IdDepartamento'];
		$Departamentos[$Index]->Nombre = $row['Nombre'];
	
		$Index++;	
		
	} 
	
	echo json_encode($Departamentos);
  mysql_free_result($result); 
  mysql_close($link); 
?> 
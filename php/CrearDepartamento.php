<?php 
	include("conectar.php"); 

	$Id = addslashes($_POST['IdOwn']);
	$Nombre = addslashes(utf8_decode($_POST['Name']));
 
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO 
			Departamento (Nombre, IdOwn)
		VALUES
			(
				'$Nombre',   
				'$Id'
			);";
				
	mysql_query($sql, $link); 			
	echo mysql_insert_id();
	mysql_close($link); 
?> 

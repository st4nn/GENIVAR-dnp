<?php 
	include("conectar.php"); 

	$Nombre = addslashes($_POST['Name']);
 
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO 
			Sector (Nombre)
		VALUES
			(
				'$Nombre'  
			);";
				
	mysql_query($sql, $link); 			
	echo mysql_insert_id();

	mysql_close($link); 
?> 

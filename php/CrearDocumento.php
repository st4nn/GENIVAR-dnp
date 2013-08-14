<?php 
	include("conectar.php"); 

	$Ruta = $_POST['Ruta'];
	$Nombre = $_POST['NomArchivo'];
	$IdUsuario = $_POST['IdUsuario'];
 
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO 
			Documentos (Ruta, NomArchivo, IdUsuario)
		VALUES
			(
				'$Ruta',   
				'$Nombre',   
				'$IdUsuario'
			);";
				
	mysql_query($sql, $link); 			
	echo mysql_insert_id();
	mysql_close($link); 
?> 

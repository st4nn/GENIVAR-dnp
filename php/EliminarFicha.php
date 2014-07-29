<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$Id = $_POST['Id'];
	
		$sql = "UPDATE Proyectos SET Estado ='Borrado' WHERE IdProyecto = $Id;";
		$Afectadas += mysql_affected_rows();
		mysql_query($sql, $link);
		
	mysql_close($link);	
	echo $Afectadas;
?> 

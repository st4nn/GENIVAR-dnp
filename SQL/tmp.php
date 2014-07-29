<?php 
   include("conectar.php"); 

	$link=Conectarse(); 

	$sql = "ALTER TABLE  `Proyectos` ADD  `Componente` INT( 3 ) NOT NULL DEFAULT  '1';";
	$result = mysql_query($sql, $link); 

  mysql_free_result($result); 
  mysql_close($link); 
?> 

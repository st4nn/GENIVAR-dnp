<?php 
   require("conectar.php"); 
	$link=Conectarse(); 

	$CE_Numero = addslashes($_POST['CE_Numero']);
	
	$CE_Descripcion = addslashes($_POST['CE_Descripcion']);
	$CE_FCreacion = addslashes($_POST['CE_FCreacion']);
	$CE_FEnvio = addslashes($_POST['CE_FEnvio']);
	$CE_Firma = addslashes($_POST['CE_Firma']);
	$CE_Usuario = addslashes($_POST['CE_Usuario']);
	
	$CE_FSistema = DATE('Y-m-d H:i:s', time());
	
	$sql = "UPDATE Cartas_Enviadas
				SET
					CE_Descripcion = '$CE_Descripcion',
					CE_FCreacion = '$CE_FCreacion',
					CE_FEnvio = '$CE_FEnvio',
					CE_Firma = '$CE_Firma',
					CE_Usuario = '$CE_Usuario',
					CE_FSistema = '$CE_FSistema'
			WHERE CE_Numero = '$CE_Numero';";

	$result = mysql_query($sql, $link);

	mysql_close($link);	
?> 

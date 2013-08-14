<?php 
   require("conectar.php"); 
	$link=Conectarse(); 

	$CE_Numero = $_POST['CE_Numero'];
	
	$CE_Descripcion = $_POST['CE_Descripcion'];
	$CE_FCreacion = $_POST['CE_FCreacion'];
	$CE_FEnvio = $_POST['CE_FEnvio'];
	$CE_Firma = $_POST['CE_Firma'];
	$CE_Usuario = $_POST['CE_Usuario'];
	
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

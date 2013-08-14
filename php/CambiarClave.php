<?php 
include("conectar.php");    

	$UserId = $_POST['IdUsuarioMaestro'];
 	$Id = $_POST['Id'];
 	$Clave = md5($_POST['Clave']);
 
 $Fecha = date('Y-m-d'); 
 
	$link=Conectarse(); 
	
	$sql = "
		UPDATE Login 
				SET Clave = '$Clave'
			WHERE IdLogin = '$Id';";
	
	$result = mysql_query($sql, $link);

		if ($result)
		{
			$sql = "INSERT INTO Transacciones
						(IdUsuario, IdUsuarioMaestro, Operacion, Fecha)
					VALUES
						(
						'$Id', 
						'$UserId', 
						'" . utf8_decode('Cambio de Clave') . "',
						'$Fecha')";		
						
			mysql_query($sql, $link); 
			echo $result;
		} 
		mysql_close($link); 
?> 

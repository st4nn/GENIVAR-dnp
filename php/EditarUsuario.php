<?php 
   include("conectar.php"); 

 $Id = addslashes($_POST['Id']);
 $IdOwn = addslashes($_POST['IdOwn']);
 $Name = addslashes($_POST['Name']); 
 $NickName = addslashes($_POST['NickName']);

 $Email = addslashes($_POST['Email']);
  $IdDepartamento = addslashes($_POST['IdDepartamento']);
  $Phone = addslashes($_POST['Phone']);

 //$IdRol = $_POST['IdRol'];

 $State = addslashes($_POST['State']); 
 
	$link=Conectarse(); 

	$sql = "
		UPDATE DatosUsuarios SET
			Nombre = '$Name', 
			NickName = '$NickName', 
			Correo = '$Email', 
			IdDepartamento = '$IdDepartamento',
			Telefono = '$Phone'
		WHERE
			IdUsersData = '$Id';";
				
	mysql_query($sql, $link); 
	
	
	$sql = "
		UPDATE Login SET
			Estado = '$State'
		WHERE
			IdLogin = '$Id';";
	
	mysql_query($sql, $link); 
	
		$Fecha = date('Y-m-d'); 
	$sql = "
		INSERT INTO Transacciones 
				(IdUsuario, IdUsuarioMaestro, Operacion, Fecha)
			VALUES
				('$Id', '$IdOwn', '" . utf8_decode('Actualización de Datos') . "', '$Fecha');";
			
	mysql_query($sql, $link);
	
	echo mysql_affected_rows();

	mysql_close($link); 
?> 

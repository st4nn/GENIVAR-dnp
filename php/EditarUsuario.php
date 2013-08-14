<?php 
   include("conectar.php"); 

 $Id = $_POST['Id'];
 $IdOwn = $_POST['IdOwn'];
 $Name = $_POST['Name']; 
 $NickName = $_POST['NickName'];

 $Email = $_POST['Email'];
  $IdDepartamento = $_POST['IdDepartamento'];
  $Phone = $_POST['Phone'];

 //$IdRol = $_POST['IdRol'];

 $State = $_POST['State']; 
 
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

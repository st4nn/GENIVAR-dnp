<?php 
include("conectar.php");    

 $Id = addslashes($_POST['Id']);
 
 $User = addslashes($_POST['User']);
 $Password = addslashes(md5($_POST['Password']));
 
 $Name = addslashes($_POST['Name']); 
 $NickName = addslashes($_POST['NickName']);
 $Email = addslashes($_POST['Email']);
 $Company = addslashes($_POST['Company']);
 $Phone = addslashes($_POST['Phone']);
 $IdInitialRoll = addslashes($_POST['IdRol']);

 $Fecha = date('Y-m-d'); 
 
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO Login 
				(Usuario, Clave, Estado)
			VALUES
				(
			'$User',   
			'$Password',
			'Activo'
				);";
	
	$result = mysql_query($sql, $link);

	$UserId = mysql_insert_id();
		if ($result)
		{
			$UserId = mysql_insert_id();			
			$sql = "INSERT INTO DatosUsuarios
						(IdUsersData, Nombre, NickName, Correo, IdDepartamento, Telefono, IdInitialRoll)
					VALUES
						(
						'$UserId', 
						'$Name', 
						'$NickName', 
						'$Email', 
						'$Company', 
						'$Phone', 
						'$IdInitialRoll');";		
	
			mysql_query($sql, $link);
				
				$Fecha = date('Y-m-d'); 
				
			$sql = "INSERT INTO Transacciones
						(IdUsuario, IdUsuarioMaestro, Operacion, Fecha)
					VALUES
						(
						'$UserId', 
						'$Id', 
						'" . utf8_decode("Creación de Usuario") . "',
						'$Fecha')";		
						
			mysql_query($sql, $link); 
			echo $UserId;
		} else
		{
				if (mysql_errno() == 1062)
				{
					echo "El Usuario ya Existe";
				} else
				{
					echo "El Usuario no fue Creado";	
				}
		}
		mysql_close($link); 
?> 

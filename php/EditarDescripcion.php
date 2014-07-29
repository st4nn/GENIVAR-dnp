<?php 
//'" . utf8_decode($CE_Descripcion) . "',
   require("conectar.php"); 
	$link=Conectarse(); 

	$IdUsuario = addslashes($_POST['IdUsuario']);

	$IdProyecto = addslashes($_POST['IdProyecto']);
	$NomCampo = addslashes($_POST['NomCampo']);
	$Valor = addslashes(utf8_decode($_POST['Valor']));

	$NomCampos = explode("!-!", $NomCampo);
	$Valores = explode("!-!", $Valor);

	if (COUNT($NomCampos) > 1)
	{
		$Valores[0] = $Valores[0] . "', " . $NomCampos[1] . " = '"  . $Valores[1];
	}	
		
	$Fecha = DATE('Y-m-d H:i:s', time());
	
	$sql = "UPDATE Descripcion
				SET " . $NomCampos[0] ." = '" . $Valores[0] . "'
			WHERE
				IdProyecto = $IdProyecto;
				";

	$result = mysql_query($sql, $link);

		$sql = "INSERT INTO 
					Transacciones 
					(IdUsuario, IdUsuarioMaestro, Operacion, Fecha) 
				VALUES 
				(
					'$IdUsuario', 
					'$IdUsuario', 
					'" . utf8_decode('Actualización de ' . $NomCampos[0] . ' en Descripción de Proyecto: ') . "$IdProyecto', 
					'$Fecha'
				);";

		$result = mysql_query($sql, $link);

	mysql_close($link);	
	echo $IdProyecto;
?> 

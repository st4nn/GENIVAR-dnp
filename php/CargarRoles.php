<?php 
   include("conectar.php"); 
	
	$Rol = addslashes($_POST['Id_Rol']);

		class Rols
	{
		public $RolId;
		public $RolName;
	}
	$link=Conectarse(); 
	$sql = "
		SELECT r.IdRolChildren As 'IdRol', d.Nombre AS 'Name'
			FROM Rol as d,
				 Rol_has_Rol as r
			WHERE r.IdRolParent = '$Rol' AND
					r.IdRolChildren = d.IdRol
			ORDER BY IdRol;";
				
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);
	
	$Index = 0;
	do{
		$Roles[$Index] = new Rols();
		
		$Roles[$Index]->RolId = $row['IdRol'];
		$Roles[$Index]->RolName = utf8_encode($row['Name']);
		$Index++;
       } while ($row = mysql_fetch_array($result)) ;

	echo json_encode($Roles);
	mysql_free_result($result); 
	
	mysql_close($link); 
?> 

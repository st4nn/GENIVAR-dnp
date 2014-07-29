<?php 
   include("conectar.php"); 
$User = addslashes($_POST['Usuario']);
$Pass = addslashes(md5($_POST['Clave']));

class UserData
{
 var $Id;
 var $Name; 
 var $NickName;
 var $IdCompany;
 var $CompanyName;
 var $Email;
  var $IdInitialRol;
 var $RolName;
 
 function __construct($Id, $Name, $NickName, $IdCompany, $CompanyName, $Email, $IdInitialRol, $RolName)
	   {
	      $this->Id = $Id;
	      $this->Name = $Name;
	      $this->NickName = $NickName;
	      $this->IdCompany = $IdCompany;
	      $this->CompanyName = $CompanyName;
	      $this->Email = $Email;
	      $this->IdInitialRol = $IdInitialRol;
	      $this->RolName = $RolName;
	   }
}
	
	$link=Conectarse(); 
	$sql = "
		SELECT 
			l.IdLogin as 'Id', 
			d.Nombre as 'Name',
			d.NickName as 'NickName',
			d.IdDepartamento as 'IdCompany',
			c.Nombre as 'CompanyName',
			d.Correo as 'Email',
			d.IdInitialRoll as 'IdInitialRol',
			r.Nombre as 'RolName'
		FROM 
			Login AS l, DatosUsuarios AS d , Departamento AS c, Rol AS r
		WHERE
			r.idRol = d.IdInitialRolL AND
			l.IdLogin = d.IdUsersData AND 
			d.IdDepartamento = c.IdDepartamento AND 
			l.Estado = 'Activo' AND 
			l.Usuario = '$User' AND l.Clave = '$Pass';";
				
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);

if ($row)
{
	$User = new UserData(  utf8_encode($row['Id']), 
							utf8_encode($row['Name']),
							utf8_encode($row['NickName']),
							utf8_encode($row['IdCompany']),
							utf8_encode($row['CompanyName']),
							utf8_encode($row['Email']),
							utf8_encode($row['IdInitialRol']),
							utf8_encode($row['RolName'])
							);
}else
{
	$User = new UserData('','','','','','','','');
}
	echo json_encode($User);
	mysql_free_result($result); 
	mysql_close($link); 
?> 

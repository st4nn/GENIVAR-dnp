<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$i = 0;
	$Index = 0;	
	$Id = addslashes($_POST['Id']);
	
	class User
	{
		public $IdUser;
		public $UserName;
		public $Name;
		public $NickName;
		public $Mail;
		public $Phone;
		public $Owner;
		public $IdCompany;
		public $Company;
		public $State;
		public $IdInitialRol;
		public $RolName;
	}

	$sql = "SELECT DISTINCT
				l.IdLogin AS 'Id', 
				l.Usuario AS 'UserName',
				d.Nombre AS 'Name',
				d.NickName AS 'NickName',
				d.Correo AS 'Mail', 
				d.Telefono AS 'Phone', 
				o.Nombre AS 'Owner', 
				c.Nombre AS 'Company',
				c.IdDepartamento AS 'IdCompany',
				l.Estado as 'State',
				d.IdInitialRoll AS 'IdInitialRol',
				p.Nombre AS 'RolName'
		FROM
				Login AS l, 
				DatosUsuarios AS d,
				DatosUsuarios AS o,
				Departamento AS c,
				Rol AS p, 
				Transacciones AS r
		WHERE
			l.IdLogin = d.IdUsersData AND 
			d.IdDepartamento = c.IdDepartamento AND
			p.idRol = d.IdInitialRoll AND
			r.IdUsuarioMaestro = o.IdUsersData AND
			r.IdUsuario = d.IdUsersData AND
			r.IdUsuarioMaestro = '$Id';";
			
	
	$result = mysql_query($sql, $link);
	$row = mysql_fetch_array($result);
	
	do
	{ 
		$Users[$Index] = new User();
		
		$Users[$Index]->IdUser = $row['Id'];
		$Users[$Index]->UserName = $row['UserName'];
		$Users[$Index]->Name = $row['Name'];
		$Users[$Index]->NickName = $row['NickName'];
		$Users[$Index]->Phone = $row['Phone'];
		$Users[$Index]->Mail = $row['Mail'];
		$Users[$Index]->Owner = $row['Owner'];
		$Users[$Index]->IdCompany = $row['IdCompany'];
		$Users[$Index]->Company = $row['Company'];
		$Users[$Index]->State = $row['State'];
		$Users[$Index]->IdInitialRol = $row['IdInitialRol'];
		$Users[$Index]->RolName = $row['RolName'];

		$Index++;	
		
	} while($row = mysql_fetch_array($result));

		
	mysql_close($link);	
	echo json_encode($Users);
?> 

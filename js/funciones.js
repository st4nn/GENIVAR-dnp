﻿$(document).on("ready", arranque);

function arranque()
{
	$("#frmLogin").on("submit", frmLogin_Submit)
	$("#btnLogin").button();

	
	if(localStorage.UsuarioDNP)
	{window.location.replace("home.html");}

}
function frmLogin_Submit(evento)
{
	evento.preventDefault();  
	$.post("php/ValidarUsuario.php",  
		{
			Usuario: $("#txtUsername").val(), 
			Clave: $("#txtPassword").val()
		}, 
		function(data)
		{	
			if (data.Id)
			{
				localStorage.setItem("UsuarioDNP", '[' + JSON.stringify(data) + ']');			
				window.location.replace("home.html");
			}
			else
			{
				$("#alertEstadoLogin").fadeIn(200).delay(1600).fadeOut(1200);
			}
		}, 
		"json");	
}

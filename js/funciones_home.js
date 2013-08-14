var Usuario;
var Fichas;
var Documentos_Path;
$(document).on("ready", arranque);
var Meses = new Array('', 'Enero', 'Frebrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');

function arranque()
{
	if(!localStorage.UsuarioDNP)
	{CerrarSesion();}

	CargarUsuario();
	CargarDepartamentos();
	

	$('#txtBuscarFicha_FechaIni, #txtBuscarFicha_FechaFin, #txtCrearFicha_FechaIni, #txtCrearFicha_FechaFin').datepicker();
	$('#txtBuscarFicha_FechaIni, #txtBuscarFicha_FechaFin, #txtCrearFicha_FechaIni, #txtCrearFicha_FechaFin').on('change', DashBoard_RangeBx_Change);

	$('#lnkLogout').on('click', CerrarSesion);
	
	//$("#lnkHome").on('click', function(){ Seccion("#DashBoard"); $("#SelectedSection h4").text("Inicio");})
	$("#lnkUsers").on('click', function(){ Seccion("#Users"); $("#SelectedSection h4").text("Usuarios");})
	
	$("#tableMyUsersRefresh").on("click", CargarUsuariosPropios);
	
	$('#tableMyUsers').dataTable();
	$('.password').pstrength();
	$("#tableMyUsers tr").live('click', CargarInfoUsuario);
	
	$("#txtCreatingUsersCreate_Company").on("change", function(){cboCompanyCreate_Change("CompanyData", "txtCreatingUsersCreate_Company");});
	$("#txtMyUsersEdit_Company").on("change", function(){cboCompanyCreate_Change("CompanyData_Edit", "txtMyUsersEdit_Company");});

	$("#btnMyUsers_KeyChange").on("click", btnMyUsers_KeyChange_Click)

	$("#btnMyAccount_CreatingUsersCreate_Reset").on("click", function(evento){evento.preventDefault();ResetearContenedor("CreatingUsersCreate");})
	
	$("#btnCompanyDataCancel").on("click", btnCompanyDataCancel_click);
	$("#btnCompanyDataCancel_Edit").on("click", btnCompanyDataCancel_click);

	$("#btnCompanyDataCreate").on("click", function(event){btnCompanyDataCreate_click(event, "txtCreatingUsersCreate_CompanyOther", "txtCreatingUsersCreate_Company", "CreatingUsers_Create", "CompanyData", "txtCreatingUsersCreate_Phone");});
	$("#btnCompanyDataCreate_Edit").on("click", function(event){btnCompanyDataCreate_click(event, "txtCreatingUsersEdit_CompanyOther", "txtMyUsersEdit_Company","MyUsersEdit_Message", "CompanyData_Edit", "txtMyUsersEdit_Phone");});
	
	$("#btnMyUsers_Edit").live("click", btnMyUsers_Edit_click);
	$("#btnMyUsersEditConfirmOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_EditPermissions").live("click", function(){EditarPermisos($(this).attr("idUser"), $(this).attr("UserName"))});
	$("#MyUsersEdit_Permissions_Rol").on('change', CambiarRol);
	
	$("#btnMyUsersEditOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_LoginAsAUser").live("click", btnMyUsers_LoginAsAUser_click);
	$("#btnMyAccount_Options_Permissions_Delete").live("click", btnMyAccount_Options_Permissions_Delete_click);
	
	$("#lnkCreatingUsers").on('click', function()
		{
			$("#MyAccount_Options_CreatingUsers").dialog(
			{
				autoOpen: false, 				
				minWidth: 620,
				title : 'Crear Usuario'
			});
			$("#MyAccount_Options_CreatingUsers").dialog('open');
			CargarDepartamentos();

			$("#txtCreatingUsersCreate_User").focus();
		});
	$("#CreatingUsersCreate").on("submit", CreatingUsersCreate_submit);

	$("#lnkBuscarFicha").on('click', function(){ Seccion("#BuscarFicha"); $("#SelectedSection h4").text("Buscar Ficha");})
	$("#lnkCrearFicha").on('click', function(){ Seccion("#CrearFicha"); $("#SelectedSection h4").text("Crear Ficha");})
	
	$("#frmCrearFicha").on("submit", frmCrearFicha_Submit);
    
    $("#CrearFicha_Descripcion .title").hover(
				function()
				{
					if($(this).attr("act") == "")
					{
						$(this).css("color", "#003300");
					}
				},
				function()
				{
					if($(this).attr("act") == "")
					{
						$(this).css("color", "#4b4b4b");
					}
				}
			);
    $("#MainMenu li a").hover(
				function()
				{
					if($(this).attr("act") == "")
					{
						$(this).css("color", "white");
						$(this).css("background", "#0274b0");
					}
				},
				function()
				{
					if($(this).attr("act") == "")
					{
						$(this).css("color", "#3b3b3b");
						$(this).css("background", "#c0c0c0");
					}
				}
			);

 	$("#CrearFicha_Descripcion .title").on("click", CrearFicha_Descripcion);
    $("#frmBuscarFicha").on("submit", frmBuscarFicha_Submit);

    $("#btnBuscarFicha_OcultarTabla").on("click", function()
    {
    	$("#frmBuscarFicha").slideDown();
		$("#BuscarFicha_Resultados").slideUp();	
    });

    $("#EditarFicha_Volver").on("click", function()
		{
			$("#BuscarFicha").slideDown();
			$("#EditarFicha").slideUp();
		}
    	);

    $("#BuscarFicha_Resultados .btnBuscarFicha_MasInfo").live("click", btnBuscarFicha_MasInfo_Click);

    $("#EditarFicha_Descripcion_Menu article").on("click", EditarFicha_Descripcion_Menu_article_Click);
}
function CargarUsuario()
{
	Usuario = JSON.parse(localStorage.UsuarioDNP)[0];
	$("#lblWelcome span").text(Usuario.NickName);
	$("#lblWelcomeRol span").text(Usuario.RolName);
	
	$("#txtMyAccount_Name").val(Usuario.Name);
	$("#txtMyAccount_DisplayName").val(Usuario.NickName);
	$("#txtMyAccount_Email").val(Usuario.Email);
	$("#txtMyAccount_Company").val(Usuario.CompanyName);
		
	$("#tableMyUsers td").remove();
	
	$("#rdsAgrupacion").buttonset();
	CargarPermisos(Usuario.Id);
	CargarUsuariosPropios();
	CargarRoles();

}
function CargarRoles()
{
	$.post('php/CargarRoles.php',
		{Id_Rol : Usuario.IdInitialRol},
		function(data)
		   {
			   $("#MyUsersEdit_Permissions_Rol option").remove();
			   $("#cboCreatingUsersCreate_Rol option").remove();
			   
				$.each(data,function(index,value) 
				{
					if (data[index].RolId)
					{
						var tds = "<option value='" + data[index].RolId + "'>" + data[index].RolName + "</option>";
							  
						$("#MyUsersEdit_Permissions_Rol").append(tds);
						$("#CreatingUsersCreate_Rol").append(tds);
					}
				});
		   }, "json"	
		);
}
function CerrarSesion()
{
	delete localStorage.UsuarioDNP;
	window.location.replace("index.html");
}
function DashBoard_RangeBx_Change()
{
	$(this).val(Date.parse($(this).val()).toString("yyyy-MM-dd"));
}
function DiferenciaDias(FechaInicial, FechaFinal)
{  
    var d1 = FechaInicial.split("-");  
    var dat1 = new Date();  
    dat1.setFullYear(d1[0], parseFloat(d1[1])-1, parseFloat(d1[2]));
   
    var d2 = FechaFinal.split("-");  
    var dat2 = new Date();  
    dat2.setFullYear(d2[0], parseFloat(d2[1])-1, parseFloat(d2[2]));
  
    var fin = dat2.getTime() - dat1.getTime();  
    var dias = Math.floor(fin / (1000 * 60 * 60 * 24))    
    return (dias + 1);  
}  
function sumarDiasFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "yyyy-MM-dd").add(NumDias).days().toString("yyyy-MM-dd");
	return obj;
}
function sumarHorasFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "HH-MM-dd").add(NumDias).hours().toString("HH:mm yyyy-MM-dd");
	return obj;
}
function sumarMesesFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "yyyy-MM-dd").add(NumDias).months().toString("MM");
	return obj;
}


function Seccion(obj)
{
	$("#MainMenu li a").css("background", "#c0c0c0");
	$("#MainMenu li a").css("color", "#3b3b3b");
	$("#MainMenu li a").attr("act", "");
	
	//$("#CrearFicha_Descripcion .title").css("color", "#4b4b4b");

	var idLbl = obj.replace("#", "lbl");
	
	$("#" + idLbl).attr("act", "true");
	$("#" + idLbl).css("background", "#45505c");
	$("#" + idLbl).css("color", "white");

	$("#BuscarFicha").slideUp();
	$("#CrearFicha").slideUp();
	$("#Users").slideUp();
	$("#EditarFicha").slideUp();
	$(obj).slideDown();
}
function btnCompanyDataCancel_click(evento)
{
	evento.preventDefault();
	$("#CompanyData").slideUp();
	$("#CompanyData_Edit").slideUp();
	$("#txtCreatingUsersCreate_Email").focus();	
	$("#txtCreatingUsersCreate_Company").val(1);
}
function btnCompanyDataCreate_click(evento, NombreCampo, NombreSelect, NombreAlerta, NombreSeccion, NombreCampoSiguiente)
{
	evento.preventDefault();
	$.post("php/CrearDepartamento.php",  
	{
		Name: $("#" + NombreCampo).val(),
		IdOwn: Usuario.Id
	}, 
	function(data)
	{	
		data = parseInt(data);
		if (isNaN(data) || data == 0) 
		{ 
			MostrarAlerta(NombreAlerta, "error", "ui-icon-alert", "Error!", "El Departamento ya existe");
		}
		else
		{ 
			MostrarAlerta(NombreAlerta, "default", "ui-icon-circle-check", "Hey!", "El Departamento fue creado");
			
			$("#" + NombreSelect).append("<option value=" + data + ">" + $("#" + NombreCampo).val() + "</option>");	
				$("#" + NombreSeccion).slideUp();
				$("#" + NombreCampoSiguiente).focus();	
			$("#" + NombreSelect).val(data);
		} 
	});		
}
function btnMyUsers_Edit_click()
{	
	ResetearContenedor("MyUsers_Edit");
	var IdUsuario = $(this).attr("idUser");
	var Nombre = $(this).attr("UserName");
	CargarDepartamentos();
	
	var strObj = "Edit " + $(this).attr('UserName');
		$("#MyUsers_Edit").attr("IdUsuario", IdUsuario);
			$("#txtMyUsersEdit_Name").val(Nombre);
			$("#txtMyUsersEdit_DisplayName").val($(this).attr('DisplayName'));
			$("#txtMyUsersEdit_Email").val($(this).attr('Mail'));
			//$("#txtMyUsersEdit_Company").val($(this).attr('IdCompany'));
			$("#txtMyUsersEdit_State").val($(this).attr("State"));
			$("#txtMyUsersEdit_Phone").val($(this).attr("Phone"));
			
		$("#MyUsers_Edit").dialog({
				autoOpen: false, 				
				title: "Editar " + Nombre,
				minWidth: 600,
				buttons: [
							{
								text: "Actualizar",
								click: function() { btnMyUsersEditOk_click();
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
		$("#MyUsers_Edit").dialog('open');
}
function btnMyUsersEditOk_click()
{
	var dialogo = $('<div></div>')
		  .html("¿Está seguro que desea actualizar los datos?")
		  .dialog({
			autoOpen: false,
			buttons: [
						{
							text: "Update",
							click: function() { 
												var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
												$.post("php/EditarUsuario.php",
														{
															Id : IdUsuario,
															IdOwn : Usuario.Id,
															Name :  $("#txtMyUsersEdit_Name").val(),
															NickName : $("#txtMyUsersEdit_DisplayName").val(),
															Email : $("#txtMyUsersEdit_Email").val(),
															IdDepartamento: $("#txtMyUsersEdit_Company").val(),
															Phone : $("#txtMyUsersEdit_Phone").val(),
															State : $("#txtMyUsersEdit_State").val()
														},
														function(data)
															{
																if (parseInt(data) >= 0)
																{
																	var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
																	dialogo.dialog("close"); 
																	$("#MyUsers_Edit").dialog('close');
																	CargarUsuariosPropios();
																}
															}
													  );
											  }
						},
						{
							text: "Cancel",
							click: function() { $(this).dialog("close"); 
												$("#MyUsers_Edit").dialog('close');
											  }
						}
					  ],
			modal: true, 
			stack: true,
			title: "confirm Update"
		  });
	dialogo.dialog('open');
}
function btnMyUsers_LoginAsAUser_click()
{
	var IdUsuario = $(this).attr("idUser");
	
	localStorage.setItem("UsuarioSimulado", '[' + JSON.stringify(
	{	"Id": IdUsuario,
		"Name": $(this).attr('UserName'),
		"NickName": $(this).attr('DisplayName'),
		"IdCompany": $(this).attr("IdCompany"),
		"CompanyName": 	$(this).attr("IdCompany"),
		"Email": $(this).attr('Mail'),
		"urlFacebook": $(this).attr("urlFacebook"),
		"urlTwitter": $(this).attr("urlTwitter"),
		"IdInitialRol": $(this).attr("IdInitialRol"),
		"RolName": $(this).attr("RolName")
	}
																) + ']');
	
	abrirPopup("UserLogin.html");
}
function CambiarRol()
{
	$("#UserTableFunctions :checkbox").attr('checked', false);

	$.post("php/CargarPermisosRol.php",
			{IdRol : $("#MyUsersEdit_Permissions_Rol").val()},
			function(data)
			{
				$.each(data,function(index,value) 
				{
					$("#chk" + data[index].IdFunction).attr('checked', true);
				});
			}, "json"
		  );
}
function btnMyAccount_Options_Permissions_Delete_click()
{
	var IdPer = $(this).parent("td").attr("name");
	var Fila = document.getElementsByName($(this).parent("td").attr("name"));
	
	var dialogo = $('<div></div>')
		  .html("Are you sure that you wish to delete this Permission?")
		  .dialog({
			autoOpen: false,
			buttons: [
						{
							text: "Delete",
							click: function() { 
												$.post("php/BorrarPermiso.php",
														{	IdPermission : IdPer	},
														function(data)
															{
																if (parseInt(data) > 0)
																{
																	$("#" + $(Fila[2]).text()).slideUp();
																	CargarPermisos(Usuario.Id)
																	dialogo.dialog("close"); 
																}
															}
													  );
											  }
						},
						{
							text: "Cancel",
							click: function() { $(this).dialog("close"); }
						}
					  ],
			modal: true, 
			stack: true,
			title: "Confirm Delete"
		  });
	dialogo.dialog('open');
}
function CargarUsuariosPropios()
{
	$("#tableMyUsers").dataTable().fnClearTable();
		$.post("php/VerUsuariosPropios.php",
		{ Id : Usuario.Id},																																																																																																																					
		function(data)
		{
			$.each(data,function(index,value) 
			{
				if (data[index].IdUser)
				{
					$('#tableMyUsers').dataTable().fnAddData( [
										data[index].UserName + "<information  idUser = '" + data[index].IdUser +  "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Phone='" + data[index].Phone + "' Owner='" + data[index].Owner + "' IdInitialRol='" + data[index].IdInitialRol + "' RolName='" + data[index].RolName + "' CompanyName='" + data[index].Company + "'></information>",
										data[index].Name,
										data[index].State,
										data[index].RolName
										 /*,
										"<button title='Login as User' id='btnMyUsers_LoginAsAUser' class='ui-button-default ui-button ui-widget ui-corner-all'  idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRol='" + data[index].IdInitialRol + "' RolName='" + data[index].RolName + "'><strong><span class='ui-icon ui-icon-play'></span></strong></button>",
										"<button title='Edit' id='btnMyUsers_Edit' class='ui-button-default ui-button ui-widget ui-corner-all' idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRol='" + data[index].IdInitialRol + "'><strong><span class='ui-icon ui-icon-pencil'></span></strong></button>",
										"<button title='Edit Permissions' id='btnMyUsers_EditPermissions' class='ui-button-default ui-button ui-widget ui-corner-all' idUser='" + data[index].IdUser + "'><strong><span class='ui-icon ui-icon-unlocked'></span></strong></button>",
										"<button title='Delete' id='btnMyUsers_Delete' class='ui-button-default ui-button ui-widget ui-corner-all' idUser='" + data[index].IdUser + "'><strong><span class='ui-icon ui-icon-closethick'></span></strong></button>"*/
															  ] 
															);
				}
			});
		}, "json")	;
		
}
function abrirPopup(url)																					
{
	popupWin = window.open(url, 'open_window');
}
function ResetearContenedor(IdContenedor)
{																																										
		  $('#' + IdContenedor).find(':input').each(function() {
			if ($(this).attr('type') != 'submit')
			  {
                $(this).val('');
              }
			});
}
function EditarPermisos(IdUsuario, NombreUsuario)
{
	
$.post("php/VerPermisos.php",
		{ Id : Usuario.Id},
		function(data){
			$("#UserTableFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'><input name='chkPermissionState' type='checkbox' id='chk" + data[index].IdFunction + "' AssociatedControl='" + data[index].AssociatedControl + "' IdFunction='" + data[index].IdFunction + "'/></td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "' IdFunction='" + data[index].IdFunction + "'></td>";
						tds += '</tr>';	
					$("#UserTableFunctions").append(tds);
				}
			});
			$.post("php/VerPermisos.php",
								{ Id : IdUsuario},
								function(data2)
								{
									$.each(data2,function(index2,value2)
									{
										$("#chk" + data2[index2].IdFunction).attr("checked", "checked");
									});
								}, "json");
					},
		"json");
		
		$("#MyUsersEdit_Permissions").dialog({
		autoOpen: false, 
		minWidth: 620,
		title: "Editar Permisos de: " + NombreUsuario,
		buttons: [
			{
				text: "Ok",
				click: function() { 
									var tabla = document.getElementById("UserTableFunctions");
									var numFilas = tabla.rows.length;
									var Controles = "";
									var elementos = tabla.getElementsByTagName("input")
									for (i = 0; i < numFilas; i++)
									{
										if($(elementos[i]).is(':checked'))
										{
											Controles += $(elementos[i]).attr("IdFunction") + "@";
										}
									}
									$.post("php/EditarPermiso.php",
											{Functions: Controles, IdUser: IdUsuario},
											function(data)
											{
													$("#MyUsersEdit_Permissions").dialog("close");
											}
										  );
								  }
			},
			{
				text: "Cancel",
				click: function() { $(this).dialog("close"); 
								  }
			}
				  ]
								});
	$("#MyUsersEdit_Permissions").dialog('open');	
	
}
function CargarPermisos(IdUsuario)
{
	$.post("php/VerPermisos.php",
		{ Id : IdUsuario},
		function(data){
			$("#TableFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].AssociatedControl + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'><button title='Delete' id='btnMyAccount_Options_Permissions_Delete' class='ui-button-default ui-button ui-widget ui-corner-all'><strong><span class='ui-icon ui-icon-closethick'></span></strong></button></td>";
						  tds += "<td name='" + data[index].IdPermission + "' IdFunction='" + data[index].IdFunction + "'></td>";
						tds += '</tr>';	
					$("#TableFunctions").append(tds);
					$("#" + data[index].AssociatedControl).slideDown();
					$("#lnkLogout").slideDown();
				}
			});
					},
		"json");
}
function CreatingUsersCreate_submit(evento)
{
		evento.preventDefault();
		if ($("#txtCreatingUsersCreate_Password").val() == $("#txtCreatingUsersCreate_ReTypePassword").val())
		{
			$.post("php/CrearUsuario.php",  
			{
				Id: Usuario.Id,
				User: $("#txtCreatingUsersCreate_User").val(),
				Password: $("#txtCreatingUsersCreate_Password").val(),
				Name: $("#txtCreatingUsersCreate_Name").val(),
				NickName: $("#txtCreatingUsersCreate_DisplayName").val(),
				Email: $("#txtCreatingUsersCreate_Email").val(),
				Company: $("#txtCreatingUsersCreate_Company").val(),
				Phone: $("#txtCreatingUsersCreate_Phone").val(),
				IdRol: $("#cboCreatingUsersCreate_Rol").val()
			}, 
			function(data)
			{
				var Id = parseInt(data);
				if (isNaN(Id)) //No lo Creó
				{ 
					MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Alert!", data);
				}
				else //Si lo Creó
				{ 
					EditarPermisos(Id, $("#txtCreatingUsersCreate_Name").val());
					MostrarAlerta("CreatingUsers_Create", "default", "ui-icon-circle-check", "Hey!", "El Usuario ha sido creado");
					ResetearContenedor("CreatingUsersCreate");
				} 
			});	
		} else
		{
			MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Error!", "Las claves deben coincidir");
		}
}
function MostrarAlerta(NombreContenedor, TipoMensaje, Icono, Strong, Mensaje)
{
	/*NombreContenedor : Id del Div que contiene el MessageAlert
	 * TipoMensaje : {highlight, error, default}
	 * Icono : Icono que acompaña el mensaje ver listado en bootstrap
	 * Mensaje del AlertMessage*/
	 
	$("#" + NombreContenedor).removeClass(function() {return $(this).prev().attr('class');});
	$("#" + NombreContenedor + " span").removeClass("*");
	$("#" + NombreContenedor).addClass("ui-state-" + TipoMensaje);
	$("#" + NombreContenedor + " span").addClass(Icono);
	$("#" + NombreContenedor + " strong").text(Strong);
	$("#" + NombreContenedor + " texto").text(Mensaje);
	$("#" + NombreContenedor).fadeIn(300).delay(2600).fadeOut(600);
}
function CargarInfoUsuario()
{
	/*
	* idUser = data[index].IdUser
	* urlFacebook= data[index].urlFacebook
	* urlTwitter= data[index].urlTwitter
	* State= data[index].State
	* IdCompany= data[index].IdCompany
	* UserName= data[index].Name
	* DisplayName= data[index].NickName
	* Mail= data[index].Mail
	* Owner= data[index].Owner
	* IdInitialRol= data[index].IdInitialRol
	* RolName= data[index].RolName
	* CompanyName= data[index].Company
	* */
	$('#MyUsers_Info_NickName span').text($(this).find('information').attr('DisplayName'));
	$('#MyUsers_Info_Mail span').text($(this).find('information').attr('Mail'));
	$('#MyUsers_Info_Owner span').text($(this).find('information').attr('Owner'));
	$('#MyUsers_Info_Company span').text($(this).find('information').attr('CompanyName'));
	$('#MyUsers_Info_Phone span').text($(this).find('information').attr('Phone'));

	$("#btnMyUsers_LoginAsAUser").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_LoginAsAUser").attr('Phone', $(this).find('information').attr('Phone'));
	$("#btnMyUsers_LoginAsAUser").attr('State', $(this).find('information').attr('State'));
	$("#btnMyUsers_LoginAsAUser").attr('IdCompany', $(this).find('information').attr('IdCompany'));
	$("#btnMyUsers_LoginAsAUser").attr('UserName', $(this).find('information').attr('UserName'));
	$("#btnMyUsers_LoginAsAUser").attr('DisplayName', $(this).find('information').attr('DisplayName'));
	$("#btnMyUsers_LoginAsAUser").attr('Mail', $(this).find('information').attr('Mail'));
	$("#btnMyUsers_LoginAsAUser").attr('Owner', $(this).find('information').attr('Owner'));
	$("#btnMyUsers_LoginAsAUser").attr('IdInitialRol', $(this).find('information').attr('IdInitialRol'));
	$("#btnMyUsers_LoginAsAUser").attr('RolName', $(this).find('information').attr('RolName'));

	$("#btnMyUsers_Edit").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_Edit").attr('Phone', $(this).find('information').attr('Phone'));
	$("#btnMyUsers_Edit").attr('State', $(this).find('information').attr('State'));
	$("#btnMyUsers_Edit").attr('IdCompany', $(this).find('information').attr('IdCompany'));
	$("#btnMyUsers_Edit").attr('UserName', $(this).find('information').attr('UserName'));
	$("#btnMyUsers_Edit").attr('DisplayName', $(this).find('information').attr('DisplayName'));
	$("#btnMyUsers_Edit").attr('Mail', $(this).find('information').attr('Mail'));
	$("#btnMyUsers_Edit").attr('Owner', $(this).find('information').attr('Owner'));
	$("#btnMyUsers_Edit").attr('IdInitialRol', $(this).find('information').attr('IdInitialRol'));
	$("#btnMyUsers_Edit").attr('RolName', $(this).find('information').attr('RolName'));

	$("#btnMyUsers_KeyChange").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_KeyChange").attr('UserName', $(this).find('information').attr('UserName'));

	$("#btnMyUsers_EditPermissions").attr('idUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_EditPermissions").attr('Username', $(this).find('information').attr('DisplayName'));

	$("#btnMyUsers_Delete").attr('idUser', $(this).find('information').attr('IdUser'));
}
function cboCompanyCreate_Change(Seccion, Control)
{
	if ($("#" + Control).val() == "otro")
	{
		$("#" + Seccion).slideDown();
	}
	else
	{
		$("#" + Seccion).slideUp();
	}
}
function CargarDepartamentos()
{
	$("#txtCreatingUsersCreate_Company option").remove();
	$("#txtMyUsersEdit_Company option").remove();
	$.post("php/CargarDepartamentos.php",
			function(data)
			{

				$.each(data,function(index,value)
				{
					$("#txtCreatingUsersCreate_Company").append("<option value=" + value.IdDepartamento + ">" + value.Nombre + "</option>");
					$("#txtMyUsersEdit_Company").append("<option value=" + value.IdDepartamento + ">" + value.Nombre + "</option>");
				});
				$("#txtCreatingUsersCreate_Company").append("<option value='otro'>Otro</option>");
				$("#txtMyUsersEdit_Company").append("<option value='otro'>Otro</option>");
			}
		,"json");
}
function btnMyUsers_KeyChange_Click()
{
	var Nombre = $(this).attr("UserName");
	var IdUser = $(this).attr("idUser");
	$("#MyUsers_Edit_Key").dialog({
		autoOpen: false, 				
		title: "Cambiar Clave de " + Nombre,
		minWidth: 600,
		buttons: [
					{
						text: "Cambiar",
						click: function() { 
											if ($("#txtMyUsersEdit_ReTypePassword").val() == $("#txtMyUsersEdit_Password").val())
											{
												if($("#txtMyUsersEdit_Password").val() != "")
												{
													CambiarClave(IdUser, $("#txtMyUsersEdit_Password").val());	
													MostrarAlerta("Users_Message", "highlight", "ui-icon-check", "Hey!", "La Clave se ha Cambiado");
													$(this).dialog("close"); 
												}
												else
												{
													MostrarAlerta("MyUsersEdit_Message_Key", "error", "ui-icon-alert", "Error!", "La Clave no puede estar vacía");
												}
											}
											else
											{
												MostrarAlerta("MyUsersEdit_Message_Key", "error", "ui-icon-alert", "Error!", "las Claves no coinciden");
											}
												
										  }
					},
					{
						text: "Cancelar",
						click: function() { $(this).dialog("close"); 
										  }
					}
				  ]
						});
	$("#MyUsers_Edit_Key").dialog('open');
}
function CambiarClave(IdUser, NuevaClave)
{
	$.post("php/CambiarClave.php",
				{
					IdUsuarioMaestro: Usuario.Id,
					Id: IdUser,
					Clave: NuevaClave
				}
		);
}
function CrearFicha_Descripcion()
{
	var Id = $(this).attr("Caja");
	$("#CrearFicha_Descripcion").find(".content").fadeOut();
	
	$("#CrearFicha_Descripcion .title").css("background", "none");
	$("#CrearFicha_Descripcion .title").css("color", "#4b4b4b");
	$("#CrearFicha_Descripcion .title").attr("act", "");
	
	//$("#CrearFicha_Descripcion .title").css("color", "#4b4b4b");

	$(this).attr("act", "true");
	$(this).css("background", "#0274b0");
	$(this).css("color", "white");

	$("#" + Id).fadeIn();
	$("#" + Id).css("width", $("#CrearFicha_Descripcion").width() * 0.67);
}
function frmCrearFicha_Submit(evento)
{
	evento.preventDefault();
	$.post("php/CrearProyecto.php",
			{
				IdUsuario: Usuario.Id,
				FichaNum: $("#txtCrearFicha_Numero").val(),
				Nombre: $("#txtCrearFicha_Nombre").val(),
				IdSector: $("#txtCrearFicha_Sector").val(),
				FechaInicio: $("#txtCrearFicha_FechaIni").val(),
				FechaFin: $("#txtCrearFicha_FechaFin").val(),
				Entidad: $("#txtCrearFicha_Entidad").val(),
				Expediente: $("#txtCrearFicha_NumExpediente").val(),
				Consultora: $("#txtCrearFicha_Consultora").val(),
				CostoTotal: $("#txtCrearFicha_Costo").val(),
				Fuente: $("#txtCrearFicha_Fuente").val(),
				Des_ObjetivoGeneral: $("#txtCrearFicha_Descripcion_ObjetivoGeneral").val(),
				Des_ObjetivoEspecifico: $("#txtCrearFicha_Descripcion_ObjetivoEspecifico").val(),
				Des_Alcance: $("#txtCrearFicha_Descripcion_Alcance").val(),
				Des_Productos: $("#txtCrearFicha_Descripcion_Productos").val(),
				Des_Resultados: $("#txtCrearFicha_Descripcion_Resultados").val(),
				Des_Inversion: $("#txtCrearFicha_Descripcion_Inversion").val(),
				Des_Herramientas: $("#txtCrearFicha_Descripcion_Herramientas").val(),
				Des_MejoresPracticas: $("#txtCrearFicha_Descripcion_MejoresPracticas").val(),
				Des_Obsevaciones: $("#txtCrearFicha_Descripcion_Observaciones").val()
			}
		);
}
function frmBuscarFicha_Submit(evento)
{
	evento.preventDefault();

	$.post("php/BuscarProyecto.php",
			{
				FichaNum: $("#txtBuscarFicha_Numero").val(),
				Nombre: $("#txtBuscarFicha_Nombre").val(),
				IdSector: $("#txtBuscarFicha_Sector").val(),
				FechaInicio: $("#txtBuscarFicha_FechaIni").val(),
				FechaFin: $("#txtBuscarFicha_FechaFin").val(),
				Entidad: $("#txtBuscarFicha_Entidad").val(),
				Expediente: $("#txtBuscarFicha_NumExpediente").val(),
				Consultora: $("#txtBuscarFicha_Consultora").val(),
				CostoTotal: $("#txtBuscarFicha_Costo").val(),
				Fuente: $("#txtBuscarFicha_Fuente").val(),
				Descripcion: $("#txtBuscarFicha_Descripcion").val()
			},
			function(data)
			{
				$("#frmBuscarFicha").slideUp();
				$("#BuscarFicha_Resultados").slideDown();

				$("#tblBuscarFicha tbody tr").remove();
				Fichas = data;
				$.each(data,
						function(index, valor)
						{
							var tds;

							tds = "<tr id='" + valor.IdProyecto + "'>";
									tds += "<td>" + valor.FichaNum + "</td>";
									tds += "<td>" + valor.Nombre + "</td>";
									tds += "<td>" + valor.FechaInicio + "</td>";
									tds += "<td>" + valor.FechaFin + "</td>";
									tds += "<td>" + valor.Expediente + "</td>";
									tds += "<td>" + valor.Consultora + "</td>";
									tds += "<td><button id='btnBuscarFicha_MasInfo" + index + "' class='btnBuscarFicha_MasInfo ui-button-info ui-button ui-widget ui-corner-all' title='Información de:" + valor.Nombre + "'><span class='ui-icon ui-icon-comment'></span></button></td>";
							tds += '</tr>';	

							$("#tblBuscarFicha tbody").append(tds);
							
						}
				);
			},
			"json");
}
function btnBuscarFicha_MasInfo_Click()
{
	$("#BuscarFicha").slideUp();
	$("#EditarFicha").slideDown();
	
	var IdFicha = $(this).attr("id").replace("btnBuscarFicha_MasInfo", "");
	
	$("#EditarFicha").attr("IdProyecto", $(this).parent("td").parent("tr").attr("id"));
	$("#EditarFicha_Descripcion_Menu").attr("IdProyecto", $(this).parent("td").parent("tr").attr("id"));
	$("#EditarFicha_Descripcion_Menu").attr("IdFicha", IdFicha);
	
	
	$("#frmEditarFicha h3 span").text(Fichas[IdFicha].FichaNum);
		$('#txtEditarFicha_Numero').val(Fichas[IdFicha].FichaNum);
		$('#txtEditarFicha_Nombre').val(Fichas[IdFicha].Nombre);
		$('#txtEditarFicha_Sector').val(Fichas[IdFicha].IdSector);
		$('#txtEditarFicha_FechaIni').val(Fichas[IdFicha].FechaInicio);
		$('#txtEditarFicha_FechaFin').val(Fichas[IdFicha].FechaFin);
		$('#txtEditarFicha_Entidad').val(Fichas[IdFicha].Entidad);
		$('#txtEditarFicha_NumExpediente').val(Fichas[IdFicha].Expediente);
		$('#txtEditarFicha_Consultora').val(Fichas[IdFicha].Consultora);
		$('#txtEditarFicha_Costo').val(Fichas[IdFicha].CostoTotal);
		$('#txtEditarFicha_Fuente').val(Fichas[IdFicha].Fuente);
}
function EditarFicha_Descripcion_Menu_article_Click()
{
	var Descripcion ="";
	$("#EditarFicha_Descripcion textarea").remove();
	$("#EditarFicha_Descripcion").append("<textarea style='height:11em;width:97%;'type='text' id='txtEditarFicha_Descripcion' placeholder='" + $(this).attr("Descripcion") + "'></textarea>");

	if($(this).text() == "Objetivos:")
	{
		$("#EditarFicha_Descripcion").append("<textarea style='height:11em;width:97%;'type='text' id='txtEditarFicha_Descripcion_2' placeholder='Objetivos Específicos'></textarea>");
		$("#txtEditarFicha_Descripcion_2").val(Fichas[$(this).parent("div").attr("IdFicha")].ObjetivosEspecificos);

		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].ObjetivoGeneral);
	}

	if($(this).text() == "Alcance:")
	{$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Alcance);}

	if($(this).text() == "Productos:")
	{$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Productos);}

	if($(this).text() == "Resultados:")
	{$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Resultados);}

	if($(this).text() == "Inversión:")
	{$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Inversion);}

	if($(this).text() == "Herramientas/Procedimientos")
	{$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Herramientas);}

	if($(this).text() == "Mejores Practicas:")
	{$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].MejoresPracticas);}

	if($(this).text() == "Observaciones")
	{$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Observaciones);}

	
	$("#EditarFicha_Descripcion").dialog({
				autoOpen: false, 				
				title: "Editar " + $(this).text(),
				minWidth: 600,
				buttons: [
							{
								text: "Actualizar",
								click: function() { EditarFicha($(this).parent("div").attr("IdProyecto"));
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
	
	$("#EditarFicha_Descripcion").dialog('open');	
}
function EditarFicha_Descripcion(IdProyecto)
{

}
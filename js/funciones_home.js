var Usuario;
var Fichas;
var Documentos_Path;
$(document).on("ready", arranque);
var Meses = new Array('', 'Enero', 'Frebrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');

function arranque()
{
	if(!localStorage.UsuarioDNP)
	{CerrarSesion();}

	$("#DashBoard_Opciones").buttonset();

	$("#DashBoard_Opciones input").on("click", DashBoard_Opciones_input_click);

	CargarUsuario();
	CargarDepartamentos();
	CargarSectores();

	$('#tblBuscarFicha').dataTable( {
			"sDom": 'T<"clear">lfrtip',
			"aaSorting": [[ 2, "asc" ]],
			"oTableTools": 
				{
			"sSwfPath": "Tools/datatable/media/swf/copy_csv_xls_pdf.swf",
			"aButtons": [
                "print",
                {
                    "sExtends":    "collection",
                    "sButtonText": "Guardar",
                    "aButtons":    [ "csv", "xls", "pdf" ]
                }
            			]
				},
				"oColumnFilterWidgets": 
				{
			"sSeparator": "\\s*/+\\s*"
				}
		} );
	

	$('#txtBuscarFicha_FechaIni, #txtBuscarFicha_FechaFin, #txtCrearFicha_FechaIni, #txtCrearFicha_FechaFin, #txtCrearContrato_FechaFirma, #txtCrearContrato_Registro, #txtCrearContrato_FInicio, #txtCrearContrato_FTerminacion').datepicker();

	$('#txtBuscarFicha_FechaIni, #txtBuscarFicha_FechaFin, #txtCrearFicha_FechaIni, #txtCrearFicha_FechaFin, #txtCrearContrato_FechaFirma, #txtCrearContrato_Registro, #txtCrearContrato_FInicio, #txtCrearContrato_FTerminacion').on('change', DashBoard_RangeBx_Change);

	$('#lnkLogout').on('click', CerrarSesion);
	
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

	$("#lnkHome").on('click', function(){ Seccion("#DashBoard"); $("#SelectedSection h4").text("Inicio");CargarDashboard();});
	$("#lnkReporte").on('click', function(){ abrirPopup("php/GenerarReporte.php");});
	$("#lnkBuscarFicha").on('click', function(){ Seccion("#BuscarFicha"); $("#SelectedSection h4").text("Buscar Ficha");});
	$("#lnkBuscarContrato").on('click', function(){ Seccion("#BuscarContrato"); $("#SelectedSection h4").text("Buscar Contrato");});
	$("#lnkCrearContrato").on('click', function(){ Seccion("#CrearContrato"); $("#SelectedSection h4").text("Crear Contrato");});
	$("#lnkCrearFicha").on('click', function(){ Seccion("#CrearFicha"); $("#SelectedSection h4").text("Crear Ficha"); CargarContratosCBO("txtCrearFicha_Contrato");});

	
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
    $("#frmBuscarContrato").on("submit", frmBuscarContrato_Submit);

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
    $("#BuscarFicha_Resultados .btnBuscarFicha_Documento").live("click", btnBuscarFicha_Documento_Click);
    $("#BuscarFicha_Resultados .btnBuscarFicha_Eliminar").live("click", btnBuscarFicha_Eliminar_Click);
    $("#tblBuscarContrato .btnBuscarContrato_MasInfo").live("click", btnBuscarContrato_MasInfo_Click);

    $("#EditarFicha_Descripcion_Menu article").on("click", EditarFicha_Descripcion_Menu_article_Click);

    $("#frmEditarFicha").on("submit", frmEditarFicha_Submit);

    $("#txtCrearFicha_Sector").on("change", function()
    				{
    					cboCompanyCreate_Change("CrearFicha_Sector", "txtCrearFicha_Sector"); 
    					$("#txtCrearFicha_Subcomponente option").remove();
    					if ($("#rdbCrearFicha_Componente input:radio[name=rdbComponente]:checked").val() == 1)
    					{
    						$("#CrearFichaSubcomponentes_").slideDown();
    						$.post("php/CargarSubcomponentes.php",
    								{IdSector : $(this).val()},
    								function (data)
    								{
										$.each(data,function(index,value) 
										{
											var tds = "<option value='" + data[index].IdSubcomponente + "' Subcomponente = '" + data[index].Subcomponente + "'>" + data[index].Nombre + "</option>";
											$("#txtCrearFicha_Subcomponente").append(tds);
										});
    								}
    								,"json"
    							);
							
							$("#txtCrearFicha_Indicador option").remove();
    						$.post("php/CargarIndicadores.php",
    								{IdSector : $(this).val()},
    								function (data)
    								{
										$.each(data,function(index,value) 
										{
											var tds = "<option value='" + data[index].IdIndicador + "' Indicador = '" + data[index].Indicador + "'>" + data[index].Nombre + "</option>";
											$("#txtCrearFicha_Indicador").append(tds);
										});
    								}
    								,"json"
    							);
    					}
    					else
    						{$("#CrearFichaSubcomponentes_").slideUp();}
    				});

		$("#txtEditarFicha_Sector").on("change", function()
    				{
    					cboCompanyCreate_Change("EditarFicha_Sector", "txtEditarFicha_Sector"); 
    					
    					if ($("#txtEditarFicha_Componente").val() == 1)
    					{
    						$("#EditarFichaSubcomponentes_").slideDown();

    						$("#txtEditarFicha_Subcomponente option").remove();
    						$.post("php/CargarSubcomponentes.php",
    								{IdSector : $(this).val()},
    								function (data)
    								{
										$.each(data,function(index,value) 
										{
											var tds = "<option value='" + data[index].IdSubcomponente + "' Subcomponente = '" + data[index].Subcomponente + "'>" + data[index].Nombre + "</option>";
											$("#txtEditarFicha_Subcomponente").append(tds);
										});
    								}
    								,"json"
    							);
							
							$("#txtEditarFicha_Indicador option").remove();
    						$.post("php/CargarIndicadores.php",
    								{IdSector : $(this).val()},
    								function (data)
    								{
										$.each(data,function(index,value) 
										{
											var tds = "<option value='" + data[index].IdIndicador + "' Indicador = '" + data[index].Indicador + "'>" + data[index].Nombre + "</option>";
											$("#txtEditarFicha_Indicador").append(tds);
										});
    								}
    								,"json"
    							);
    					}
    					else
    						{$("#EditarFichaSubcomponentes_").slideUp();}
    				});
    $("#txtEditarFicha_Sector").on("change", function(){cboCompanyCreate_Change("EditarFicha_Sector", "txtEditarFicha_Sector");});

    $("#txtMyUsersEdit_Company").on("change", function(){cboCompanyCreate_Change("CompanyData_Edit", "txtMyUsersEdit_Company");});

	$("#btnCrearFicha_SectorCancelar").on("click", CerrarSector);
    $("#btnEditarFicha_SectorCancelar").on("click", CerrarSector);

	$("#btnCrearFicha_SectorCrear").on("click", CrearSector);
    $("#btnEditarFicha_SectorCrear").on("click", CrearSector);

    $("#txtBuscarContrato_Parametro").on("change", txtBuscarContrato_Parametro_Change);

    $("#frmBuscarContrato_Resultados_MasInfo_Cerrar").on("click", frmBuscarContrato_Resultados_MasInfo_Cerrar_Click);

   	$("#rdbCrearFicha_Componente").buttonset();
   	$("#rdbEditarFicha_Componente").buttonset();

   	$("#rdbCrearFicha_Componente input").live("click", rdbCrearFicha_Componente_Click);

   	$("#txtEditarFicha_Componente").on("change", txtEditarFicha_Componente_Change);

   	$("#txtCrearFicha_Subcomponente").live("change", CrearFichaSubcomponentes__Change);

   	CargarDashboard();

   	$("#frmCrearContrato").on("submit", frmCrearContrato_Submit);
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

	$("#DashBoard").slideUp();
	$("#BuscarFicha").slideUp();
	$("#BuscarContrato").slideUp();
	$("#CrearContrato").slideUp();
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
			if ($(this).attr('type') == 'text' || $(this).attr('type') == 'number' || $(this).attr('type') == 'password' || $(this).attr('type') == 'email')
			  {
                $(this).val('');
              }
			});
		  $('#' + IdContenedor + "textarea").val("");
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
	
	var varSubcomponente = $("#txtCrearFicha_Subcomponente").val();
	var varIndicador = $("#txtCrearFicha_Indicador").val();

	if (parseInt($("#rdbCrearFicha_Componente input:radio[name=rdbComponente]:checked").val()) > 1)
	{
		varSubcomponente = 42;
		varIndicador = 25;
	}
	
	$.post("php/CrearProyecto.php",
			{
				IdUsuario: Usuario.Id,
				FichaNum: $("#txtCrearFicha_Numero").val(),
				Nombre: $("#txtCrearFicha_Nombre").val(),
				Componente: $("#rdbCrearFicha_Componente input:radio[name=rdbComponente]:checked").val(),
				DefinicionComponente : $("#txtCrearFicha_ComponenteDefinicion").val(),
				Subcomponente: varSubcomponente,
				Indicador: varIndicador,
				Contrato: $("#txtCrearFicha_Contrato").attr("idContrato"),
				IdSector: $("#txtCrearFicha_Sector").val(),
				FechaInicio: $("#txtCrearFicha_FechaIni").val(),
				FechaFin: $("#txtCrearFicha_FechaFin").val(),
				Entidad: $("#txtCrearFicha_Entidad").val(),
				Expediente: $("#txtCrearFicha_NumExpediente").val(),
				Consultora: $("#txtCrearFicha_Consultora").val(),
				CostoTotal: $("#txtCrearFicha_Costo").val(),
				Des_ObjetivoGeneral: $("#txtCrearFicha_Descripcion_ObjetivoGeneral").val(),
				Des_ObjetivoEspecifico: $("#txtCrearFicha_Descripcion_ObjetivoEspecifico").val(),
				Des_Alcance: $("#txtCrearFicha_Descripcion_Alcance").val(),
				Des_Productos: $("#txtCrearFicha_Descripcion_Productos").val(),
				Des_Resultados: $("#txtCrearFicha_Descripcion_Resultados").val(),
				Des_Inversion: $("#txtCrearFicha_Descripcion_Inversion").val(),
				Des_Herramientas: $("#txtCrearFicha_Descripcion_Herramientas").val(),
				Des_Actividades: $("#txtCrearFicha_Descripcion_Actividades").val(),
				Des_Obsevaciones: $("#txtCrearFicha_Descripcion_Observaciones").val()
			},
			function()
			{
				MostrarAlerta("alertCrearFicha", "default", "ui-icon-circle-check", "Hey!", "La Ficha ha sido creada");
				ResetearContenedor("frmCrearFicha")
				$("#rdbCrearFicha_Componente").buttonset("refresh")
			}
		);
}
function frmBuscarFicha_Submit(evento)
{
	evento.preventDefault();
/*
	$.post("php/BuscarProyecto.php",
			{
				FichaNum: $("#txtBuscarFicha_Numero").val(),
				Nombre: $("#txtBuscarFicha_Nombre").val(),
				Componente: $("#txtBuscarFicha_Componente").val(),
				IdSector: $("#txtBuscarFicha_Sector").val(),
				FechaInicio: $("#txtBuscarFicha_FechaIni").val(),
				FechaFin: $("#txtBuscarFicha_FechaFin").val(),
				Entidad: $("#txtBuscarFicha_Entidad").val(),
				Expediente: $("#txtBuscarFicha_NumExpediente").val(),
				Consultora: $("#txtBuscarFicha_Consultora").val(),
				CostoTotal_i: $("#txtBuscarFicha_Costo_Desde").val(),
				CostoTotal_o: $("#txtBuscarFicha_Costo_Hasta").val(),
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
									tds += "<td>" + valor.NumContrato + "</td>";
									tds += "<td>" + valor.Nombre + "</td>";
									tds += "<td>" + valor.FechaInicio + "</td>";
									tds += "<td>" + valor.FechaFin + "</td>";
									tds += "<td>" + valor.Expediente + "</td>";
									tds += "<td>" + valor.Consultora + "</td>";
									tds += "<td><button id='btnBuscarFicha_MasInfo" + index + "' class='btnBuscarFicha_MasInfo ui-button-info ui-button ui-widget ui-corner-all' title='Información de:\n" + valor.Nombre + "'><span class='ui-icon ui-icon-comment'></span></button></td>";
									tds += "<td><button id='btnBuscarFicha_Documento" + valor.IdProyecto + "' class='btnBuscarFicha_Documento ui-button-info ui-button ui-widget ui-corner-all' title='Documento de:\n" + valor.Nombre + "'><span class='ui-icon ui-icon-print'></span></button></td>";
									tds += "<td><button id='btnBuscarFicha_Eliminar" + valor.IdProyecto + "' class='btnBuscarFicha_Eliminar ui-button-info ui-button ui-widget ui-corner-all' title='Eliminar:\n" + valor.Nombre + "'><span class='ui-icon ui-icon-closethick'></span></button></td>";
							tds += '</tr>';	

							$("#tblBuscarFicha tbody").append(tds);
							
							$("#tblBuscarFicha").dataTable().fnAddData( [
						}
				);
			},
			"json");
*/
	$.post("php/BuscarProyecto.php",
			function(data)
			{
				$("#frmBuscarFicha").slideUp();
				$("#BuscarFicha_Resultados").slideDown();

				$("#tblBuscarFicha").dataTable().fnClearTable();

				Fichas = data;
				$.each(data,
						function(index, valor)
						{
							var tds;

							$("#tblBuscarFicha").dataTable().fnAddData( [
									valor.NumContrato,
									valor.Nombre,
									valor.FechaInicio,
									valor.FechaFin,
									valor.Expediente,
									valor.Consultora,
									"<button id='btnBuscarFicha_MasInfo" + index + "' class='btnBuscarFicha_MasInfo ui-button-info ui-button ui-widget ui-corner-all' title='Información de:\n" + valor.Nombre + "' IdProyecto='" + valor.IdProyecto + "'><span class='ui-icon ui-icon-comment'></span></button>",
									"<button id='btnBuscarFicha_Documento" + valor.IdProyecto + "' class='btnBuscarFicha_Documento ui-button-info ui-button ui-widget ui-corner-all' title='Documento de:\n" + valor.Nombre + "'><span class='ui-icon ui-icon-print'></span></button>",
									"<button id='btnBuscarFicha_Eliminar" + valor.IdProyecto + "' class='btnBuscarFicha_Eliminar ui-button-info ui-button ui-widget ui-corner-all' title='Eliminar:\n" + valor.Nombre + "'><span class='ui-icon ui-icon-closethick'></span></button>"
									]);
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
	IdFicha2 = $(this).attr("IdProyecto");
	
	$("#frmEditarFicha").attr("IdProyecto", $(this).attr("IdProyecto"));
	$("#EditarFicha_Descripcion_Menu").attr("IdProyecto", $(this).attr("id"));
	$("#EditarFicha_Descripcion_Menu").attr("IdFicha", IdFicha);
	$("#txtEditarFicha_Contrato").val("");		
	
	$.post("php/BuscarContratodeFicha.php", {IdProyecto : IdFicha2},
		function(data)
		{
			$("#txtEditarFicha_Contrato").attr("idContrato", data.IdContrato);
			$("#txtEditarFicha_Contrato").val(data.NumContrato);		
		}
		,"json");

	CargarContratosCBO("txtEditarFicha_Contrato");
	
	$("#frmEditarFicha h3 span").text(Fichas[IdFicha].FichaNum);
		$('#txtEditarFicha_Numero').val(Fichas[IdFicha].FichaNum);
		$('#txtEditarFicha_Nombre').val(Fichas[IdFicha].Nombre);
		$('#txtEditarFicha_Componente').val(Fichas[IdFicha].Componente);
		$('#txtEditarFicha_Sector').val(Fichas[IdFicha].IdSector);
		$('#txtEditarFicha_FechaIni').val(Fichas[IdFicha].FechaInicio);
		$('#txtEditarFicha_FechaFin').val(Fichas[IdFicha].FechaFin);
		$('#txtEditarFicha_Entidad').val(Fichas[IdFicha].Entidad);
		$('#txtEditarFicha_NumExpediente').val(Fichas[IdFicha].Expediente);
		$('#txtEditarFicha_Consultora').val(Fichas[IdFicha].Consultora);
		$('#txtEditarFicha_Costo').val(Fichas[IdFicha].CostoTotal);
		//$('#txtEditarFicha_Fuente').val(Fichas[IdFicha].Fuente);

		
		///////////////////$('#txtEditarFicha_Subcomponente').val(Fichas[IdFicha].Subcomponente);

	$("#txtEditarFicha_DefinicionComponente option").remove();

	$.post("php/CargarDefinicionComponente.php", {idComponente: $("#txtEditarFicha_Componente").val()}, 
		function(data)
		{
			$.each(data,function(index,value) 
				{
					var tds = "<option value='" + data[index].Id + "' Definicion = '" + data[index].Id + "'>" + data[index].Nombre + "</option>";
					$("#txtEditarFicha_DefinicionComponente").append(tds);
				});
			$("#txtEditarFicha_DefinicionComponente").val(Fichas[IdFicha].DefinicionComponente);
		}
		, "json");

						if ($("#txtEditarFicha_Componente").val() == 1)
    					{
    						$("#EditarFichaSubcomponentes_").slideDown();

    						$("#txtEditarFicha_Subcomponente option").remove();
    						$.post("php/CargarSubcomponentes.php",
    								{IdSector : Fichas[IdFicha].IdSector},
    								function (data)
    								{
										$.each(data,function(index,value) 
										{
											var tds = "<option value='" + data[index].IdSubcomponente + "' Subcomponente = '" + data[index].Subcomponente + "'>" + data[index].Nombre + "</option>";
											$("#txtEditarFicha_Subcomponente").append(tds);
										});
										$('#txtEditarFicha_Subcomponente').val(Fichas[IdFicha].Subcomponente);
    								}
    								,"json"
    							);
							
							$("#txtEditarFicha_Indicador option").remove();
    						$.post("php/CargarIndicadores.php",
    								{IdSector : Fichas[IdFicha].IdSector},
    								function (data)
    								{
										$.each(data,function(index,value) 
										{
											var tds = "<option value='" + data[index].IdIndicador + "' Indicador = '" + data[index].Indicador + "'>" + data[index].Nombre + "</option>";
											$("#txtEditarFicha_Indicador").append(tds);
										});
										$('#txtEditarFicha_Indicador').val(Fichas[IdFicha].Indicador);
    								}
    								,"json"
    							);
    					}
    					else
    						{$("#EditarFichaSubcomponentes_").slideUp();}


	$(".EditarFicha_Menu_Item").fadeOut();
	if (Fichas[IdFicha].Componente == 1)
	{
		$(".EditarFicha_Menu_Item").fadeIn();
	}
	if (Fichas[IdFicha].Componente == 2)
	{
		$("#artEditarFicha_Menu_Item_Objetivos").fadeIn();
		$("#artEditarFicha_Menu_Item_Observaciones").fadeIn();
	}
}
function EditarFicha_Descripcion_Menu_article_Click()
{
	var Descripcion ="";
	$("#EditarFicha_Descripcion textarea").remove();
	$("#EditarFicha_Descripcion").append("<textarea style='height:11em;width:97%;'type='text' id='txtEditarFicha_Descripcion' placeholder='" + $(this).attr("Descripcion") + "' NomCampo=''></textarea>");

	if($(this).text() == "Objetivos:")
	{
		$("#EditarFicha_Descripcion").append("<textarea style='height:11em;width:97%;'type='text' id='txtEditarFicha_Descripcion_2' placeholder='Objetivos Específicos' NomCampo='ObjetivosEspecificos'></textarea>");
		$("#txtEditarFicha_Descripcion_2").val(Fichas[$(this).parent("div").attr("IdFicha")].ObjetivosEspecificos);

		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].ObjetivoGeneral);
		$("#txtEditarFicha_Descripcion").attr("NomCampo", "ObjetivoGeneral");
	}

	if($(this).text() == "Alcance:")
	{
		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Alcance);
		$("#txtEditarFicha_Descripcion").attr("NomCampo", "Alcance");
	}

	if($(this).text() == "Productos:")
	{
		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Productos);
		$("#txtEditarFicha_Descripcion").attr("NomCampo", "Productos");
	}

	if($(this).text() == "Resultados:")
	{
		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Resultados);
		$("#txtEditarFicha_Descripcion").attr("NomCampo", "Resultados");
	}

	if($(this).text() == "Inversión:")
	{
		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Inversion);
		$("#txtEditarFicha_Descripcion").attr("NomCampo", "Inversion");
	}

	if($(this).text() == "Herramientas/Procedimientos:")
	{
		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Herramientas);
		$("#txtEditarFicha_Descripcion").attr("NomCampo", "Herramientas");
	}

	if($(this).text() == "Mejores Practicas:")
	{
		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].MejoresPracticas);
		$("#txtEditarFicha_Descripcion").attr("NomCampo", "MejoresPracticas");
	}

	if($(this).text() == "Observaciones:")
	{
		$("#txtEditarFicha_Descripcion").val(Fichas[$(this).parent("div").attr("IdFicha")].Observaciones);
		$("#txtEditarFicha_Descripcion").attr("NomCampo", "Observaciones");
	}

	
	$("#EditarFicha_Descripcion").dialog({
				autoOpen: false, 				
				title: "Editar " + $(this).text(),
				minWidth: 600,
				buttons: [
							{
								text: "Actualizar",
								click: function() { EditarFicha_Descripcion($("#EditarFicha_Descripcion_Menu").attr("IdProyecto"));
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
function EditarFicha_Descripcion(ProyectoId)
{
	var NomCampos = $("#txtEditarFicha_Descripcion").attr("NomCampo");
	var Valores = $("#txtEditarFicha_Descripcion").val();
	if($("#txtEditarFicha_Descripcion_2").length)
	{
		NomCampos += "!-!" + $("#txtEditarFicha_Descripcion_2").attr("NomCampo");
		Valores += "!-!" + $("#txtEditarFicha_Descripcion_2").val();
	}

	
	$.post("php/EditarDescripcion.php",
			{
				IdUsuario: Usuario.Id,
				IdProyecto : ProyectoId,
				NomCampo: NomCampos,
				Valor: Valores
			},
			function(data)
			{
				MostrarAlerta("alertEditarFicha", "default", "ui-icon-circle-check", "Hey!", "El Campo ha sido Actualizado");
				$("#EditarFicha_Descripcion").dialog('close');
			}
		);
}
function frmEditarFicha_Submit(evento)
{
	evento.preventDefault();

	var varSubcomponente = $("#txtEditarFicha_Subcomponente").val();
	var varIndicador = $("#txtEditarFicha_Indicador").val();

	if (parseInt($("#txtEditarFicha_Componente").val()) > 1)
	{
		varSubcomponente = 42;
		varIndicador = 25;
	}

	$.post("php/EditarProyecto.php",
			{
				IdUsuario: Usuario.Id,
				IdProyecto: $("#frmEditarFicha").attr("IdProyecto"),
				FichaNum: $("#txtEditarFicha_Numero").val(),
				IdContrato: $("#txtEditarFicha_Contrato").attr("idContrato"),
				Nombre: $("#txtEditarFicha_Nombre").val(),
				Componente: $("#txtEditarFicha_Componente").val(),
				DefinicionComponente: $("#txtEditarFicha_DefinicionComponente").val(),
				Subcomponente: varSubcomponente,
				Indicador: varIndicador,
				IdSector: $("#txtEditarFicha_Sector").val(),
				FechaInicio: $("#txtEditarFicha_FechaIni").val(),
				FechaFin: $("#txtEditarFicha_FechaFin").val(),
				Entidad: $("#txtEditarFicha_Entidad").val(),
				Expediente: $("#txtEditarFicha_NumExpediente").val(),
				Consultora: $("#txtEditarFicha_Consultora").val(),
				CostoTotal: $("#txtEditarFicha_Costo").val()
			},
			function(data)
			{
				$("#EditarFicha").slideUp();
				$("#BuscarFicha").slideDown();
				frmBuscarFicha_Submit(evento);			
				MostrarAlerta("alertBuscarFicha", "default", "ui-icon-circle-check", "Hey!", "La Ficha ha sido Actualizada");
			}
		);	
}
function CargarSectores()
{
	$("#txtBuscarFicha_Sector option").remove();
	$("#txtCrearFicha_Sector option").remove();
	$("#txtEditarFicha_Sector option").remove();
	$("#txtBuscarFicha_Sector").append("<option value=''>Ninguno</option>");
	$.post("php/CargarSectores.php",
			function(data)
			{

				$.each(data,function(index,value)
				{
					$("#txtBuscarFicha_Sector").append("<option value=" + value.IdSector + ">" + value.Nombre + "</option>");
					$("#txtCrearFicha_Sector").append("<option value=" + value.IdSector + ">" + value.Nombre + "</option>");
					$("#txtEditarFicha_Sector").append("<option value=" + value.IdSector + ">" + value.Nombre + "</option>");
				});
				
				$("#txtCrearFicha_Sector").append("<option value='otro'>Otro</option>");
				$("#txtEditarFicha_Sector").append("<option value='otro'>Otro</option>");
			}
		,"json");
}
function CerrarSector(evento)
{
	evento.preventDefault();
	$(this).parent("center").parent("section").slideUp();
	$(this).parent("center").parent("section").parent("form").find("select").val('1')
}
function CrearSector(evento)
{
	evento.preventDefault();
	$(this).parent("center").parent("section").slideUp();
	var Nombre = $(this).parent("center").parent("section").find("input").val();
	var Campo = $(this).parent("center").parent("section").parent("form").find("select");
	$.post("php/CrearSector.php",  
		{
			Name: Nombre
		}, 
		function(data)
		{
			data = parseInt(data);
			$("#txtBuscarFicha_Sector").append("<option value=" + data + ">" + Nombre + "</option>");
			$("#txtCrearFicha_Sector").append("<option value=" + data + ">" + Nombre + "</option>");
			$("#txtEditarFicha_Sector").append("<option value=" + data + ">" + Nombre + "</option>");
			
			$(Campo).val(data);
		});
}
function btnBuscarFicha_Documento_Click()
{
	
	var IdFicha = $(this).attr("id").replace("btnBuscarFicha_Documento", "");
	abrirPopup("php/VerPDFFicha.php?id=" + IdFicha);
}
function txtBuscarContrato_Parametro_Change()
{
	$("#txtBuscarContrato_Valor").attr("placeholder", $(this).val());
}
function frmBuscarContrato_Submit(evento)
{
	evento.preventDefault();

	$.post("php/BuscarContrato.php",
			{
				Parametro: $("#txtBuscarContrato_Parametro").val(),
				Valor: $("#txtBuscarContrato_Valor").val()
			},
			function(data)
			{
				$("#tblBuscarContrato tbody tr").remove();
				
				$.each(data,
						function(index, valor)
						{
							var tds;

							tds = "<tr id='" + valor.IdContrato + "'>";
									tds += "<td>" + valor.NumContrato + "</td>";
									tds += "<td>" + valor.Contratista + "</td>";
									tds += "<td>" + formatNumber(valor.ValorInicial, '$') + "</td>";
									tds += "<td>" + valor.FechaInicio + "</td>";
									tds += "<td>" + valor.FechaTerminacion + "</td>";
									tds += "<td><button id='btnBuscarContrato_MasInfo" + valor.IdContrato + "' class='btnBuscarContrato_MasInfo ui-button-info ui-button ui-widget ui-corner-all' title='Información de:\n" + valor.NumContrato + "'><span class='ui-icon ui-icon-comment'></span></button></td>";
							tds += '</tr>';	

							$("#tblBuscarContrato tbody").append(tds);
							
						}
				);
			},
			"json");
}
function btnBuscarContrato_MasInfo_Click()
{
	/******/
	var IdContrato = $(this).attr("id").replace("btnBuscarContrato_MasInfo", "");
	$("#tblBuscarContrato").slideUp();
	$("#frmBuscarContrato_Resultados_MasInfo").fadeIn();

	CargarFichasCBO("txtBuscarContrato_AsignarFicha");
	$.post("php/BuscarContrato.php",
			{
				Parametro: "IdContrato",
				Valor: IdContrato
			},
			function(data)
			{
				$("#tblBuscarContrato_Info_1 tbody tr").remove();
				$("#tblBuscarContrato_Info_2 tbody tr").remove();
				$("#tblBuscarContrato_Info_3 tbody tr").remove();
				
				$.each(data,
						function(index, valor)
						{
							var tds;

							tds = "<tr id='" + valor.IdContrato + "'>";
									tds += "<td>" + valor.NumContrato + "</td>";
									tds += "<td>" + valor.FechaDeFirma + "</td>";
									tds += "<td>" + valor.Contratista + "</td>";
							tds += '</tr>';	

							$("#tblBuscarContrato_Info_1 tbody").append(tds);

							tds = "<tr id='" + valor.IdContrato + "'>";
									tds += "<td>" + valor.ObjetoSuscripcion + "</td>";
									tds += "<td>" + formatNumber(valor.ValorInicial, '$') + "</td>";
									tds += "<td>" + valor.FechaRegistroPtaInicial + "</td>";
									tds += "<td>" + valor.PlazoEjecucionInicial + "</td>";
							tds += '</tr>';	

							$("#tblBuscarContrato_Info_2 tbody").append(tds);

							tds = "<tr id='" + valor.IdContrato + "'>";
									tds += "<td>" + valor.FechaInicio + "</td>";
									tds += "<td>" + valor.FechaTerminacion + "</td>";
							tds += '</tr>';	

							$("#tblBuscarContrato_Info_3 tbody").append(tds);
							if($('#elFinder').elfinder('instance'))
							{ $('#elFinder').elfinder('destroy');}
							
							
							var elf = $('#elFinder').elfinder({
								url : 'Tools/elfinder/php/connector.php?NumContrato=' + valor.NumContrato
								 ,lang: 'es',  
								 handlers:
									 {
									 	upload : function(event) 
									 			{ 
									 				
									 			},
									 	open: function(event)
										 		{ 
										 			
									 			},
									 	rm : function(event)
									 			{
									 				
									 			}
									 }           
							}).elfinder('instance');
						}
				);
			},
			"json");
}
function frmBuscarContrato_Resultados_MasInfo_Cerrar_Click()
{
	$("#tblBuscarContrato").slideDown();
	$("#frmBuscarContrato_Resultados_MasInfo").fadeOut();
}
function CargarContratosCBO(cbo)
{
	$.post("php/CargarContratos.php",
			function(data)
			{
				$.each(data,function(index,value)
				{

					$("#" + cbo)
					.autocomplete(
					{
						source: data,
						select: function( event, ui ) 
								{
									$(this).attr("idContrato", ui.item.IdContrato);
								}
					});
				});
			}
		,"json");
}
function CargarFichasCBO(cbo)
{
	$("#" + cbo + " option").remove();
	
	$("#" + cbo).append("<option value=''>Ninguno</option>");
	$.post("php/CargarFichas.php",
			function(data)
			{
				$.each(data,function(index,value)
				{
					$("#" + cbo).append("<option value=" + value.IdProyecto + ">" + value.Nombre + "</option>");
				});
			}
		,"json");
}
function btnBuscarFicha_Eliminar_Click(evento)
{
	var IdFicha = $(this).attr("id").replace("btnBuscarFicha_Eliminar", "");
	var NumFicha = $(this).attr("title").replace("Eliminar:", "");
	$("#BorrarFicha article span").text(NumFicha);
	
	$("#BorrarFicha").dialog({
				autoOpen: false, 				
				title: "Borrar Ficha",
				minWidth: 200,
				modal: true,
				buttons: [
							{
								text: "Borrar",
								click: function() { 
													$.post('php/EliminarFicha.php', {Id: IdFicha});
													$(this).dialog("close"); 
													frmBuscarFicha_Submit(evento);
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
		$("#BorrarFicha").dialog('open');	
}
function rdbCrearFicha_Componente_Click()
{
	var varComponente = $(this).val();
	$(".CrearFicha_Descripcion_Menu article").fadeOut();
	$("#CrearFichaSubcomponentes").slideDown();

	cboCompanyCreate_Change("CrearFicha_Sector", "txtCrearFicha_Sector"); 

	$("#txtCrearFicha_ComponenteDefinicion option").remove();

	$.post("php/CargarDefinicionComponente.php", {idComponente: varComponente}, 
		function(data)
		{
			$.each(data,function(index,value) 
				{
					var tds = "<option value='" + data[index].Id + "' Definicion = '" + data[index].Id + "'>" + data[index].Nombre + "</option>";
					$("#txtCrearFicha_ComponenteDefinicion").append(tds);
				});
		}
		, "json");

	if (varComponente == 1)
	{
		$(".CrearFicha_Descripcion_Menu article").fadeIn();
		$("#CrearFichaSubcomponentes_").slideDown();
			$.post("php/CargarSubcomponentes.php",
    								{IdSector : 1},
    								function (data)
    								{
    									$("#txtCrearFicha_Subcomponente option").remove();
			   
										$.each(data,function(index,value) 
										{
											var tds = "<option value='" + data[index].IdSubcomponente + "' Subcomponente = '" + data[index].Subcomponente + "'>" + data[index].Nombre + "</option>";
											$("#txtCrearFicha_Subcomponente").append(tds);
										});
										CrearFichaSubcomponentes__Change();
    								}
    								,"json"
    							);

									$("#txtCrearFicha_Indicador option").remove();
			$.post("php/CargarIndicadores.php",
    								{IdSector : $(this).val()},
    								function (data)
    								{
										$.each(data,function(index,value) 
										{
											var tds = "<option value='" + data[index].IdIndicador + "' Subcomponente = '" + data[index].Indicador + "'>" + data[index].Nombre + "</option>";
											$("#txtCrearFicha_Indicador").append(tds);
										});
    								}
    								,"json"
    							);
	}
	if (varComponente == 2)
	{
		$(".CrearFicha_Descripcion_Menu article").fadeIn();
		/*
		$("#artCrearFicha_Descripcion_Objetivos").fadeIn();
		$("#artCrearFicha_Descripcion_Actividades").fadeIn();
		$("#artCrearFicha_Descripcion_Observaciones").fadeIn();
		$("#CrearFichaSubcomponentes_").slideUp();
		*/

	}
	if (varComponente == 3)
	{
		$(".CrearFicha_Descripcion_Menu article").fadeIn();
		/*
		$("#artCrearFicha_Descripcion_Objetivos").fadeIn();
		$("#artCrearFicha_Descripcion_Actividades").fadeIn();
		$("#artCrearFicha_Descripcion_Observaciones").fadeIn();
		$("#CrearFichaSubcomponentes_").slideUp();
		*/

	}
}
function txtEditarFicha_Componente_Change()
{
	$(".EditarFicha_Menu_Item").fadeOut();

	$("#txtEditarFicha_DefinicionComponente option").remove();
	$.post("php/CargarDefinicionComponente.php", {idComponente: $(this).val()}, 
		function(data)
		{
			$.each(data,function(index,value) 
				{
					var tds = "<option value='" + data[index].Id + "' Definicion = '" + data[index].Id + "'>" + data[index].Nombre + "</option>";
					$("#txtEditarFicha_DefinicionComponente").append(tds);
				});
		}
		, "json");

	if ($(this).val() == 1)
	{
		$(".EditarFicha_Menu_Item").fadeIn();
		$("#EditarFichaSubcomponentes_").slideDown();
	}
	if ($(this).val() == 2)
	{
		$("#artEditarFicha_Menu_Item_Objetivos").fadeIn();
		$("#artEditarFicha_Menu_Item_Observaciones").fadeIn();
		$("#EditarFichaSubcomponentes_").slideUp();
	}
}
function formatNumber(num,prefix)  
{  
	num = Math.round(parseFloat(num)*Math.pow(10,2))/Math.pow(10,2)  
	prefix = prefix || '';  
	num += '';  
	var splitStr = num.split('.');  
	var splitLeft = splitStr[0];  
	var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';  
	//splitRight = splitRight + '00';  
	splitRight = splitRight.substr(0,3);  
	var regx = /(\d+)(\d{3})/;  
	while (regx.test(splitLeft)) 
	{  
		splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');  
	}  
	return prefix + splitLeft + splitRight;  
}  
function CrearFichaSubcomponentes__Change()
{
	//alert($("#txtCrearFicha_Subcomponente option:selected").val()); -->Aqui esta el Id del Subcomponente
	//$("#txtCrearFicha_Subcomponente__").val($("#txtCrearFicha_Subcomponente option:selected").attr("Subcomponente"));
}
function CargarDashboard()
{
	

	/*
*/

}
function frmCrearContrato_Submit(evento)
{
	evento.preventDefault();
	$.post("php/CrearContrato.php",
	{
		IdUsuario : Usuario.Id,
		NumContrato: $("#txtCrearContrato_Numero").val(), 
		FechaDeFirma: $("#txtCrearContrato_FechaFirma").val(), 
		Contratista: $("#txtCrearContrato_Contratista").val(), 
		ModalidadDelProceso: $("#txtCrearContrato_Modalidad").val(), 
		ObjetoSuscripcion: $("#txtCrearContrato_Objeto").val(), 
		ValorInicial: $("#txtCrearContrato_Valor").val(), 
		FechaRegistroPtaInicial: $("#txtCrearContrato_Registro").val(), 
		PlazoEjecucionInicial: $("#txtCrearContrato_Plazo").val(), 
		FechaInicio: $("#txtCrearContrato_FInicio").val(), 
		FechaTerminacion : $("#txtCrearContrato_FTerminacion").val()
	},
	function(data)
	{
		MostrarAlerta("alertCrearContrato", "default", "ui-icon-circle-check", "Hey!", "La Ficha ha sido creada");
		ResetearContenedor("frmCrearContrato")
	}
		);
	


}
function DashBoard_Opciones_input_click()
{
	var Contenedor = document.getElementById("divGraficas");

	var d1 = [];
	var datos2 = new Array;

	if ($(this).val() == 1)
	{
		$.post("php/DashBoardCargarFichas.php",
			function(datos)
			{
			
				var d1 = [];
				var datos2 = new Array;

				$.each(datos, function(index, value)
						{
							d1.push([parseInt(value.Label), parseInt(value.Cantidad)]);
							datos2[index] = {"data": [d1[index]], "label": "Componente " + value.Label};
						}
					);
				
				graph = Flotr.draw(Contenedor,
					datos2
					, {
						title: "Fichas por Componente",
					    bars : 
					    {
					      show : true,
					      stacked : true,
					      horizontal : false,
					      barWidth : 0.6,
					      lineWidth : 1,
					      shadowSize : 1
					    },
					    grid : 
					    {
					      verticalLines : false,
					      horizontalLines : true
					    },
					    legend:
					    {
					    	backgroundOpacity: 0,
					    	position: 'ne'
					    },
					    mouse:
					    {
					    	relative: true,
					    	track: true,
					    	tackAll: true,
					    	trackDecimals: 0,
					    	trackFormatter: function (x) 
					    	{
					    		//alert(x),
					        	/*var
					          	x = parseInt(x);
					        	return datos2[x].label;
					        	$.each(x.series, function(index, value)
					        		{
					        			alert(index + ': '+ value);
					        		});*/
					        	return x.series.label +": " + x.series.data[0][1];
					      	}
					    },
					     xaxis: 
					    {
					    	showLabels: false
					    },
					    yaxis:
					    {
					    	autoscale:true,
					    	min: 0,
					    	noTicks: 2,
					    	tickDecimals: 0,
					    }

						});
				cargarConveciones(datos2);
			}
		,"json");
	}

	if ($(this).val() == 2)
	{
		$.post("php/DashBoardCargarAnios.php",
			function(datos)
			{
				$.each(datos, function(index, value)
						{
							d1.push([parseInt(value.Label), parseInt(value.Cantidad)]);
							datos2[index] = {"data": [d1[index]], "label": value.Label};
						}
					);
			
				graph = Flotr.draw(Contenedor,
					datos2
					, {
						title: "Fichas por Año",
					    bars : {
					      show : true,
					      horizontal : false,
					      shadowSize : 5,
					      barWidth: 1
					    },
					    legend:
					    {
					    	backgroundOpacity: 0,
					    	position: 'ne'
					    },
					    grid : 
					    {
					      verticalLines : false,
					      horizontalLines : true
					    },
					    mouse:
					    {
					    	relative: true,
					    	track: true,
					    	tackAll: true,
					    	trackDecimals: 0,
					    	trackFormatter: function (x) 
					    	{
					    		//alert(x),
					        	/*var
					          	x = parseInt(x);
					        	return datos2[x].label;
					        	$.each(x.series, function(index, value)
					        		{
					        			alert(index + ': '+ value);
					        		});*/
					        	return x.series.label +": " + x.series.data[0][1];
					      	}
					    },
					     xaxis: 
					    {  	autoscale: true,
					    	showLabels: false   },
					    yaxis:
					    {  	
					    	autoscale:true,
					    	autoscaleMargin : 1,
					    	min: 0,
					    	showLabels: true,
					    	tickDecimals: 0
					    }
						});
				cargarConveciones(datos2);
			}
		,"json");
		
	}

	if ($(this).val() == 3)
	{
		$.post("php/DashBoardCargarSectores.php",
			function(datos)
			{
				$.each(datos, function(index, value)
						{
							d1.push([index, parseInt(value.Cantidad)]);
							datos2[index] = {"data": [d1[index]], "label": value.Label};
						}
					);

				cargarGrafica(datos2, "Por Sector");
				cargarConveciones(datos2);

			}
		,"json");
	}

	if ($(this).val() ==4)
	{
		$.post("php/DashBoardCargarSubcomponentes.php",
			function(datos)
			{
				$.each(datos, function(index, value)
						{
							//d1.push([parseInt(datos[index].Label), parseInt(datos[index].Cantidad)]);
							d1.push([index, parseInt(datos[index].Cantidad)]);
							datos2[index] = {"data": [d1[index]], "label": datos[index].Label};
						}
					);
			
				graph = Flotr.draw(Contenedor,
					datos2
					, {
						title: "Fichas por Subcomponente",
					    bars : {
					      show : true,
					      horizontal : false,
					      shadowSize : 5,
					      barWidth: 1
					    },
					    legend:
					    {
					    	backgroundOpacity: 0,
					    	position: 'ne'
					    },
					    grid : 
					    {
					      verticalLines : false,
					      horizontalLines : true
					    },
					    mouse:
					    {
					    	relative: true,
					    	track: true,
					    	tackAll: true,
					    	trackDecimals: 0,
					    	trackFormatter: function (x) 
					    	{
					    		//alert(x),
					        	/*var
					          	x = parseInt(x);
					        	return datos2[x].label;
					        	$.each(x.series, function(index, value)
					        		{
					        			alert(index + ': '+ value);
					        		});*/
					        	return x.series.label +": " + x.series.data[0][1];
					      	}
					    },
					     xaxis: 
					    {  	
					    	showLabels: false /*,

					    	tickFormatter: function (x) 
					    	{
					        	var
					          	x = parseInt(x);
					        	return datos2[x].label;
					      	},*/
					    },
					    yaxis:
					    {  	
					    	autoscale:true,
					    	autoscaleMargin : 1,
					    	min: 0,
					    	showLabels: true,
					    	tickDecimals: 0
					    }
						});

				cargarConveciones(datos2);
			}
		,"json");
	}
}
function rgbToHex(R,G,B) 
{
		return toHex(R)+toHex(G)+toHex(B)
}
function toHex(n) 
{
	 n = parseInt(n,10);
	 if (isNaN(n)) return "00";
	 n = Math.max(0,Math.min(n,255));
	 return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}
function cargarConveciones(datos2)
{
	var tmpObj = $(".flotr-legend-color-box");
				$("#divGraficasConvenciones article").remove();
				$.each(tmpObj, function(index, value)
				{
					var objHtml = $(value).html();
									
					var strObj = objHtml.substring(parseInt(objHtml.indexOf("(") + 1 ), parseInt(objHtml.indexOf(")")) );
					var strObj_ = strObj.split(",");
					
					$("#divGraficasConvenciones").append("<article><div style='width:1em; height:1em;background:#"+ rgbToHex(strObj_[0], strObj_[1], strObj_[2]) + ";'></div><span> " + datos2[index].label+"</span></article>");

				});
				$(".flotr-legend").hide();
}
function cargarGrafica(datos2, titulo)
{
	var Contenedor = document.getElementById("divGraficas");
	graph = Flotr.draw(Contenedor,
					datos2
					, {
						title: titulo,
					    bars : {
					      show : true,
					      horizontal : false,
					      shadowSize : 5,
					      barWidth: 1
					    },
					    legend: 
					    {
					    	backgroundOpacity: 0,
					    	position: 'ne'
					    },
					    grid : 
					    {
					      verticalLines : false,
					      horizontalLines : true
					    },
					    mouse:
					    {
					    	relative: true,
					    	track: true,
					    	tackAll: true,
					    	trackDecimals: 0,
					    	trackFormatter: function (x) 
					    	{
					        	return x.series.label +": " + x.series.data[0][1];
					      	}
					    },
					     xaxis: 
					    {  	autoscale: true,
					    	showLabels: false   },
					    yaxis:
					    {  	
					    	autoscale:true,
					    	autoscaleMargin : 1,
					    	min: 0,
					    	showLabels: true,
					    	tickDecimals: 0
					    }
						});
}
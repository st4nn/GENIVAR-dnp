var Usuario;
$(document).on("ready", arranque);
var Meses = new Array('', 'Enero', 'Frebrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
function ayudas()
{
	$('#Dashboard_geo_div').attr('title', 'Ésto es un texto de ayuda personalizable111!');
	$('#Dashboard_geoBar_div').attr('title', 'Ésto es un texto de ayuda personalizable!');
	$('#Dashboard_table_div').attr('title', 'Ésto es un texto de ayuda personalizable!');
	$('#dashboard_chart2_div').attr('title', 'Ésto es un texto de ayuda personalizable!');
	$('#dashboard_chart_div').attr('title', 'Ésto es un texto de ayuda personalizable!');
	$('#ConexionesTotales').attr('title', 'Ésto es un texto de ayuda personalizable!');
	$('#IpUnicas').attr('title', 'Ésto es un texto de ayuda personalizable!');
	$('#TiempoPromedio').attr('title', 'Ésto es un texto de ayuda personalizable!');
	$('#DashboardFechas').attr('title', 'Ésto es un texto de ayuda personalizable!');
}
function arranque()
{
	ayudas();
		$("#lnkTools").slideUp();
		$("#lnkMyAccount").slideUp();
		//$("#lnkUsers").slideUp();
		$("#lnkAnalytics").slideUp();
		$("#lnkMyService").slideUp();
		
		$(".tooltip").tooltipster();
	if(!localStorage.Usuario)
	{CerrarSesion();}

	$('#Dashboard_rangeBa, #Dashboard_rangeBb').datepicker();
	$('#Dashboard_rangeBa, #Dashboard_rangeBb').on('change', DashBoard_RangeBx_Change);
	$('#Dashboard_rangeBa').val(Date.parse('today').moveToFirstDayOfMonth().toString("yyyy-MM-dd"));
	$('#Dashboard_rangeBb').val(Date.parse('today').toString("yyyy-MM-dd"));	
	
	CargarUsuario();
	
	$("#btnDashboard_CambiarFecha").live('click', CargarDashboard)
	
	$('#lnkLogout').on('click', CerrarSesion);
	
	//24 de Enero
	$("#lnkHome").on('click', function(){ Seccion("#DashBoard"); $("#SelectedSection h4").text("DashBoard");})
	$("#lnkUsers").on('click', function(){ Seccion("#Users"); CargarUsuariosPropios(); $("#SelectedSection h4").text("Usuarios");})
	$("#tableMyUsersRefresh").on("click", CargarUsuariosPropios);
	
	$('#tableMyUsers').dataTable();
	$('.password').pstrength();
	$("#tableMyUsers tr").live('click', objPr);
	$("#btnMyAccount_CreatingUsersCreate_Reset").on("click", function(evento){evento.preventDefault();ResetearContenedor("CreatingUsersCreate");})
	
	$("#btnCompanyDataCancel").on("click", btnCompanyDataCancel_click);
	$("#btnCompanyDataCreate").on("click", btnCompanyDataCreate_click);
	
	$("#btnMyUsers_Delete").live("click", btnMyUsers_Delete_click);
	$("#btnMyUsers_Edit").live("click", btnMyUsers_Edit_click);
	$("#btnMyUsersEditConfirmOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_EditPermissions").live("click", function(){EditarPermisos($(this).attr("idUser"))});
	$("#MyUsersEdit_Permissions_Roll").on('change', CambiarRoll);
	
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
			$("#txtCreatingUsersCreate_User").focus();
		});
		
		$("#cboDashboardFechas_Application").load('php/CargarAplicaciones.php', CargarDashboard);
	$("#cboDashboardFechas_Application").on('change', function()
		{
			$("#cboDashboardFechas_Stream").load('php/CargarStreams.php', {Aplicacion : $("#cboDashboardFechas_Application").val()});
		}
	);
	$("#CreatingUsersCreate").on("submit", CreatingUsersCreate_submit);
}
function CargarDashboard()
{
	$('#txtDashboard_rangeBa').text($('#Dashboard_rangeBa').val());
	$('#txtDashboard_rangeBb').text($('#Dashboard_rangeBb').val());
	var ancho = parseFloat($("#DashboardGraficas").css('width'));
						
	
	$.post("php/Dashboard_Totales.php", 
			{	Fecha1: $('#Dashboard_rangeBa').val(),
				Fecha2: $('#Dashboard_rangeBb').val(),
				Aplicacion : $('#cboDashboardFechas_Application').val(),
				Stream : $('#cboDashboardFechas_Stream').val()
			}, 
			function(data)
			{
				$("#ConexionesTotales span").text(Math.round(data.ConexionesTotales));
				$("#IpUnicas span").text(data.IpUnicas);
				$("#TiempoPromedio span").text('45 min');
				//$("#TiempoPromedio span").text(data[0].ConexionesTotales);
			}, "json");
	
	$.post("php/Dashboard_UltimosMeses.php", 
			{	Aplicacion : $('#cboDashboardFechas_Application').val(),
				Stream : $('#cboDashboardFechas_Stream').val()
			}, 
			function(data)
			{
				
				var DatosMeses = new google.visualization.DataTable();
				 DatosMeses.addColumn('string', 'Mes');
				 DatosMeses.addColumn('string', 'Conexiones');
				 DatosMeses.addColumn('string', 'Ip Unicas');
				 DatosMeses.addColumn('string', 'Max Concurrencias');
				 
				 for (var i=0; i < data.length; i++)
				 {
					DatosMeses.addRow([Meses[data[i].IdMes],  Math.round(data[i].ConexionesXmes).toString(), data[i].IpUnicasXmes, data[i].MaxConcurrencias]);
					//[Meses[data[i].IdMes],  {v: data[i].ConexionesXmes, f: data[i].ConexionesXmes}, {v: data[i].ConexionesXmes, f: data[i].ConexionesXmes}]
				 }
				 var tablaMeses = new google.visualization.Table(document.getElementById('Dashboard_table_div'));
				tablaMeses.draw(DatosMeses, {showRowNumber: false});
			}, "json");
			
	var TipoAgrupacion = $("input[name='TipoAgrupacion']:checked").val();
	
	$.post("php/CargarConcurrenciasII.php", 
			{	
				Fecha1: $('#Dashboard_rangeBa').val(),
				Fecha2: $('#Dashboard_rangeBb').val(),
				Stream : $('#cboDashboardFechas_Stream').val(),
				Aplicacion : $('#cboDashboardFechas_Application').val(),
				Agrupacion: TipoAgrupacion
			}, 
			function(data)
			{
				var	obj = new Array();
				var	obj3 = new Array();
				
				var Index = 0;
				
				obj = '[["Date", "Total Connections"]';
				//obj3 = '[["Date", "max Concurrences", "Average Concurrences", "Unique IP"]';
				obj3 = '[["Date", "max Concurrences", "Unique IP"]';
				
				var MaxDias = DiferenciaDias($('#Dashboard_rangeBa').val(), $('#Dashboard_rangeBb').val());
				
				if (TipoAgrupacion == 'Hora')
				{
					MaxDias = MaxDias * 24;
				}
				if (TipoAgrupacion == 'Mes')
				{
					MaxDias = MaxDias/30;
				}
				
				for (var i = 0; i < MaxDias; i++)
				{
					if (TipoAgrupacion == 'Dia')
					{var FechaIndex = sumarDiasFecha($('#Dashboard_rangeBa').val(), i);}

					if (TipoAgrupacion == 'Hora')
					{var FechaIndex = sumarHorasFecha($('#Dashboard_rangeBa').val(), i);}
					
					if (TipoAgrupacion == 'Mes')
					{
						var FechaIndex = sumarMesesFecha($('#Dashboard_rangeBa').val(), i);
					}
						var obj2 = '["' + FechaIndex + '", 0]';
						var obj4 = '["' + FechaIndex + '", 0, 0]';

					if (TipoAgrupacion == 'Mes')
					{
						var obj2 = '["' + Meses[parseInt(FechaIndex)] + '", 0]';
						var obj4 = '["' + Meses[parseInt(FechaIndex)] + '", 0, 0]';
					}
					if (Index < data.length)
					{
						
						if (FechaIndex == data[Index].Fecha)
						{
							if (TipoAgrupacion == 'Mes')
							{
								data[Index].Fecha = Meses[data[Index].Fecha];	
							}
							var obj2 = '["' + data[Index].Label + '", ' + data[Index].countConcurrencias + ']';
							//var obj4 = '["' + data[Index].Fecha + '", ' + data[Index].maxConcurrencias + ', ' + data[Index].avgConcurrencias + ', ' + data[Index].IpUnicas + ']';
							var obj4 = '["' + data[Index].Label	 + '", ' + data[Index].maxConcurrencias + ', ' + data[Index].IpUnicas + ']';
							Index++;
						}
					}
						
						obj += ', ' + obj2;
						obj3 += ', ' + obj4;
				}

					obj += ']';
					obj3 += ']';
					
					obj = (JSON.parse(obj));
					obj3 = (JSON.parse(obj3));

					var data = google.visualization.arrayToDataTable(obj);
					var data2 = google.visualization.arrayToDataTable(obj3);
				var NumLabels = parseInt(obj.length/4);
				
					var options = 
					{
					  hAxis: {showTextEvery: NumLabels, maxTextLines: 14},
					  isStacked: false,
					  legend: {position: 'top'},
					  width: ancho* 0.6, 
					  pointSize: 5
					};
					
					var options2 = 
					{
					  hAxis: {showTextEvery: NumLabels, maxTextLines: 14},
					  colors: ['red', 'orange'],
					  isStacked: false,
					  legend: {position: 'bottom'},
					  width: ancho* 0.6, 
					  pointSize: 5
					};

					var chart = new google.visualization.AreaChart(document.getElementById('dashboard_chart_div'));
					chart.draw(data, options);
					var chart2 = new google.visualization.AreaChart(document.getElementById('dashboard_chart2_div'));
					chart2.draw(data2, options2);
						
			}, "json");
	
			//Geolocalización Ficticia
			var data = ""; //google.visualization.arrayToDataTable([
/*          ['Country', 'Connections'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['Colombia', 700]
        ]);
*/

		$.post("php/CargarGeolocalizacion.php", {
				Fecha1: $('#Dashboard_rangeBa').val(),
				Fecha2: $('#Dashboard_rangeBb').val(),
				Stream : $('#cboDashboardFechas_Stream').val(),
				Aplicacion : $('#cboDashboardFechas_Application').val()
				}, 
			function(data)
			{
				var result = '[["Country",  "Connections"], ';
				var result2 = '[["Country",  "Connections"], ';
				$(data).each(function(index)
					{
						if (index < data.length - 1)
						{
							result += '["' + data[index].Country + '", ' +  data[index].Connections + '],';	
						}
						else 
						{
							result += '["' + data[index].Country + '", ' + data[index].Connections + ']]';	
						}
					}
				);
				
				/*if (data.length > 4)
				{
					result2 += '["' + data[0].Country + '", ' +  data[0].Connections + '],';	
					result2 += '["' + data[1].Country + '", ' +  data[1].Connections + '],';	
					result2 += '["' + data[2].Country + '", ' +  data[2].Connections + '],';	
					result2 += '["' + data[3].Country + '", ' +  data[3].Connections + '],';	
					result2 += '["' + data[4].Country + '", ' +  data[4].Connections + ']]';	
					
					$("#geoPaises_" + 0 + " h5").text(data[0].Country);
					$("#geoPaises_" + 0 + " h6").text(data[0].Connections);
					
					$("#geoPaises_" + 1 + " h5").text(data[1].Country);
					$("#geoPaises_" + 1 + " h6").text(data[1].Connections);
					
					$("#geoPaises_" + 2 + " h5").text(data[2].Country);
					$("#geoPaises_" + 2 + " h6").text(data[2].Connections);
					
					$("#geoPaises_" + 3 + " h5").text(data[3].Country);
					$("#geoPaises_" + 3 + " h6").text(data[3].Connections);
					
					$("#geoPaises_" + 4 + " h5").text(data[4].Country);
					$("#geoPaises_" + 4 + " h6").text(data[4].Connections);
				}else
				{*/
					$("#geoPaises article").remove();
					$(data).each(function(index)
					{
						$("#geoPaises").append("<article id='geoPaises_" + index + "'><h5></h5><h6></h6></article>")
						$("#geoPaises_" + index + " h5").text(data[index].Country);
						$("#geoPaises_" + index + " h6").text(data[index].Connections);
						/*
						if (index < data.length - 1)
						{
							result2 += '["' + data[index].Country + '", ' +  data[index].Connections + '],';	
						}
						else 
						{
							result2 += '["' + data[index].Country + '", ' + data[index].Connections + ']]';	
						}*/
					}
				);
				//}
				
				data = google.visualization.arrayToDataTable(JSON.parse(result));
				
				var options = {width: (ancho * 0.32)};

			
				var chart = new google.visualization.GeoChart(document.getElementById('Dashboard_geo_div'));
				chart.draw(data, options);
				
				/*
				var data2 = google.visualization.arrayToDataTable(JSON.parse(result2));
				var options = {
				  vAxis: {title: 'Geo Connections',  titleTextStyle: {color: 'red'}},
				  width: (ancho *0.35)
				};

				chart = new google.visualization.BarChart(document.getElementById('Dashboard_geoBar_div'));
				chart.draw(data2, options);
				*/
			}
		,"json");
        
}
function CargarUsuario()
{
	Usuario = JSON.parse(localStorage.UsuarioSimulado)[0];
	$("#lblWelcome span").text(Usuario.NickName);
	$("#lblWelcomeRoll span").text(Usuario.RollName);
	
	$("#txtMyAccount_Name").val(Usuario.Name);
	$("#txtMyAccount_DisplayName").val(Usuario.NickName);
	$("#txtMyAccount_Email").val(Usuario.Email);
	$("#txtMyAccount_Company").val(Usuario.CompanyName);
	$("#txtMyAccount_Facebook").val(Usuario.urlFacebook);
	$("#txtMyAccount_Twitter").val(Usuario.urlTwitter);
	
	$("#tableMyUsers td").remove();
	
	$("#rdsAgrupacion").buttonset();
	CargarPermisos(Usuario.Id);
	CargarUsuariosPropios();
	
	$.post('php/CargarRoles.php',
		{Id_Roll : Usuario.IdInitialRoll},
		function(data)
		   {
			   $("#MyUsersEdit_Permissions_Roll option").remove();
				$.each(data,function(index,value) 
				{
					if (data[index].RollId)
					{
						var tds = "<option value='" + data[index].RollId + "'>" + data[index].RollName + "</option>";
							  
						$("#MyUsersEdit_Permissions_Roll").append(tds);
					}
				});
		   }, "json"	
		);
}
function CerrarSesion()
{
	delete localStorage.UsuarioSimulado;
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






//24 de Enero
function Seccion(obj)
{
	$("#DashBoard").slideUp();
	$("#Users").slideUp();
	$(obj).slideDown();
}
function objPr()
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
	* IdInitialRoll= data[index].IdInitialRoll
	* RollName= data[index].RollName
	* CompanyName= data[index].Company
	* */
	$('#MyUsers_Info_NickName span').text($(this).find('information').attr('DisplayName'));
	$('#MyUsers_Info_Mail span').text($(this).find('information').attr('Mail'));
	$('#MyUsers_Info_Owner span').text($(this).find('information').attr('Owner'));
	$('#MyUsers_Info_Company span').text($(this).find('information').attr('CompanyName'));
	$('#MyUsers_Info_Facebook span').text($(this).find('information').attr('urlFacebook'));
	$('#MyUsers_Info_Twitter span').text($(this).find('information').attr('urlTwitter'));

	$("#btnMyUsers_LoginAsAUser").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_LoginAsAUser").attr('urlFacebook', $(this).find('information').attr('urlFacebook'));
	$("#btnMyUsers_LoginAsAUser").attr('urlTwitter', $(this).find('information').attr('urlTwitter'));
	$("#btnMyUsers_LoginAsAUser").attr('State', $(this).find('information').attr('State'));
	$("#btnMyUsers_LoginAsAUser").attr('IdCompany', $(this).find('information').attr('IdCompany'));
	$("#btnMyUsers_LoginAsAUser").attr('UserName', $(this).find('information').attr('UserName'));
	$("#btnMyUsers_LoginAsAUser").attr('DisplayName', $(this).find('information').attr('DisplayName'));
	$("#btnMyUsers_LoginAsAUser").attr('Mail', $(this).find('information').attr('Mail'));
	$("#btnMyUsers_LoginAsAUser").attr('Owner', $(this).find('information').attr('Owner'));
	$("#btnMyUsers_LoginAsAUser").attr('IdInitialRoll', $(this).find('information').attr('IdInitialRoll'));
	$("#btnMyUsers_LoginAsAUser").attr('RollName', $(this).find('information').attr('RollName'));
		
	$("#btnMyUsers_Edit").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_Edit").attr('urlFacebook', $(this).find('information').attr('urlFacebook'));
	$("#btnMyUsers_Edit").attr('urlTwitter', $(this).find('information').attr('urlTwitter'));
	$("#btnMyUsers_Edit").attr('State', $(this).find('information').attr('State'));
	$("#btnMyUsers_Edit").attr('IdCompany', $(this).find('information').attr('IdCompany'));
	$("#btnMyUsers_Edit").attr('UserName', $(this).find('information').attr('UserName'));
	$("#btnMyUsers_Edit").attr('DisplayName', $(this).find('information').attr('DisplayName'));
	$("#btnMyUsers_Edit").attr('Mail', $(this).find('information').attr('Mail'));
	$("#btnMyUsers_Edit").attr('Owner', $(this).find('information').attr('Owner'));
	$("#btnMyUsers_Edit").attr('IdInitialRoll', $(this).find('information').attr('IdInitialRoll'));
	$("#btnMyUsers_Edit").attr('RollName', $(this).find('information').attr('RollName'));
	
	$("#btnMyUsers_EditPermissions").attr('idUser', $(this).find('information').attr('IdUser'));
	
	$("#btnMyUsers_Delete").attr('idUser', $(this).find('information').attr('IdUser'));
}
function btnCompanyDataCancel_click(evento)
{
	evento.preventDefault();
	$("#CompanyData").slideUp();
	$("#txtCreatingUsersCreate_Facebook").focus();	
}
function btnCompanyDataCreate_click(evento)
{
	evento.preventDefault();
		$.post("php/CrearCompania.php",  
		{
			Name: $("#txtCreatingUsersCreate_Company").val(),
			Url: $("#txtCreatingUsersCreate_CompanyUrl").val(),
			Contact: $("#txtCreatingUsersCreate_CompanyContact").val(),
			IdOwn: Usuario.Id
		}, 
		function(data)
		{	
			data = parseInt(data);
			if (isNaN(data)) 
			{ 
				MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Error!", "The Company was not created");
			}
			else
			{ 
				MostrarAlerta("CreatingUsers_Create", "default", "ui-icon-circle-check", "Hey!", "The Company has been create");
				btnCompanyDataCancel_click(evento)
			} 
		});		
}
function btnMyUsers_Delete_click()
{
	IdUsuario = $(this).attr("idUser");
	$("#tableDeleteMyUsers td").remove()
	$.post("php/VerUsuariosPropios.php",
		{ Id : IdUsuario},
		function(data)
		{
			if (data[0].IdUser)
			{
				$("#tableDeleteMyUsers th").slideDown();
				$.each(data,function(index,value) 
				{
					if (data[index].IdUser)
					{
						var tds = "<tr id='" + data[index].IdUser + "'>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Name + "</td>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].NickName + "</td>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Mail + "</td>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Owner + "</td>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].State + "</td>";
							tds += '</tr>';	
						$("#tableDeleteMyUsers").append(tds);
					}
				});
			}else
			{
				$("#tableDeleteMyUsers th").slideUp();
				var tds = "<tr>";
					  tds += "<td>No Users associate</td>";
					tds += '</tr>';	
				$("#tableDeleteMyUsers").append(tds);
			}
		}, "json");
										
	$("#MyUsers_Delete").dialog({
		autoOpen: false, 				
		minWidth: 620,
		buttons: [
			{
				text: "Delete",
				click: function() { 
										$.post("php/EliminarUsuario.php",
											{ Id : IdUsuario},
											function(data)
											{
												if (parseInt(data) == 0)
												{
													
													MostrarAlerta("MyUsers_DeleteAlert", "error", "ui-icon-alert", "Alert!", "no user has been removed");
													// No hubo ningún Cambio
												}else if (parseInt(data) > 0)
												{
													MostrarAlerta("MyUsers_DeleteAlert", "default", "ui-icon-circle-check", "Hey!", "Users have been eliminated");
													CargarUsuariosPropios();
														//Cambios Correctos
												} else
												{
													MostrarAlerta("MyUsers_DeleteAlert", "error", "ui-icon-alert", "Alert!", "There was an unexpected error");
														//Hubo un error
												}
											});
											$(this).dialog("close"); 
								  }
			},
			{
				text: "Cancel",
				click: function() { $(this).dialog("close"); 
								  }
			}
				  ]
								});
	$("#MyUsers_Delete").dialog('open');	
}
function btnMyUsers_Edit_click()
{	
	ResetearContenedor("MyUsers_Edit");
	var IdUsuario = $(this).attr("idUser");
	var Nombre = $(this).attr("UserName");
	
	var strObj = "Edit " + $(this).attr('UserName');
		$("#MyUsers_Edit").attr("IdUsuario", IdUsuario);
			$("#txtMyUsersEdit_Name").val(Nombre);
			$("#txtMyUsersEdit_DisplayName").val($(this).attr('DisplayName'));
			$("#txtMyUsersEdit_Email").val($(this).attr('Mail'));
			//$("#txtMyUsersEdit_Company").val($(this).attr('IdCompany'));
			$("#txtMyUsersEdit_State").val($(this).attr("State"));
			$("#txtMyUsersEdit_Facebook").val($(this).attr("urlFacebook"));
			$("#txtMyUsersEdit_Twitter").val($(this).attr("urlTwitter"));
			
		$("#MyUsers_Edit").dialog({
				autoOpen: false, 				
				title: "Edit " + Nombre,
				minWidth: 600,
				buttons: [
							{
								text: "Update",
								click: function() { btnMyUsersEditOk_click();
												  }
							},
							{
								text: "Cancel",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
		$("#MyUsers_Edit").dialog('open');
}
function btnMyUsersEditOk_click()
{
	if ($("#txtMyUsersEdit_Password").val() == $("#txtMyUsersEdit_ReTypePassword").val())
	{
		/*if ($("#txtMyAccount_NewPassword").val().length > 5 | $("#txtMyAccount_NewPassword").val()=="")
		{*/
			var dialogo = $('<div></div>')
				  .html("¿Está seguro que desea actualizar los datos?")
				  .dialog({
					autoOpen: false,
					buttons: [
								{
									text: "Update",
									click: function() { 
														var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
														$.post("php/ActualizarDatosUsuario.php",
																{
																	Id : IdUsuario,
																	IdOwn : Usuario.Id,
																	Name :  $("#txtMyUsersEdit_Name").val(),
																	Password : $("#txtMyUsersEdit_Password").val(),
																	State : $("#txtMyUsersEdit_State").val(),
																	NickName : $("#txtMyUsersEdit_DisplayName").val(),
																	Email : $("#txtMyUsersEdit_Email").val(),
																	urlFacebook : $("#txtMyUsersEdit_Facebook").val(),
																	urlTwitter : $("#txtMyUsersEdit_Twitter").val()
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
		/*}
		else
		{
			MostrarAlerta("MyUsersEdit_Message", "error", "ui-icon-alert", "Alert!", "Los carácteres mínimos para la clave son 6");
			$("#txtMyAccount_NewPassword").focus();
		}*/
	} else
	{
		MostrarAlerta("MyUsersEdit_Message", "error", "ui-icon-alert", "Error!", "Las Claves deben coincidir");
		$("#txtMyUsersEdit_Password").focus();
	}
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
		"IdInitialRoll": $(this).attr("IdInitialRoll"),
		"RollName": $(this).attr("RollName")
	}
																) + ']');
	abrirPopup("UserLogin.html");
}
function CambiarRoll()
{
	$("#UserTableFunctions :checkbox").attr('checked', false);

	$.post("php/CargarPermisosRoll.php",
			{IdRoll : $("#MyUsersEdit_Permissions_Roll").val()},
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
										data[index].UserName + "<information  idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRoll='" + data[index].IdInitialRoll + "' RollName='" + data[index].RollName + "' CompanyName='" + data[index].Company + "'></information>",
										data[index].Name,
										data[index].State,
										data[index].RollName
										 /*,
										"<button title='Login as User' id='btnMyUsers_LoginAsAUser' class='ui-button-default ui-button ui-widget ui-corner-all'  idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRoll='" + data[index].IdInitialRoll + "' RollName='" + data[index].RollName + "'><strong><span class='ui-icon ui-icon-play'></span></strong></button>",
										"<button title='Edit' id='btnMyUsers_Edit' class='ui-button-default ui-button ui-widget ui-corner-all' idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRoll='" + data[index].IdInitialRoll + "'><strong><span class='ui-icon ui-icon-pencil'></span></strong></button>",
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
function EditarPermisos(IdUsuario)
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
		title: "Edit Permissions",
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
	
	$.post('php/CargarRoles.php',
		{Id_Roll : Usuario.IdInitialRoll},
		function(data)
		   {
			   $("#MyUsersEdit_Permissions_Roll option").remove();
				$.each(data,function(index,value) 
				{
					if (data[index].RollId)
					{
						var tds = "<option value='" + data[index].RollId + "'>" + data[index].RollName + "</option>";
							  
						$("#MyUsersEdit_Permissions_Roll").append(tds);
					}
				});
		   }, "json"	
		);
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
				urlFacebook: $("#txtCreatingUsersCreate_Facebook").val(),
				urlTwitter: $("#txtCreatingUsersCreate_Twitter").val(),
				IdRoll: 0,
				NoFName: "false"
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
					EditarPermisos(Id);
					MostrarAlerta("CreatingUsers_Create", "default", "ui-icon-circle-check", "Hey!", "The User has been create");
					ResetearContenedor("CreatingUsersCreate");
				} 
			});	
		} else
		{
			MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Error!", "Passwords must be equal");
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

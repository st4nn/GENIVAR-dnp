$(document).on("ready", arranque);
function arranque()
{
	$('#labelWelcome').text('Bienvenido');
	$('#labelWelcomeRoll').text('Rol');
	$('#lblHome').text('Inicio');
	$('#lblReporte').text('Generar Reporte');
	$('#lblBuscarFicha').text('Buscar Ficha');
	$('#lblBuscarContrato').text('Buscar Contrato');
	$('#lblCrearContrato').text('Crear Contrato');
	$('#lblCrearFicha').text('Crear Ficha');
	$('#lblDocumentos').text('Documentos');
	$('#lblUsers').text('Usuarios');
	$('#lblLogout').text('Cerrar Sesión');
	
	$('#SelectedSection h4').text('Inicio');
	
	$('#ConexionesTotales h4').text('Reproducciones Totales');
	$('#IpUnicas h4').text('Usuarios únicos');
	$('#TiempoPromedio h4').text('Tiempo Promedio de Conexion');
	$('#DashboardFechas_ApplicationName').text('Escoge tu servicio');
	$('#DashboardFechas_StreamName').text('Que transmisión deseas evaluar?');
	//$('#DashboardFechas_Rank').text('Rank');
	$('#DashboardFechas_From').text('Desde:');
	$('#DashboardFechas_Until').text('Hasta:');
	
	$('#txtDashboardFechas_From').text($('#DashboardFechas_From').text());
	$('#txtDashboardFechas_Until').text($('#DashboardFechas_Until').text());
	
	$('#Data').text('Datos de los Streams');
	
	
	$('#lblRdbHora').text('Horario');
	$('#lblRdbDia').text('Diario');
	$('#lblRdbMes').text('Mensual');
	
	//$('#').text('');
}

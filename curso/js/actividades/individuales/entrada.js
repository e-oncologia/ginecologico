/*UNA Entrada*/
$(document).ready(function() {

	if(seguimiento<=pag_actual){
		bloqueaSiguiente();
	}


	/*Cerrar feedbacks*/
	$('.cerrar-feed').click(function() {
		$(this).closest('.feed-actividad').hide();
		$(this).closest('.relativo-actividad').find('.pregunta-actividad,.pregunta-global,.comprobar').show();
	});

	$(".pregunta-actividad .form-control" ).keyup(function() {
		var entorno_actividad = $(this).closest('.actividad');
		$(entorno_actividad).find('.btn-actividad').removeAttr('disabled');
	});

	/*Comprobar actividad*/
	$('.entrada .btn-actividad').click(function(event) {
		event.stopPropagation();
		var entorno_actividad = $(this).closest('.actividad');
		var respuesta_input = $(entorno_actividad).find('.zona-entrada input').data('solucion');
		var valor_input = $(entorno_actividad).find('.zona-entrada input').val();
		valor_input = valor_input.toLowerCase();

		if (valor_input == respuesta_input) {
			$(entorno_actividad).find('.feedok').show();
		}
		else{
			$(entorno_actividad).find('.feedko').show();
			//$(entorno_actividad).find('.zona-entrada input').val('');
		}
		$(entorno_actividad).find('.pregunta-actividad,.pregunta-global,.comprobar').hide();
		//subirTop(0);
		activaSiguiente();
		
	});

});
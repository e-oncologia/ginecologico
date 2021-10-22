/*VERDADERO FALSO*/
$(document).ready(function() {

	if(seguimiento<=pag_actual){
		bloqueaSiguiente();
	}


	/*Cerrar feedbacks*/
	$('.cerrar-feed').click(function() {
		$(this).closest('.feed-actividad').hide();
		$(this).closest('.relativo-actividad').find('.pregunta-actividad,.pregunta-global,.comprobar').show();
	});

	/*Narcar opción*/
	$('.verdaderoFalso .respuesta .tipovf').click(function(event) {
		event.stopPropagation();
		var entorno_actividad = $(this).closest('.actividad');
		var entorno_check = $(this).find('.icono-check');
		if ($(entorno_check).hasClass('marcada')) return false;
		else {
			$(entorno_actividad).find('.icono-check').each(function() {
				$(this).removeClass('marcada')
			});
			$(entorno_check).addClass('marcada');
			$(entorno_actividad).find('.btn-actividad').removeAttr('disabled');
		}
	});

	/*Comprobar actividad*/
	$('.verdaderoFalso .btn-actividad').click(function(event) {
		event.stopPropagation();
		var entorno_actividad = $(this).closest('.actividad');
		var correcto;
		if ($(entorno_actividad).find('.tipovf.correcta .icono-check').hasClass('marcada')) {
			correcto = true;
		}
		else{correcto = false;}
		if (correcto) $(entorno_actividad).find('.feedok').show();
		else $(entorno_actividad).find('.feedko').show();
		$(entorno_actividad).find('.pregunta-actividad,.pregunta-global,.comprobar').hide();
		//subirTop(0);
		activaSiguiente();

		/*Reset actividad*/
		/*$(entorno_actividad).find('.icono-check').removeClass('marcada');
		$(entorno_actividad).find('.btn-actividad').attr("disabled", "disabled");*/

	});



});
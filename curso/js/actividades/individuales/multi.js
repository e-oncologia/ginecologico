/*UNA RESPUESTA*/
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
	$('.multi .respuesta').click(function(event) {
		event.stopPropagation();
		var entorno_actividad = $(this).closest('.actividad');
		var entorno_check = $(this).find('.icono-check');
		if ($(entorno_check).hasClass('marcada')){
			$(entorno_check).removeClass('marcada');
			$(entorno_check).closest('.respuesta').removeClass('marcada');
		}
		else {
			$(entorno_check).addClass('marcada');
			$(entorno_check).closest('.respuesta').addClass('marcada')
			$(entorno_actividad).find('.btn-actividad').removeAttr('disabled');
		}
		$(this).closest('.actividad').find('.btn-actividad').removeAttr('disabled');

	});

	/*Comprobar actividad*/
	$('.multi .btn-actividad').click(function(event) {
		event.stopPropagation();
		var entorno_actividad = $(this).closest('.actividad');
		/*Miramos cuantas correctas existen*/
		var ncorrecta=$(entorno_actividad).find('.respuesta.correcta').length;
		var contador_marcadas_ok=0;
		var correcto=true;

		$(entorno_actividad).find('.respuesta.marcada').each(function(){
			if(!$(this).hasClass('correcta'))
				{
					correcto=false;
					return false;
				}
				else{
					contador_marcadas_ok++;
				}

		});


		if (correcto && (contador_marcadas_ok==ncorrecta)) $(entorno_actividad).find('.feedok').show();
		else $(entorno_actividad).find('.feedko').show();
		$(entorno_actividad).find('.pregunta-actividad,.pregunta-global,.comprobar').hide();
		//subirTop(0);
		activaSiguiente();

		/*Reset actividad*/
		/*$(entorno_actividad).find('.icono-check').removeClass('marcada');
		$(entorno_actividad).find('.btn-actividad').attr("disabled", "disabled");*/

	});



});
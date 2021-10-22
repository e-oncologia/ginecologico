/*ACTIVIDAD TEST*/
$(document).ready(function() {

	var repetir=false;
	if(seguimiento<=pag_actual){
		//repetir=true;
	}


	if(!repetir){
		//bloqueaSiguiente();
		var num_preguntas=$('.test-feed .actividad').length;

		/*Cerrar feedbacks*/
		$('.cerrar-feed').click(function(event) {
			event.stopPropagation();
			$(this).closest('.feed-actividad').hide();
			var e_actividad = $(this).closest('.actividad');
			n_pregunta=$(this).closest('.actividad').data('numero-actividad');
			if(n_pregunta!=num_preguntas){
				$(e_actividad).hide();
				$(".actividad[data-numero-actividad='" + (n_pregunta+1) + "']").show();
			}
			else{
				$(e_actividad).find('.respuesta').unbind( "click" );
				$(e_actividad).find('.btn-actividad').attr( "disabled", "disabled" );
				activaSiguiente();
				fin_demo=true;
				$('#modalfincurso').modal('show');
			}
		});

		$('.test-feed .actividad .respuesta').click(function(event) {
			event.stopPropagation();
			var entorno_actividad = $(this).closest('.actividad');
			var entorno_check = $(this).find('.icono-check');
			if ($(entorno_check).hasClass('marcada')) return false;
			else {
				$(entorno_actividad).find('.icono-check').each(function() {
					$(this).removeClass('marcada');
					$(this).closest('.respuesta').removeClass('marcada');
				});
				$(entorno_check).addClass('marcada');
				$(entorno_check).closest('.respuesta').addClass('marcada')
				$(entorno_actividad).find('.btn-actividad').removeAttr('disabled');
			}
		});


		$('.test-feed .actividad .btn-actividad').click(function(event) {
			event.stopPropagation();
			var entorno_actividad = $(this).closest('.actividad');
			var correcto;
			if ($(entorno_actividad).find('.respuesta.correcta .icono-check').hasClass('marcada')) {
				correcto = true;

			}
			if (correcto) $(entorno_actividad).find('.feedok').show();
			else $(entorno_actividad).find('.feedko').show();
			$(entorno_actividad).find('.pregunta-actividad').hide();
		});
	}
	else{
		/*$( ".actividad" ).first().fadeTo( "slow" , 0.7, function() {});*/
	}

});
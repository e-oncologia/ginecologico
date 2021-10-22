/*ACTIVIDAD TEST*/
$(document).ready(function() {

	var repetir=false;
	if(seguimiento<=pag_actual){
		//repetir=true;
	}


	if(!repetir){
		//bloqueaSiguiente();
		var num_preguntas=$('.test .actividad').length;

		/*Cerrar feedbacks*/
		$('.cerrar-feed').click(function() {
			$(this).closest('.feed-actividad').hide();
		});

		$('.test .actividad .respuesta').click(function(event) {
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


		$('.test .actividad .btn-actividad').click(function(event) {
			event.stopPropagation();
			var e_actividad = $(this).closest('.actividad');
			n_pregunta=$(this).closest('.actividad').data('numero-actividad');
			if(n_pregunta!=num_preguntas){
				$(e_actividad).hide();
				$(".actividad[data-numero-actividad='" + (n_pregunta+1) + "']").show();
			}
			else{
				$(this).closest('.comprobar').hide();
				$('.test .actividad .respuesta').unbind( "click" );
				activaSiguiente();
				$('#modaltesinicial').modal('show');
			}

		});
	}
	else{
		/*$( ".actividad" ).first().fadeTo( "slow" , 0.7, function() {});*/
	}

});
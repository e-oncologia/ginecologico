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

		$('.combo-in .btn-actividad').click(function(event) {
		event.stopPropagation();
		var entorno_actividad=$(this).closest('.actividad');

		if($(entorno_actividad).find('.combo option:selected').attr('data-correcto')){
			entorno_actividad.find('.feedok').show();
			}
		else{
			entorno_actividad.find('.feedko').show();
		}
		//subirTop(0);
		$(entorno_actividad).find('.pregunta-actividad,.pregunta-global,.comprobar').hide();
		activaSiguiente();

	});

		$( ".combo" ).selectmenu();
		/*Elimino el selecciona*/
		$(".combo option[value='selecciona']").remove();

		/*comprobar si se han seleccionado todos los elementos*/
		$( ".combo" ).on( "selectmenuselect", function(){
			$(this).closest('.actividad').find('.btn-actividad').removeAttr('disabled');
		});

	});

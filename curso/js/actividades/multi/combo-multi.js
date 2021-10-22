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

	$('.combo-multi .btn-actividad').click(function(event) {
		var ncombos=$('.combo').length;
		correcta=0;
		event.stopPropagation();
		var entorno_actividad=$(this).closest('.actividad');
		entorno_actividad.find('.combo').each(function(){
			if($(this).find('option:selected').attr('data-correcto')){
				correcta++;
			}
		});
		if(correcta==ncombos){
			entorno_actividad.find('.feedok').show();
			activaSiguiente();
		}
		else{
			entorno_actividad.find('.feedko').show();
		}
		$(entorno_actividad).find('.pregunta-actividad,.pregunta-global,.comprobar').hide();
		//subirTop(0);
		activaSiguiente();

	});

	$( ".combo" ).selectmenu();
	/*Elimino el selecciona*/
	$(".combo option[value='selecciona']").remove();

	/*comprobar si se han seleccionado todos los elementos*/
	$( ".combo" ).on( "selectmenuselect", function(){
		var ncombos=0;
		$('.ui-selectmenu-text').each(function(){
			if($(this).text()=='Selecciona'){
				ncombos++;
			}

		});
		if(ncombos==0){
			$(this).closest('.actividad').find('.btn-actividad').removeAttr('disabled');
		}

	});

});

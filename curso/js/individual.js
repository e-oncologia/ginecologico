$(document).ready(function() {

	asignarFondo();

	/*if (isMobile.any()) {
		imagenesMobile();
	}*/

	/*Clonación de modales y carga de puntos clave*/
	cloneModals();
	cargarClave();
	
	$('.carousel').each(function() {
		$(this).carousel({
			interval: false
		});
	});
	//$('.selectpicker').selectpicker();
	$('[data-toggle="popover"]').popover();
	

	/*PORTADA*/
	$('#inico-btn').click(function(){
		$('.boton-derecho').click();
	});

	/*ACORDEON*/
	$('.panel-group.acordeon .panel-heading a').click(function() {
		var id_zona = $(this).closest('.panel-heading').attr('id');
		$(this).closest('.panel-group.acordeon').find('.panel-heading').each(function() {
			if ($(this).attr('id') != id_zona) {
				$(this).removeClass('activo');
				$(this).find('.acordeon-icono').removeClass('on');
			}
		});
		if ($(this).closest('.panel-heading').hasClass('activo')) {
			$(this).closest('.panel-heading').removeClass('activo');
			$(this).closest('.panel-heading').find('.acordeon-icono').removeClass('on');
		} else {
			$(this).closest('.panel-heading').addClass('activo');
			$(this).closest('.panel-heading').find('.acordeon-icono').addClass('on');
		}
	});

	/*TABLAS DINÁMICAS*/
	$('.botones-caja button').click(function() {
		if (!$(this).hasClass('boton_activo')) {
			var caja = $(this).closest('.botones-caja');
			var id_boton = $(this).data('boton-caja');
			$(caja).find('button').each(function() {
				$(this).removeClass('boton_activo');
			});
			$(caja).find('.botones-caja-contenido').each(function() {
				$(this).hide();
			});
			$(caja).find(".botones-caja-contenido[data-boton-contenido='" + id_boton + "']").show();
			$(this).addClass('boton_activo');
		} else return false;
	});

	/*FLIPS*/
	$('.opcionFlip').click(function() {
		var elem = $(this);
		if (elem.data('flipped')) {
			elem.revertFlip();
			elem.data('flipped', false);
			elem.find('.opcionDescription').hide();
		} else {
			elem.flip({
				direction: 'lr',
				speed: 250,
				color: '#F2F2F2',
				onBefore: function() {
					elem.html(elem.siblings('.opcionData').html());
				},
				onEnd: function() {
					elem.find('.opcionDescription').show();
				}
			});
			elem.data('flipped', true);
		}
	});

	/*Imagenes iphone*/
	/*$('.imgiphone').click(function() {
		var src=$(this).attr( 'src' );
		var img='<img src="'+src+'" alt="Imagen ampliada" class="img-center">'
		$('#modalimgAmpliada .modal-inside-body').empty().append(img);
	});*/

});

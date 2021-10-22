$(document).ready(function() {
    //evaluacionIE();
	
	/*Añadir estilos a IPAD para solucionar bug modal ZOOM*/
	if (isMobile.iOS()) {
		$("<style type='text/css'> body {padding-right: 0px !important} .modal-open {overflow-y: auto;} </style>").appendTo("head");
	}

    /*Evaluamos dispositivo si estamos en servidor*/
    if (tipo == 'servidor') {
        evaluacionDispositivo()
        $('#pagina_actual').hide();
    }

    /*Ajustamos tamaños de los dropdowns*/
    ajustarDropdowns();
    /*crearModalimagen();
    bugiosModales();*/

    /*MENU*/
    /*Desplegables*/
    $('body').on('click', '.navbar-left li.dropdown2>a', function(event) {
        
        event.stopPropagation();
        var id = $(this).closest('li').data('drop');
        if ($(this).closest('li').find('.subdropdown').is(":visible")) {
            $(this).parent().find('.subdropdown').hide();
            return false;
        } else {
            $(this).parent().find('.subdropdown').show();
            return false;
        }
    });

    /*Ir a destino*/
    $('body').on('click', '.navbar-left li[data-destino]', function(event) {
        event.stopPropagation();
        if (!$(this).hasClass('visto')) return false;
        else if ($(this).find('ul').length) return false;
        else {
            if (typeof ayuda != "undefined") {
                ayuda.end();
            }
            pag_actual = $(this).data('destino');
            var drop_cercano = $(this).closest('.dropdown');
            cerrarMenu(drop_cercano);
            navegacion();
            return false;
        }
    });

    /*NAVEGACIÓN*/
    $('body').on('click', '.boton-izquierdo', function(event) {
        if (pag_actual > 1) {
            pag_actual--;
            navegacion();
        }
    });

    $('body').on('click', '.boton-derecho', function(event) {
        if ((pag_actual < total_pag) && pasa_pagina) {
            pag_actual++;
            navegacion();
        }
    });

    /*DROPDOWN*/
    $('nav .dropdown').on('hide.bs.dropdown', function(evento) {
        evento.stopPropagation();
        //$('nav .subdropdown').slideUp();
        $('nav .subdropdown').slideDown();
    });

    /*EVENTOS*/
    $('#menu-superior').on('show.bs.dropdown', function() {
        actualizarIndice();
    });

    $('body').on('show.bs.modal', '.modal', function() {
        centerModals();
    });

    /*PUNTOS CLAVE*/
    $('body').on('click', '.zona-clave.clave-ok .puntos-clave, .zona-clave.clave-ok .icono-clave', function() {
        $('.clave-contenido').slideToggle(1000, function() {});
    });

    $('body').on('click', '.pagina-clave .cerra-clave', function() {
        $('.clave-contenido').slideUp(1000, function() {});
    });

    /*CARRUSEL*/
    $('body').on('slid.bs.carousel', '.carousel', function() {
        var entornoCarrusel = $(this).closest('.bloque-carrusel');
        var slideActiva = $(entornoCarrusel).find('.carousel-indicators li.active').data('slide-to');
        if ($(entornoCarrusel).find(".carrusel-texto-contenido[data-slide-carrusel='" + slideActiva + "']").hasClass('carrusel-on')) {
            return false;
        } else {
            $(entornoCarrusel).find(".carrusel-texto-contenido.carrusel-on").hide();
            $(entornoCarrusel).find(".carrusel-texto-contenido.carrusel-on").removeClass('carrusel-on');
            $(entornoCarrusel).find(".carrusel-texto-contenido[data-slide-carrusel='" + slideActiva + "']").show();
            $(entornoCarrusel).find(".carrusel-texto-contenido[data-slide-carrusel='" + slideActiva + "']").addClass('carrusel-on');
        }
    });

    /*Ayuda*/
    var ayuda = new Tour({
        backdrop: false,
        /*onEnd: function (tour) {$('html, body').animate({scrollTop : 0},'slow');},*/
        template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-default' data-role='prev'>« Prev</button><span data-role='separator'></span><button class='btn btn-default' data-role='next'>Sig »</button><button class='btn btn-default' data-role='end'>Fin</button></div></div>"
    });

    ayuda.addSteps([{
        element: "#menu-indice",
        title: "Botón Índice",
        content: "Muestra las unidades y apartados del curso, señalando aquellos contenidos que ya has visitado.",
        placement: "bottom"
    }, {
        element: "#progreso-header",
        title: "Barra de avance",
        content: "Indica el porcentaje del curso ya visitado.",
        placement: "bottom"
    }, {
        element: "#menu-recursos",
        title: "Botón Recursos",
        content: "Muestra una serie de materiales complementarios al curso que te permitirán reforzar y ampliar tus conocimientos.",
        placement: "bottom"
    }, {
        element: ".zona-clave",
        title: "Objetivos",
        content: "Recuerda los objetivos de aprendizaje en cualquier momento del curso.",
        placement: "bottom"
    }, {
        element: ".boton-izquierdo",
        title: "Flecha Retroceso",
        content: "Permite regresar a los apartados ya visitados del curso.",
        placement: "top"
    }, {
        element: ".boton-derecho",
        title: "Flecha Avance",
        content: "Permite avanzar a los apartados aún sin visitar del curso.",
        placement: "top"
    }]);
    ayuda.init();

    $('.ayuda-link').click(function(event) {
        event.stopPropagation();
        if ($(window).width() > 768 && !isMobile.any()) {
            ayuda.end();
            ayuda.restart();
            return false;
        } else {
            $('.navbar-collapse').collapse('hide');
            $('#modalayuda').modal('show');
            return false;
        }
    });

    /*Window resize*/
    $(window).on('resize', function() {
        ajustarDropdowns();
        /*if (typeof ayuda != "undefined") {
        	ayuda.end();
        }*/
        /*Miramos si el menú esta desplegado para cerrarlo*/
        $('#menu-indice.dropdown.open .dropdown-toggle').dropdown('toggle');
    });

    /*Evento cerrar modal test*/
    /*$('body').on('hidden.bs.modal', '#modaltesinicial', function() {
    	$('.boton-derecho').click();
    });*/

    window.onbeforeunload = function(e) {
        if (inicioSesion != 0) {
            var currentDate = new Date().getTime();
            var elapsedSeconds = ((currentDate - inicioSesion) / 1000);
            var formattedTime = convertTotalSeconds(elapsedSeconds);
        } else {
            formattedTime = "00:00:00.0";
        }
        if (tipo == "servidor") {
            doLMSSetValue("cmi.core.session_time", formattedTime);
            doLMSCommit();
            doLMSFinish();
        }
    };

    $(window).unload(function() {
        if (isMobile.any()) {
            if (inicioSesion != 0) {
                var currentDate = new Date().getTime();
                var elapsedSeconds = ((currentDate - inicioSesion) / 1000);
                var formattedTime = convertTotalSeconds(elapsedSeconds);
            } else {
                formattedTime = "00:00:00.0";
            }
            if (tipo == "servidor") {
                doLMSSetValue("cmi.core.session_time", formattedTime);
                doLMSCommit();
                doLMSFinish();
            }
        }
    });

});
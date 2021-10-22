function iniciarcurso() {
    pag_actual=seguimiento;
    actualizarBarra();
    navegacion();
}

function navegacion() {
	actualizar();
	activaSiguiente();

    $('#contenido-cargado').load('unidades/p' + pag_actual + '.html', function() {
        subirTop(300);
        $('#pagina_actual').text(pag_actual+"-"+total_pag);
    }); 
}

/*Función para subir el contenido*/
function subirTop(tiempoTran){
    if ($('body').hasClass('ios')) {
            //console.log('Estoy en IOS');
            var posicion = $('#contenido-cargado').position();
            //console.log('Posicion x: '+ posicion.left+' Posicion y: '+posicion.top);
            $('#externo').animate({
                scrollTop: 0
            }, tiempoTran);
        } else $('html, body').animate({
            scrollTop: 0
        }, tiempoTran);
    }

    function actualizar() {
	//console.log('Actualizar');
    if (pag_actual > 0) {
        $('#navegacion').fadeIn();
    } else {
        $('#navegacion').fadeOut();
    }
    if (pag_actual == 1) {
        $('#navegacion .boton-izquierdo').fadeOut();
    } else if (pag_actual == total_pag) {
        $('#navegacion .boton-derecho').fadeOut();
    } else {
        $('#navegacion .boton-derecho, #navegacion .boton-izquierdo').fadeIn();
    }

    /*Avance del curso*/
    if ((pag_actual >= seguimiento) || (pag_actual == total_pag)) {
        seguimiento = pag_actual;
        actualizarBarra();
        if (tipo == 'servidor') {
            actualizaSeguimientoScorm();
            actualizaProgreso(Math.floor((100 * seguimiento) / total_pag));
            //actualizaFin("incomplete");
        }
    }
    if (pag_actual >= total_pag && pag_actual != 0) {
        if (tipo == 'servidor') {
            actualizaFin("completed");
            actualizaProgreso(100);
        }
    }
}

function actualizarIndice() {
    $(".nav li").each(function(index) {
        id_menu = $(this).data('destino');
        if (seguimiento >= id_menu) {
            $(this).addClass('visto');
        }
        $('.nav li.dropdown2').each(function(index) {
            id_drop = $(this).data('drop');
            if (seguimiento >= id_drop) {
                $(this).addClass('visto');
            }
        });
    });
}

function actualizarBarra() {
    var progreso_header = 100 * (seguimiento / total_pag);
    $('#progreso-header-completo').animate({
        width: progreso_header + '%'
    }, 1000);
}

function cargarClave() {
    if ($('.clave-contenido').length) {
        var clave;
        clave = $('.clave-contenido').data("clave");
        $('.clave-contenido').load('unidades/clave/clave_' + clave + '.html');
    }
}

function cloneModals() {
    if ($('#contenido-cargado .modal').length) {
        //console.log('Tenemos modales');
        $("#contenido-cargado .modal").each(function() {
            var id = $(this).attr('id');
            //console.log('ID del modal: '+id);
            if (!$('#all-modals #' + id).length) {
                $("#contenido-cargado #" + id).clone().appendTo("#all-modals");
                $("#contenido-cargado #" + id).remove();
                //console.log('El modal de: '+id+ ' NO existe y lo meto en el index y lo elimino de la página'); 
            } else {
                $("#contenido-cargado #" + id).remove();
                //console.log('El modal de: '+id+ ' ya existe en el index y lo elimino de la página');  
            }

        });
    }
}

function bloqueaSiguiente() {
	//console.log('Bloquea siguiente');
    pasa_pagina = false;
    if (pag_actual == total_pag) $('.boton-derecho').hide();
    else $('.boton-derecho').fadeTo(0, 0.4, function() {});
}

function activaSiguiente() {
	//console.log('Activa siguiente');
    pasa_pagina = true;
    if (pag_actual == total_pag) $('.boton-derecho').hide();
    else $('.boton-derecho').fadeTo("slow", 1, function() {});
}

function cerrarMenu(drop){
    var ancho=$(window).width();
    if(ancho<768){
        $('.navbar-collapse').collapse('hide');
    }
    else{
        $(drop).find('.dropdown-toggle').dropdown('toggle');
    }
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iIphone: function() {
        return navigator.userAgent.match(/iPad/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function evaluacionDispositivo() {
    /*Añadido para detectar navegador nativo android*/
    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
    /*Miramos si en navegador nativo android o IOS*/
    if (isMobile.iOS() || is_android) {
        $('body').addClass('ios');
        $('.cabecera .navbar').removeClass('navbar-fixed-top');
    }
}

function centerModals() {
    $('.modalmediano').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}

function ajustarDropdowns() {
    var alto = $(window).height();
    var ancho = $(window).width();
    if (ancho > 767) {
        $('.dropdown-menu').css('max-height', (alto - 100) + 'px');
    }
}

/*function evaluacionIE(){
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 9 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ie10-11.css') );
    }
}*/


/*Función pasar segundos*/

function convertTotalSeconds(ts) {
    var sec = (ts % 60);

    ts -= sec;
    var tmp = (ts % 3600); //# of seconds in the total # of minutes
    ts -= tmp; //# of seconds in the total # of hours

    // convert seconds to conform to CMITimespan type (e.g. SS.00)
    sec = Math.round(sec * 100) / 100;

    var strSec = new String(sec);
    var strWholeSec = strSec;
    var strFractionSec = "";

    if (strSec.indexOf(".") != -1) {
        strWholeSec = strSec.substring(0, strSec.indexOf("."));
        strFractionSec = strSec.substring(strSec.indexOf(".") + 1, strSec.length);
    }

    if (strWholeSec.length < 2) {
        strWholeSec = "0" + strWholeSec;
    }
    strSec = strWholeSec;

    if (strFractionSec.length) {
        strSec = strSec + "." + strFractionSec;
    }


    if ((ts % 3600) != 0)
        var hour = 0;
    else var hour = (ts / 3600);
    if ((tmp % 60) != 0)
        var min = 0;
    else var min = (tmp / 60);

    if ((new String(hour)).length < 2)
        hour = "0" + hour;
    if ((new String(min)).length < 2)
        min = "0" + min;

    var rtnVal = hour + ":" + min + ":" + strSec;

    return rtnVal;
}


function asignarFondo(){
    if ( $( ".radio_en" ).length ) {
        $('.background').removeClass('fondo1 fondo3').addClass('fondo2');
    }
    else if($( ".bloque-video" ).length ){
        $('.background').removeClass('fondo1 fondo2').addClass('fondo3');
    }
    else{
        $('.background').removeClass('fondo2 fondo3').addClass('fondo1');
    }
}

/*function imagenesMobile(){
    $('#contenido-cargado').find('.img-responsive').each(function(){
        if(!$(this).parent().hasClass('caja-lupa') && !$(".portada").length){
            $(this).attr("data-target","#modalimgAmpliada");
            $(this).attr("data-toggle","modal");
            $(this).addClass('imgiphone');
        }
    });
}

function crearModalimagen(){
    var modal_imagen =' <div class="modal fade modalgrande" id="modalimgAmpliada" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <div class="row"> <div class="col-sm-6 pull-right"> <div class="cerra-modal" data-dismiss="modal"></div> </div> </div> <div class="modal-inside-body"></div> </div> </div> </div> </div>';
    $('#all-modals').append(modal_imagen);
}

function bugiosModales(){
    if(isMobile.any()){
      document.querySelector('meta[name=viewport]')
      .setAttribute(
          'content', 
          'initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no'
          );
  }
}*/
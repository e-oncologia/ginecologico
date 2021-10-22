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
    /*Añadido para detectar android*/
    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
    /*Miramos si en navegador nativo android o IOS*/
    if (isMobile.iOS() || is_android) {
        $('body').addClass('ios');
        $('.cabecera .navbar').removeClass('navbar-fixed-top');
    }

}

function centerModals() {
    $('.modal').each(function(i) {
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
    if (ancho > 768) {
        $('.dropdown-menu').css('max-height', (alto - 100) + 'px');
    }
}

function evaluacionIE(){
    /*Cargar css si es IE*/
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 9 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        alert('hola');
        $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ie10-11.css') );
    }
}

$(window).scroll(function() {
    /*Comentado puntualmente para una maqueta*/

    /*if (!isMobile.any()) {
        var pos1 = 7000;
        var pos2 = 17000;
        var scrolledFromtop = $(window).scrollTop();
        if (scrolledFromtop > pos1 && scrolledFromtop < pos2) {
            $('.fondo1,.fondo3').fadeOut('slow');
            $('.fondo2').fadeIn('slow');
        } else if (scrolledFromtop > pos2) {
            $('.fondo1,.fondo2').fadeOut('slow');
            $('.fondo3').fadeIn('slow');
        } else {
            $('.fondo2,.fondo3').fadeOut('slow');
            $('.fondo1').fadeIn('slow');
        }
    }*/
});
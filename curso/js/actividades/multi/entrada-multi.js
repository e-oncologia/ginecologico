/*UNA RESPUESTA*/
$(document).ready(function() {

    if (seguimiento <= pag_actual) {
        bloqueaSiguiente();
    }


    /*Cerrar feedbacks*/
    $('.cerrar-feed').click(function() {
        $(this).closest('.feed-actividad').hide();
        $(this).closest('.relativo-actividad').find('.pregunta-actividad,.pregunta-global,.comprobar').show();

    });

    $.each($(".entrada-multi .form-control"), function() {
        solucion = $(this).attr("data-solucion");
        solucionLength = solucion.length;
        $(this).attr({
            "size": solucionLength + 1,
            "maxlength": solucionLength
        });
    });


    $(".entrada-multi .form-control").keyup(function() {
        var entorno_actividad = $(this).closest('.actividad');
        //Miramos si el resto de inputs están completos.
        var input_completos = false;
        $(entorno_actividad).find('.form-control').each(function() {
            if ($(this).val() == '') {
                input_completos = false;
                return false;
            } else {
                input_completos = true;
            }
        });
        if (input_completos) {
            $(entorno_actividad).find('.btn-actividad').removeAttr('disabled');
        }
    });

    /*Comprobar actividad*/
    $('.entrada-multi .btn-actividad').click(function(event) {
        var entorno_actividad = $(this).closest('.actividad');
        event.stopPropagation();
        var aciertosUsuario = 0;
        var aciertosTotales = $(entorno_actividad).find(".form-control").length;
        var completado = false;
        $(entorno_actividad).find(".form-control").each(function() {
            solucion = $(this).attr("data-solucion").toLowerCase();
            solucionLength = solucion.length;
            rellenado = $(this).val().toLowerCase();

            if (solucion === rellenado) {
                aciertosUsuario++;
                /*$(this)
                    .removeClass()
                    .addClass('input-rellena acierto')
                    .attr('disabled', 'disabled')*/
            } else {
                /*$(this).removeClass().addClass('input-rellena error');*/
            }
        });

        if (aciertosUsuario == aciertosTotales) {
            $(entorno_actividad).find('.feedok').show();
            
 
        } else {
            $(entorno_actividad).find('.feedko').show();
        }
        $(entorno_actividad).find('.pregunta-actividad,.pregunta-global,.comprobar').hide();
        //subirTop(0);
        activaSiguiente();

    });

});
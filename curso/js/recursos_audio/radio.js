/*Radio*/
$(document).ready(function() {

	$('audio').mediaelementplayer();
	$('.boton-player-radio').click(function(e){
		e.preventDefault();
		var entorno = $(this).closest('.player-radio-micro');
		var player = document.getElementById('audio_player_view');

		player.onended = function() {
			$(entorno).removeClass('playing');
			$(entorno).addClass('paused');
			$(entorno).find('.play').removeClass('hide');
			$(entorno).find('.pause').addClass('hide');
		};

		if (!$(entorno).hasClass('playing')) {
			$(entorno).addClass('playing');
			$(entorno).find('.play').addClass('hide');
			$(entorno).find('.pause').removeClass('hide');
			player.play();

		}
		else{
			$(entorno).removeClass('playing');
			$(entorno).addClass('paused');
			$(entorno).find('.play').removeClass('hide');
			$(entorno).find('.pause').addClass('hide');
			player.pause();
		}
	});


});
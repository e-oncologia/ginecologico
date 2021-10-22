$(document).ready(function() {

	$('.player-podcast>a').click(function(e){
		e.preventDefault();
		var entorno = $(this).closest('.player-podcast');
		var audio_src = $(entorno).data('audio');
		var player = document.getElementById('player_home');

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

			if ($(entorno).hasClass('paused')){
				player.play();
				$(entorno).removeClass('paused');
			}
			else{
				$(entorno).removeClass('paused');
				player.src=audio_src;
				player.load();
				player.play();
			}
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
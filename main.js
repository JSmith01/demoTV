var videos = [
          	'http://media.w3.org/2010/05/bunny/movie.mp4',
          	'http://217.19.222.11:8015/001/1507613200',
          	'http://media.w3.org/2010/05/sintel/trailer.mp4'
          	];

var currentVideo = 0;

window.onload = function() {
	var logEl = document.getElementById('log');
	
	function log() {
		var text = Array.prototype.slice.call(arguments, 0).join('');
		if (logEl.hasChildNodes() && logEl.childNodes.length > 100) {
			logEl.removeChild(logEl.childNodes[0]);
		}
		var newNode = document.createElement('div');
		newNode.innerText = text;
		logEl.appendChild(newNode);
		if (logEl.scrollHeight > logEl.clientHeight) {
			logEl.scrollTop = logEl.scrollHeight - logEl.clientHeight;
		}
		console.log.apply(console, arguments);
	}
	
	var video = document.getElementById('v');
	
	function videoToggle() {
		if (video.ended) {
			video.currentTime = 0;
			video.play();
		} else if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}
	
	function beginVideo(url) {
		log('Start url: ' + url);
		video.src = url;
		video.load();
	}

	video.addEventListener('loadeddata', function() { log('Video loaded.'); });
	
	video.addEventListener('stalled', function() { log('Video stalled.'); });
	
	video.addEventListener('error', function(e) { log('error code: ' + video.error.code); });
	
	document.addEventListener('keydown', function(e) {
		var key = e.keyCode;
		log('Key pressed: ', key);
		switch(key) {
		case 13:
			videoToggle();
			break;
		case 38:
			currentVideo = currentVideo === 0 ? videos.length - 1 : currentVideo - 1;
			beginVideo(videos[currentVideo]);
			break;
		case 40:
			currentVideo = currentVideo === videos.length - 1 ? 0 : currentVideo + 1;
			beginVideo(videos[currentVideo]);
			break;
		case 10009:
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			
		}
	});
	
	beginVideo(videos[0]);
}
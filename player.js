(function($){


	$.fn.musicPlayer = function(songs, useroptions){
		return this.each(function(){
			var defaultOptions = {
				autoplay: false,
				errorMsg: "Bull og vittleysa"
			}
			var realOptions = $.extend(defaultOptions, useroptions);
			realOptions.autoplay = true;
			var songNumber=0;
			
			//Javascript býr til  html code
			var audio = document.createElement('audio');
			audio.setAttribute('id', 'gudni');
			
			var playerContainer = document.createElement ('div');
			playerContainer.setAttribute ('id', 'playerContainer');
			document.getElementById ('thePlayer') .appendChild (playerContainer);
			
			var UL = document.createElement ('ul');
			playerContainer.appendChild (UL);

			//play takkinn
			var LI1 = document.createElement ('li');
			UL.appendChild (LI1);
			var a1 = document.createElement ('a');
			a1.setAttribute ('href', "#");
			a1.setAttribute ('class', "play");
			LI1.appendChild (a1);

			//Stop takkinn
			var LI2 = document.createElement ('li');
			UL.appendChild (LI2);
			var a2 = document.createElement ('a');
			a2.setAttribute ('href', "#");
			a2.setAttribute ('class', "stop");
			LI2.appendChild (a2);

			//pause takkinn
			var LI3 = document.createElement ('li');
			UL.appendChild (LI3);
			var a3 = document.createElement ('a');
			a3.setAttribute ('href', "#");
			a3.setAttribute ('class', "pause");
			LI3.appendChild (a3);

			//prev takkinn
			var LI4 = document.createElement ('li');
			UL.appendChild (LI4);
			var a4 = document.createElement ('a');
			a4.setAttribute ('href', "#");
			a4.setAttribute ('class', "prev");
			LI4.appendChild (a4);

			//Next takkinn
			var LI5 = document.createElement ('li');
			UL.appendChild (LI5);
			var a5 = document.createElement ('a');
			a5.setAttribute ('href', "#");
			a5.setAttribute ('class', "next");
			LI5.appendChild (a5);

			//Progress bar
			
			var progressBarContainer = document.createElement ('div');
			progressBarContainer.setAttribute ('id', 'progressBarContainer');
			//document.getElementById ('thePlayer').appendChild(progressBarContainer);
			playerContainer.appendChild(progressBarContainer);

			var progressBar = document.createElement ('div');
			progressBar.setAttribute('id', "progressBar");
			playerContainer.appendChild(progressBar);

			//Tíminn
			var time = document.createElement ('div');
			time.setAttribute ('id', 'time');
			playerContainer.appendChild(time);

			//Upplýsingar um hvaða lag er í spilun
			var songInfo = document.createElement ('div');
			songInfo.setAttribute ('id', 'songInfo');
			playerContainer.appendChild(songInfo);
			

			//Mute takkinn
			var mute = document.createElement ('div');
			mute.setAttribute('id','mute');
			var a6 = document.createElement ('a');
			playerContainer.appendChild(mute);
			mute.setAttribute('href', "#");
			mute.setAttribute('class', "mute");
			

			//Hækka og lækka
			var slider = document.createElement ('input');
			slider.setAttribute('id', 'slider');
			slider.setAttribute('type', 'range');
			slider.setAttribute('min', '0');
			slider.setAttribute('max', '10');
			slider.setAttribute('value', '4');
			playerContainer.appendChild(slider);
		

				
			if(Modernizr.audio == true){
				
				audio.src = songs[0];
				if ( realOptions.autoplay == true ){
					
					audio.play();
				}	
			}
			// Volume takkinn
				$('#slider').change(function(){
					// Set the music volume based on the slider’s position
					audio.volume = $(this).val() / 10;
				});


			//Play takkinn
			$(".play").click(function() {

					audio.play();			
				});
				
			//Stopp takkinn
				$(".stop").click(function() {
					audio.src = songs [songNumber];
					audio.pause();

				});

			//Pause takkinn
				$(".pause").click(function() {
					audio.pause();
				});


			//Athuga hvort lagið er búið
				$(audio).bind( "ended", function() {
					if (songNumber == songs.length -1 ){
						songNumber = 0;
					}
					else {
						songNumber = songNumber +1;
					} 
					audio.src = songs [songNumber];
					audio.play();
				});	

			//Prev takkinn
				$(".prev").click(function() {
					if (songNumber == 0)
						songNumber = songs.length-1;
					else
						songNumber = songNumber -1;
					audio.src = songs [songNumber];
					audio.play();
				});
				
			//Next takkinn
			$(".next").click(function() {
					if (songNumber == songs.length -1 )
						songNumber = 0;
					else
						songNumber = songNumber +1;
					audio.src = songs [songNumber];
					audio.play();
				});

			//Mute takkinn111
			$(".mute").click(function() {
					audio.pause();
				});

		//audio eventListener getur birt fyrir okkur progress barinn og fl.
		audio.addEventListener('timeupdate', function(){

			// Lengd lagssins
			var length = audio.duration;

			var sec = audio.currentTime;
			
			var progress = (sec / length) * 100;

			//Heildarlengd lagsins í múnútum / sekúndum
			var tMin = parseInt (sec / 60);
			var tSec = parseInt (sec - (tMin * 60));


			//Audio, get total time of song
			var totalMin = parseInt(length / 60);
			var totalSec = parseInt(length - (totalMin * 60));
 
			// If the number of seconds is less than 10, add a '0'
			if (tSec < 10) { tSec = '0' + tSec; }
			//if (totalSec < 10) { totalSec = '0' + totalSec; }
			//if (length < 10){ totalSec = '0' + totalSec;}

			//Progress barinn sem sýna á hvert lagið er komið.
			$('#progressBar').css({'width' : progress * 2 });

			$('#time').html(tMin + ':' + tSec + '/' + totalMin + ':' + totalSec);
			//$('#time').html(tMin + ':' + tSec);	

			$('#songInfo').html (songs [songNumber]);

		},false);

		});

	}
	
}) (jQuery);
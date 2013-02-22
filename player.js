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

			var progressBar = document.createElement ('div');
			progressBar.setAttribute('id', "progressBar");
			playerContainer.appendChild(progressBar)



			if(Modernizr.audio == true){
				
				audio.src = songs[0];
				if ( realOptions.autoplay == true ){
					
					audio.play();
				}	
			}



			//Play takkinn
			$(".play").click(function() {

					audio.play();			
				});
				
			//Stopp takkinn
				$(".stop").click(function() {
					audio.src = songs [songNumber];
					audio.pause();
				});
				
				$(".pause").click(function() {
					audio.pause();
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
		//audio eventListener getur birt fyrir okkur progress barinn og fl.
		audio.addEventListener('timeupdate', function(){
			var secs = audio.currentTime;
			
			var progress = (secs / length) * 100;

			//Progress barinn sem sýna á hvert lagið er komið.
			$('#progressBar').css({'width' : progress * 2});
		});
		},false);
	}
	
}) (jQuery);
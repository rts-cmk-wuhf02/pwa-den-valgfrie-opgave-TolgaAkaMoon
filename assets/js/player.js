document.addEventListener("DOMContentLoaded", function () {

	const params = new URLSearchParams(window.location.search);
	const path = window.location.pathname.replace(/\//g,'');
    const trackId = params.get("track");

    if (trackId == null) {
        document.querySelector(".main__section").style.filter = "blur(0.5px)"
        document.querySelector(".main__container").innerHTML = "Please select a song first"
    } else {
        let Base64 = "basic ZjFlYmQ5YmRjMTVlNDhlMGIxYmNmZjhiNmY0NmNjZjA6ZTFmZjNkNDhjMDRiNGIzNGFjYzZkMmYyMGQxYmNjMDY=";

        fetch('https://accounts.spotify.com/api/token', {
            method: 'post',
            body: "grant_type=client_credentials",
            scope: "user-read-playback-state",
            headers: {
                'Authorization': Base64,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => res.json())
        .then(json => {
      
        let accessToken = "Bearer "+ json.access_token;
      
            fetch(`https://api.spotify.com/v1/tracks/${trackId} `, {
                method: 'get',
                headers: {
                    'Authorization': accessToken,
                }
            })
            .then(res => res.json())
            .then(track => {
                document.querySelector(".container__img").src = track.album.images[0].url
                document.querySelector(".section__artistIMG").src = track.album.images[0].url
                document.querySelector(".section__artist").innerText = track.artists[0].name
                document.querySelector(".section__title").innerText = track.name;
                function millisToMinutesAndSeconds(millis) {
                    var minutes = Math.floor(millis / 60000);
                    var seconds = ((millis % 60000) / 1000).toFixed(0);
                    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                  }
                document.querySelector(".container__end").innerText = millisToMinutesAndSeconds(track.duration_ms);

                let musicFiles = [
                    {name: "elvis", path: "../assets/song/ELVIS.mp3"},
                    {name: "guap", path: "../assets/song/Guap.mp3"},
                    {name: "love", path: "../assets/song/LOVE.mp3"},
                    {name: "rewinder", path: "../assets/song/Rewinder.mp3"}
                ];

                
                    if (track.name == "ALL MY LOVE (feat. ATYPISK)"){
                        document.querySelector(".player__src").src = musicFiles[2].path;
                    } else if (track.name == "ELVIS (feat. Carmon)"){
                        document.querySelector(".player__src").src = musicFiles[0].path;
                    } else if (track.name == "Guap"){
                        document.querySelector(".player__src").src = musicFiles[1].path;
                    } else if (track.name == "Rewinder (feat. Lamin & NODE)"){
                        document.querySelector(".player__src").src = musicFiles[3].path;
                    } else {}


                let music = document.querySelector(".container__player");
                let shuffleButton = document.querySelector(".functions__shuffle");
                let backButton = document.querySelector(".functions__back");
                var playButton = document.querySelector(".functions__play");
                let nextButton = document.querySelector(".functions__forward");
                let repeatButton = document.querySelector(".functions__repeat");
                let mDuration = millisToMinutesAndSeconds(track.duration_ms);
        
                console.log(music)
        

                playButton.addEventListener("click", function () { if (music.paused) { music.play();
                playButton.setAttribute("src", "../assets/images/pause.svg"); } else { music.pause();
                playButton.setAttribute("src", "../assets/images/playbutton.svg");}});
                let duration = millisToMinutesAndSeconds(track.duration_ms) // Duration of audio clip, calculated here for embedding purposes
                let playhead = document.querySelector(".slider__playhead"); // playhead
                let timeline = document.querySelector(".container__slider"); // timeline
                let progressBar = document.querySelector(".slider__progress");
                let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
                music.addEventListener("timeupdate", timeUpdate, false);
                timeline.addEventListener("click", function (event) { moveplayhead(event);
                music.currentTime = duration * clickPercent(event); }, false); function clickPercent(event) {
                return (event.clientX - getPosition(timeline)) / timelineWidth; }
                playhead.addEventListener('mousedown', mouseDown, false);
                window.addEventListener('mouseup', mouseUp, false); let onplayhead = false;
                function mouseDown() { onplayhead = true;
                window.addEventListener('mousemove', moveplayhead, true);
                music.removeEventListener('timeupdate', timeUpdate, false);
                } function mouseUp(event) { if (onplayhead == true) { moveplayhead(event);
                window.removeEventListener('mousemove', moveplayhead, true);
                music.currentTime = duration * clickPercent(event);
                music.addEventListener('timeupdate', timeUpdate, false);} onplayhead = false; }
                function timeUpdate() { let playPercent = timelineWidth * (music.currentTime / duration);
                playhead.style.marginLeft = playPercent + "px"; if (music.currentTime == duration) {}
                } function moveplayhead(event) {
                let newMargLeft = event.clientX - getPosition(timeline);
                if (newMargLeft >= 0 && newMargLeft <= timelineWidth) { playhead.style.marginLeft = newMargLeft + "px";}
                if (newMargLeft < 0) { playhead.style.marginLeft = "0px";}
                if (newMargLeft > timelineWidth) { playhead.style.marginLeft = timelineWidth + "px";}}
                function getPosition(el) { return el.getBoundingClientRect().left; }
                setInterval(function () { progressBar.style.width = parseInt(playhead.style.marginLeft.replace(/px/, "")) + 5 + "px";}, 10);



            });
        });














    }

});

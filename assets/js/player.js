document.addEventListener("DOMContentLoaded", function () {

	const params = new URLSearchParams(window.location.search);
	const path = window.location.pathname.replace(/\//g,'');
    const trackId = params.get("track");

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
            console.log(track)
            document.querySelector(".container__img").src = track.album.images[0].url
            document.querySelector(".section__artistIMG").src = track.album.images[0].url
            document.querySelector(".section__artist").innerText = track.artists[0].name
            document.querySelector(".section__title").innerText = track.name;
    });
    fetch(`https://api.spotify.com/v1/me/player/devices`, {
        method: 'get',
        headers: {
            'Authorization': accessToken,
        }
    })
  



    // Music Player
    let shuffleButton = document.querySelector(".functions__shuffle");
    let backButton = document.querySelector(".functions__back");
    var playButton = document.querySelector(".functions__play");
    let nextButton = document.querySelector(".functions__forward");
    let repeatButton = document.querySelector(".functions__repeat");
    let music = document.querySelector(".container__player");
    let mDuration = music.duration;
  
    /*
    document.querySelector(".container__end").textContent = Math.floor(mDuration / 60) + ":" + 
    Math.floor(mDuration % 60); setInterval(function () {
    let currentTimeNew = Math.floor(music.currentTime % 60);
    let currentTimeMinute = Math.floor(music.currentTime / 60);
    if (currentTimeNew < 10) { document.querySelector(".container__start").textContent = currentTimeMinute + ":" + "0" + currentTimeNew;
    } else { document.querySelector(".container__start").textContent = currentTimeMinute + ":" + currentTimeNew; }}, 500);
    playButton.addEventListener("click", function () { if (music.paused) { music.play();
    playButton.setAttribute("src", "assets/images/pause.svg"); } else { music.pause();
    playButton.setAttribute("src", "assets/images/play.svg");}});
    let duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
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
  
    
      
    // Hue Visualizer
    let file = document.getElementById("thefile");
    let audio = document.querySelector(".container__player");
    
    file.onchange = function() {
      
      let files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      let context = new AudioContext();
      let src = context.createMediaElementSource(audio);
      let analyser = context.createAnalyser();
      
      let canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let ctx = canvas.getContext("2d");
      
      src.connect(analyser);
      analyser.connect(context.destination);
      
      analyser.fftSize = 256;
      
      let bufferLength = analyser.frequencyBinCount;
      
      let dataArray = new Uint8Array(bufferLength);
      
      let WIDTH = canvas.width;
      let HEIGHT = canvas.height;
      
      let barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
    };
    
    */



});
});

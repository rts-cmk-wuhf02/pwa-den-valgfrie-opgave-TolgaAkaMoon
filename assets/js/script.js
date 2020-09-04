if('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../../sw.js').then(function(registration) {
      console.log('ServiceWorker registration was successful with scope: ', registration.scope);
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err);
    })
  })
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.querySelector(".hidden").classList.toggle("hidden", false);
  });

  document.querySelector(".install__button").addEventListener('click', (e) => {
    document.querySelector(".install__button").classList.add("hidden");
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  });
}

Notification.requestPermission(function(status){
  console.log('Notification permission status:', status)
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification("Velkommen til mit Portfolio")
      var options = {
        body: 'Here is a notification body!',
        icon: 'assets/images/marios.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      reg.showNotification('Hello world!', options);
    });
  }
})







document.addEventListener("DOMContentLoaded", () => {

  let Base64 = "basic ZjFlYmQ5YmRjMTVlNDhlMGIxYmNmZjhiNmY0NmNjZjA6ZTFmZjNkNDhjMDRiNGIzNGFjYzZkMmYyMGQxYmNjMDY=";

  fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: "grant_type=client_credentials",
      headers: {
          'Authorization': Base64,
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  })
  .then(res => res.json())
  .then(json => {

  let accessToken = "Bearer "+ json.access_token;

      fetch('https://api.spotify.com/v1/playlists/5vjPjAUsOcqUNas90acSMg', {
          method: 'get',
          headers: {
              'Authorization': accessToken,
          }
      })
      .then(res => res.json())
      .then(tracks => {
          console.log(tracks.tracks.items)
          tracks.tracks.items.forEach(produkt => {
              console.log(produkt.track)
              document.querySelector(".main").innerHTML += `
              <a class="container__anker" href="/player/?track=${produkt.track.id}">
              <div class="main__container">
                  <img src="${produkt.track.album.images[0].url}" class="container__background">
                  <h2 class="container__title">${produkt.track.name}</h2>
                  <h5 class="container__desc">${produkt.track.artists[0].name}</h5>
              </div>
              </a>
              `
          })
      })
  });
});

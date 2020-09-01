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







  document.addEventListener("DOMContentLoaded", function () {
    var Base64 = "basic ZjFlYmQ5YmRjMTVlNDhlMGIxYmNmZjhiNmY0NmNjZjA6ZTFmZjNkNDhjMDRiNGIzNGFjYzZkMmYyMGQxYmNjMDY=";
    fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: "grant_type=client_credentials",
      headers: {
        'Authorization': Base64,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      var accessToken = "Bearer " + json.access_token;
      fetch('https://api.spotify.com/v1/playlists/5vjPjAUsOcqUNas90acSMg', {
        method: 'get',
        headers: {
          'Authorization': accessToken
        }
      }).then(function (res) {
        return res.json();
      }).then(function (tracks) {
        tracks.tracks.items.forEach(function (produkt) {
          document.querySelector(".main").innerHTML += "\n                <div class=\"main__container\">\n                  <a class=\"container__anker\" href=\"/player/?track=".concat(produkt.track.id, "\">\n                    <img src=\"").concat(produkt.track.album.images[0].url, "\" class=\"container__background\">\n                    <h2 class=\"container__title\">").concat(produkt.track.name, "</h2>\n                    <h5 class=\"container__desc\">").concat(produkt.track.artists[0].name, "</h5>\n                    <img src=\"../assets/images/Footer-shadow.png\" class=\"container__img\">\n                  </a>\n                </div>\n                ");
        });
      });
    });
  });

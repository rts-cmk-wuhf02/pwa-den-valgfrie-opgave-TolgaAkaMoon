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
          tracks.tracks.items.forEach(produkt => {
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

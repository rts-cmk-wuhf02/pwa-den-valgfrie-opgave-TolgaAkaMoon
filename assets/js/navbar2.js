let mainNav = document.getElementById('uList');
let navBarToggle = document.querySelector("#checkboxLabel");
let checbox = document.querySelector("#checkbox");

if('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
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

navBarToggle.addEventListener("click", function() {
  navBarToggle.style.transform = "scale(0.8)";
  setTimeout(function(){
    navBarToggle.style.transform = "scale(0.7)";
  }, 100)
});

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle('active');
  if (mainNav.classList == "") {
    mainNav.id = "navLeftToRight";
    setTimeout(function(){
      mainNav.id = "uList";
    }, 500);
  }
  else {
    mainNav.id = "uList";
  }
});

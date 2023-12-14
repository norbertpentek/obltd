// Ez a függvény kapcsolja a 'show' osztályt, ami befolyásolja a menü megjelenítését
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}
// Ha a felhasználó az oldal egy másik részére kattint, rejtse el a legördülő menüt
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
document.querySelector('.dropbtn img').addEventListener('click', function(event) {
  toggleDropdown();
  event.stopPropagation(); // Megakadályozza, hogy az esemény továbbterjedjen
});


window.onload = function() {
    // Smooth scroll és egyéb kódok...

    // Késleltetés és animáció beállítása a képek beúsztatásához
    const slideInDelay = 100; // 1 milliszekundum késleltetés
    const leftImage = document.querySelector('.images-container img:first-child');
    const rightImage = document.querySelector('.images-container img:last-child');
    if (leftImage && rightImage) {
        leftImage.style.animation = `slideInFromLeft 2s ease-out ${slideInDelay}ms forwards`;
        rightImage.style.animation = `slideInFromRight 2s ease-out ${slideInDelay}ms forwards`;
    }
};
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker1.register('/service-worker1.js')
        .then(reg => {
          console.log('Service worker registered.', reg);
        });
    });
  }

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll a "Home" linkre kattintáskor
    var homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Animációs késleltetés a "#services li" elemekre
    const listItems = document.querySelectorAll('#services li');
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].style.animationDelay = (i * 0.3) + 's';
    }

    // Elmosódás eltávolítása és újra alkalmazása
    function removeBlur() {
        var background = document.getElementById('about-us-background');
        if (background && background.classList.contains('blurred')) {
            background.classList.remove('blurred');
        }
    }

    removeBlur();

    // Újra alkalmazza az elmosódást 5 másodperc után
    setTimeout(function() {
        var background = document.getElementById('about-us-background');
        if (background) {
            background.classList.add('blurred');
        }
    }, 4); // 5 másodperc után újra alkalmazza az elmosódást

    // Elmosódás eltávolítása a navigációs linkek kattintásakor
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', removeBlur);
    });

});


// A meglévő setTimeout függvényen belül
setTimeout(function() {
    var backgroundImage = document.getElementById('background-image');
    var aboutUs = document.getElementById('about-us'); // Hozzáadjuk az about-us elemet

    if (backgroundImage) {
        backgroundImage.classList.add('blurred');
    }
    if (aboutUs) {
        aboutUs.style.filter = 'blur(0)'; // Élesítjük a szöveget
    }
}, 3); // 3 másodperc után alkalmazza az elmosódást és élesítést




document.addEventListener('DOMContentLoaded', function() {
    // Késleltetés az űrlapmezők törléséhez
    setTimeout(function() {
        var form = document.getElementById('myForm');
        if (form) {
            form.reset(); // Törli az űrlap mezőit
        }
    }, 100);
});

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

document.addEventListener('DOMContentLoaded', function() {
    // Késleltetés az űrlapmezők törléséhez
    setTimeout(function() {
        var form = document.getElementById('myForm');
        if (form) {
            form.reset(); // Törli az űrlap mezőit
        }
    }, 1);
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



[
            '/kepek/Projects Gallery/Back & Side Extension/1.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/2.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/3.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/4.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/5.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/6.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/7.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/8.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/9.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/10.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/11.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/12.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/13.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/14.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/15.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/16.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/17.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/18.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/19.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/20.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/21.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/22.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/23.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/24.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/25.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/26.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/27.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/28.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/29.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/30.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/31.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/32.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/33.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/34.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/35.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/36.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/37.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/38.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/39.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/40.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/41.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/42.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/43.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/44.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/45.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/46.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/47.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/48.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/49.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/50.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/51.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/52.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/53.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/54.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/55.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/56.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/57.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/58.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/59.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/60.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/61.jpg',
            '/kepek/Projects Gallery/Back & Side Extension/62.jpg',

        ]
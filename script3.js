// document.addEventListener('DOMContentLoaded', function () {
//     // Animációs késleltetés a "#services li" elemekre
//     const listItems = document.querySelectorAll('#services li');
//     for (var i = 0; i < listItems.length; i++) {
//         listItems[i].style.animationDelay = (i * 0.3) + 's';
//     }

//     // Elmosódás és élesítés kezelése
//     setTimeout(function() {
//         var background = document.getElementById('about-us-background');
//         var backgroundImage = document.getElementById('background-image');
//         var aboutUs = document.getElementById('about-us');
        
//         if (background) {
//             background.classList.add('blurred');
//         }
//         if (backgroundImage) {
//             backgroundImage.classList.add('blurred');
//         }
//         if (aboutUs) {
//             aboutUs.style.filter = 'blur(0)';
//         }
//     }, 400); // 0.5 másodperc után alkalmazza az elmosódást és élesítést

//     // Elmosódás eltávolítása a navigációs linkek kattintásakor
//     var navLinks = document.querySelectorAll('nav a');
//     navLinks.forEach(function(link) {
//         link.addEventListener('click', function() {
//             var background = document.getElementById('about-us-background');
//             if (background) {
//                 background.classList.remove('blurred');
//             }
//         });
//     })
//     // Űrlapkezelés
//     window.addEventListener('focus', function() {
//         setTimeout(function() {
//             var form = document.getElementById('myForm');
//             if (form) {
//                 form.reset(); // Törli az űrlapmezőit
//             }
//         }, 500);
//     });
// document.addEventListener('DOMContentLoaded', function() {
//     // Késleltetés az űrlapmezők törléséhez
//     setTimeout(function() {
//         var form = document.getElementById('myForm');
//         if (form) {
//             form.reset(); // Törli az űrlap mezőit
//         }
//     }, 250);
// });
// document.getElementById('send').addEventListener('click', function() {
//         setTimeout(function() {
//             var form = document.getElementById('myForm');
//             if (form) {
//                 form.reset(); // Törli az űrlap mezőit
//             }
//         }, 751); // 2001 ms = 2 másodperc kb
//     });
// });
// // document.addEventListener('DOMContentLoaded', function () {
// //     // Animációs késleltetés a "#services li" elemekre
// //     const listItems = document.querySelectorAll('#services li');
// //     for (var i = 0; i < listItems.length; i++) {
// //         listItems[i].style.animationDelay = (i * 0.3) + 's';
// //     }
// //     setTimeout(function() {
// //         var background = document.getElementById('about-us-background');
// //         if (background) {
// //             background.classList.add('blurred');
// //         }
// //     }, 4); // 5 másodperc után újra alkalmazza az elmosódást
// //     // Elmosódás eltávolítása a navigációs linkek kattintásakor
// //     var navLinks = document.querySelectorAll('nav a');
// //     navLinks.forEach(function(link) {
// //         link.addEventListener('click', removeBlur);
// //     });
// // });
// // // A meglévő setTimeout függvényen belül
// // setTimeout(function() {
// //     var backgroundImage = document.getElementById('background-image');
// //     var aboutUs = document.getElementById('about-us'); // Hozzáadjuk az about-us elemet
// //     if (backgroundImage) {
// //         backgroundImage.classList.add('blurred');
// //     }
// //     if (aboutUs) {
// //         aboutUs.style.filter = 'blur(0)'; // Élesítjük a szöveget
// //     }
// // }, 3); // 3 másodperc után alkalmazza az elmosódást és élesítést
//     window.addEventListener('focus', function() {
//         setTimeout(function() {
//             var form = document.getElementById('myForm');
//             if (form) {
//                 form.reset(); // Törli az űrlapmezőit
//             }
//         }, 1500);
//     });
// document.addEventListener('DOMContentLoaded', function() {
//     // Késleltetés az űrlapmezők törléséhez
//     setTimeout(function() {
//         var form = document.getElementById('myForm');
//         if (form) {
//             form.reset(); // Törli az űrlap mezőit
//         }
//     }, 1000);
// });
// document.getElementById('send').addEventListener('click', function() {
//         setTimeout(function() {
//             var form = document.getElementById('myForm');
//             if (form) {
//                 form.reset(); // Törli az űrlap mezőit
//             }
//         }, 2001); // 2001 ms = 2 másodperc kb
//     });

// document.addEventListener('DOMContentLoaded', function () {
//     // Animációs késleltetés a "#services li" elemekre
//     const listItems = document.querySelectorAll('#services li');
//     for (var i = 0; i < listItems.length; i++) {
//         listItems[i].style.animationDelay = (i * 0.3) + 's';
//     }

//     // Elmosódás és élesítés kezelése
//     setTimeout(function() {
//         var background = document.getElementById('about-us-background');
//         var backgroundImage = document.getElementById('background-image');
//         var aboutUs = document.getElementById('about-us');
        
//         if (background) {
//             background.classList.add('blurred');
//         }
//         if (backgroundImage) {
//             backgroundImage.classList.add('blurred');
//         }
//         if (aboutUs) {
//             aboutUs.style.filter = 'blur(0)';
//         }
//     }, 400); // 0.4 másodperc után alkalmazza az elmosódást és élesítést

//     function resetForm() {
//         var form = document.getElementById('myForm');
//         if (form) {
//             form.reset();
//         }
//     }

//     // Késleltetés az űrlapmezők törléséhez
//     setTimeout(resetForm, 250);

//     // Eseménykezelő a 'send' gombra
//     document.getElementById('send').addEventListener('click', function() {
//         setTimeout(resetForm, 750);
//     });

//     // Eseménykezelő az ablak fókuszálására
//     window.addEventListener('focus', function() {
//         setTimeout(resetForm, 500);
//     });
// });






// document.addEventListener('DOMContentLoaded', function () {
//     // Animációs késleltetés a "#services li" elemekre
//     const listItems = document.querySelectorAll('#services li');
//     for (var i = 0; i < listItems.length; i++) {
//         listItems[i].style.animationDelay = (i * 0.3) + 's';
//     }

//     // Elmosódás és élesítés kezelése
//     setTimeout(function() {
//         var background = document.getElementById('about-us-background');
//         var backgroundImage = document.getElementById('background-image');
//         var aboutUs = document.getElementById('about-us');
        
//         if (background) {
//             background.classList.add('blurred');
//         }
//         if (backgroundImage) {
//             backgroundImage.classList.add('blurred');
//         }
//         if (aboutUs) {
//             aboutUs.style.filter = 'blur(0)';
//         }
//     }, 400); // 0.4 másodperc után alkalmazza az elmosódást és élesítést

//     function resetForm() {
//         var form = document.getElementById('myForm');
//         if (form) {
//             form.reset();
//         }
//     }

//     // Késleltetés az űrlapmezők törléséhez
//     setTimeout(resetForm, 250);

//     // Eseménykezelő a 'send' gombra
//     document.getElementById('send').addEventListener('click', function() {
//         setTimeout(resetForm, 750);
//     });

//     // Eseménykezelő az ablak fókuszálására
//     window.addEventListener('focus', function() {
//         setTimeout(resetForm, 500);
//     });
// });

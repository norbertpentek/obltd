// document.addEventListener('DOMContentLoaded', function () {

// // Smooth scroll a "Home" linkre kattintáskor
//     var homeLink = document.querySelector('a[href="#home"]');
//     if (homeLink) {
//         homeLink.addEventListener('click', function (e) {
//             e.preventDefault();
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//         });
//     }
// });

window.onload = function() {
    // Smooth scroll és egyéb kódok...

    // Késleltetés és animáció beállítása a képek beúsztatásához
    const slideInDelay = 400; // 400 milliszekundum késleltetés

    const leftImage = document.querySelector('.images-container img:first-child');
    const rightImage = document.querySelector('.images-container img:last-child');

    if (leftImage && rightImage) {
        leftImage.style.animation = `slideInFromLeft 3s ease-out ${slideInDelay}ms forwards`;
        rightImage.style.animation = `slideInFromRight 3s ease-out ${slideInDelay}ms forwards`;
    }
};

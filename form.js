




document.addEventListener('DOMContentLoaded', function() {
    // Késleltetés az űrlapmezők törléséhez
    setTimeout(function() {
        var form = document.getElementById('myForm');
        if (form) {
            form.reset(); // Törli az űrlap mezőit
        }
    }, 1);
});




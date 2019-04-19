window.$ = window.jQuery = require('../echoes/js/jquery.js')

// Toggle Menu
$(window).load(function () {
    $(".btn-nav").on("click tap", function () {
        $(".nav-content").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });
});
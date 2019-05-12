const { remote } = require('electron')

window.$ = window.jQuery = require('../echoes/js/jquery.js')

// Toggle Menuㄴ
$(window).load(function () {
    $(".btn-nav").on("click tap", function () {
        $(".nav-content").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });
});

document.getElementById('home').addEventListener('click', () => {
    remote.getCurrentWindow().loadFile('./Scripts/index.html')
})

document.getElementById('index').addEventListener('click', () => {
    remote.getCurrentWindow().loadFile('./Scripts/index.html')
})

document.getElementById('generator').addEventListener('click', () => {
    remote.getCurrentWindow().loadFile('./Scripts/Generator/dataGenerator.html')
})

document.getElementById('simulator').addEventListener('click', () => {
    remote.getCurrentWindow().loadFile('./Scripts/Simulator/damageSimulator.html')
})
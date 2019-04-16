// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const Manager = require('./Manager/heroManager')

document.getElementById('btn1').onclick = () =>
{
    let manager = new Manager.HeroManager();
    alert(manager.testAttack())
}
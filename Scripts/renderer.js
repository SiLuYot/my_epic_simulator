const { shell, remote } = require('electron')

const jsonManager = require('./Manager/jsonManager')
//mainWindow.webContents.once('dom-ready', () => {});
// window.onload = () => {
//     jsonManager.instance.init()
// }
// remote.getCurrentWindow().webContents.once('dom-ready', () => {
//     jsonManager.instance.init()
// })

document.getElementById('index').addEventListener('click', () => {
    remote.getCurrentWindow().loadFile('./Scripts/index.html')
})

document.getElementById('generator').addEventListener('click', () => {
    remote.getCurrentWindow().loadFile('./Scripts/Generator/dataGenerator.html')
})

document.getElementById('simulator').addEventListener('click', () => {
    remote.getCurrentWindow().loadFile('./Scripts/Simulator/damageSimulator.html')
})
document.getElementById('electron_link').addEventListener('click', () => {
    shell.openExternal('https://electronjs.org/')
})

document.getElementById('skill_link').addEventListener('click', () => {
    shell.openExternal('https://docs.google.com/spreadsheets/d/1aqL0Uj26PRW_jAUj8pYaSls_DOuFq30fvwQh8ol74-E/edit#gid=0')
})
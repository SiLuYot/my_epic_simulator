const { shell, ipcRenderer } = require('electron')
const jsonManager = require('./Manager/jsonManager')

window.onload = () => {
    initJsonManager()
}

function initJsonManager(){
    let jsonInstance = jsonManager.instance
    let name = jsonInstance.constructor.name
    
    jsonInstance.init(() => {
        ipcRenderer.send('add_single_instance', [jsonInstance, name])
    })
}

document.getElementById('electron_link').addEventListener('click', () => {
    shell.openExternal('https://electronjs.org/')
})

document.getElementById('skill_link').addEventListener('click', () => {
    shell.openExternal('https://docs.google.com/spreadsheets/d/1aqL0Uj26PRW_jAUj8pYaSls_DOuFq30fvwQh8ol74-E/edit#gid=0')
})
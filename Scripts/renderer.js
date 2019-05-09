const { shell } = require('electron')

const jsonManager = require('./Manager/jsonManager')
const jsonInstance = new jsonManager.JsonManager();

const heroManager = require('./Manager/heroManager')
const heroInstance = new heroManager.HeroManager();

window.onload = () => {

}

document.getElementById('electron_link').addEventListener('click', () => {
    shell.openExternal('https://electronjs.org/')
})

document.getElementById('skill_link').addEventListener('click', () => {
    shell.openExternal('https://docs.google.com/spreadsheets/d/1aqL0Uj26PRW_jAUj8pYaSls_DOuFq30fvwQh8ol74-E/edit#gid=0')
})
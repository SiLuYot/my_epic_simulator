const { shell } = require('electron')

document.getElementById('api_link').addEventListener('click', () => {
    shell.openExternal('https://electronjs.org/docs/api')
})

document.getElementById('skill_link').addEventListener('click', () => {
    shell.openExternal('https://docs.google.com/spreadsheets/d/1aqL0Uj26PRW_jAUj8pYaSls_DOuFq30fvwQh8ol74-E/edit#gid=0')
})
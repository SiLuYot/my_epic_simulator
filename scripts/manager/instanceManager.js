const { ipcMain } = require('electron')
const instanceDic = {}

ipcMain.on('add_single_instance', (event, arg) => {
    AddSingleInstance(arg[0], arg[1])
})

ipcMain.on('get_single_instance', (event, arg) => {
    let instance = GetSingleInstance(arg)
    event.returnValue = instance
})

ipcMain.on('update_single_instance', (event, arg) => {
    UpdateSingleInstance(arg[0], arg[1])
})


function AddSingleInstance(instance, name) {
    if (!(name in instanceDic)) {
        instanceDic[name] = instance
    }
}

function GetSingleInstance(name) {
    let findInstance = null

    if (name in instanceDic) {
        findInstance = instanceDic[name]
    }

    return findInstance
}

function UpdateSingleInstance(instance, name) {
    instanceDic[name] = instance
}
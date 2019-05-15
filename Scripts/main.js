// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, net } = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./Scripts/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.setMenu(null)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function baseRequest(arg, callback) {
  const request = net.request(arg)

  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)

    let body = ''
    response.on('data', (chunk) => {
      body += chunk
    })

    response.on('end', () => {
      console.log(body)
      callback(JSON.parse(body))
    })
  })
  request.end()
}

let instanceDic = {}

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

ipcMain.on('req_heroData', (event, arg) => {
  baseRequest(arg, (body) => {
    event.sender.send('res_heroData', body);
  })
})

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
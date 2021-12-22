const {app, BrowserWindow, ipcMain} = require('electron')
const ipc = ipcMain

function createWindow () {
    const win = new BrowserWindow({
      width: 1080,
      height: 720,
      webPreferences:{
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

    win.loadFile('index.html')

    win.setMenuBarVisibility(false)

    // CLOSE APP
    ipc.on('closeProject', () =>{
      win.close()
    })
}

app.whenReady().then(() => {
    createWindow()
})
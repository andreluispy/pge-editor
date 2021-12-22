const {app, BrowserWindow} = require('electron')

function createWindow () {
    const win = new BrowserWindow({
      width: 1080,
      height: 720,
      webPreferences:{
        nodeIntegration: true
      },
    })

    win.loadFile('index.html')

    win.setMenuBarVisibility(false)
}

app.whenReady().then(() => {
    createWindow()
})
const {app, BrowserWindow} = require('electron')

function createWindow () {
    const win = new BrowserWindow({
      width: 1080,
      height: 720,
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

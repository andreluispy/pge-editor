const {app, BrowserWindow, ipcMain} = require('electron')
const ipc = ipcMain


const createWindow = () =>{
    const win = new BrowserWindow({
      width: 1080,
      height: 720,
      webPreferences:{
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

    win.loadFile('index.html')
    
    // Leave the screen at its maximum size
    win.maximize()

    //Menu Bar false
    win.setMenuBarVisibility(false)

    // CLOSE APP
    ipc.on('closeProject', () =>{
      win.close()
    })

    //  OPEN IDE
    ipc.on('openIDE', ChildWin)
}


app.whenReady().then(() => {
    createWindow()
})

// Function Opem IDE
const ChildWin = ()=>{
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.loadFile('IDE.html')
  win.setMenuBarVisibility(false)
}
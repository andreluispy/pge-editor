const {app, BrowserWindow, ipcMain, dialog} = require('electron')
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

    // SAVE FILE
    ipc.on('saveProject', ()=>{
      dialog.showSaveDialog({
        title: 'Salvando Arquivo',
        message: 'Salve seu arquivo',
        buttonLabel: 'Salvar',
        nameFieldLabel: 'Arquivo',
        filters:[
          {
            name: 'All',
            extensions: ['*']
          },
          {
            name: 'Python',
            extensions: ['py']
          },
          {
            name: 'Text',
            extensions: ['txt']
          },
        ]
      }, (filename, bookmark)=>{
        console.log(filename)
      })
    })
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
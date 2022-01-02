const fs = require('fs')
const { exec } = require("child_process")
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


    // Export Game
    ipc.on('exportProject', (event, objs)=>{
      fs.writeFile("./projects/game.py", `import pge2d as pge
import code

class game(pge.game):
    window_size = (800, 600)
    window_color = (94, 94, 94)
    
    def start(self):
        pge.loadSceneJSON(open("./scene.json"))

        code.start()
    def update(self):
        code.update()

game()`, (err)=>{})

      storeData(objs, "./projects/scene.json")

      exec("cd projects && ./envoriment/linux", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
        }
        console.log(`stdout: ${stdout}`)
    })
    })

    
    // SAVE FILE
    ipc.on('saveProject', (event)=>{})

    // OPEN FILE
    ipc.on('openFile', ()=>{
      dialog.showOpenDialog({
        title: 'Abrir Arquivo',
        message: 'Abrir arquivo',
        buttonLabel: 'Abrir',
        properties:['openFile'],
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
      }, (filepaths, bookmark)=>{
        console.log(filepaths)
      })
    })

    ipc.on('NewProject', createWindow)
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

  ipc.on('saveScript', (event, script)=>{
    fs.writeFile("./projects/code.py", script, (err)=>{})
  })
}

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, `{"scene":${JSON.stringify(data)}}`)
  } catch (err) {
    console.error(err)
  }
}

const fs = require('fs')
const { exec } = require("child_process")
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const ipc = ipcMain
var path = require('path')

function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
function copyFolderRecursiveSync( source, target ) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}


let SystemRun = 'linux'
if (process.platform === 'win32') {
  SystemRun = 'windows'
}

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
      fs.writeFile("./projects/data/game.py", `
class game(pge.game):
    window_size = (800, 600)
    window_color = (94, 94, 94)
    
    def start(self):
        pge.loadSceneJSON(open("./data/scene.json"))
        start()
    def update(self):
        update()`, (err)=>{})
        storeData(objs, "./projects/data/scene.json")
    })

    ipc.on('runProject', (event)=>{
      to_exec = "cd projects && "
      if (SystemRun === 'windows'){
        to_exec=`${to_exec}start /d "./envoriment/build/windows/" game.exe`
      } else {
        to_exec=`${to_exec}python3 ./game_linux_test.py`
      }
      exec(to_exec, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`)
        if (error) {console.log(`error: ${error.message}`)}
        if (stderr) {console.log(`stderr: ${stderr}`)}})})

    // Build Game
    ipc.on('buildProject', (event, objs)=>{
      fs.rm("projects/build/linux", { recursive: true }, (error) => {})
      fs.rm("projects/build/windows", { recursive: true }, (error) => {})
      console.log("Folders removed")

      copyFolderRecursiveSync(`./projects/envoriment/build/linux`, "./projects/build/")
      copyFolderRecursiveSync(`./projects/envoriment/build/windows`, "./projects/build/")
      console.log("Folders Copy")

      fs.copyFile('./projects/data/game.py', './projects/build/linux/game.py', (err) => {if (err){throw err}})
      fs.copyFile('./projects/data/game.py', './projects/build/windows/data/game.py', (err) => {if (err){throw err}})
      console.log("Game Copy")

      fs.copyFile('./projects/data/code.py', './projects/build/linux/code.py', (err) => {if (err){throw err}})
      fs.copyFile('./projects/data/code.py', './projects/build/windows/data/code.py', (err) => {if (err){throw err}})
      console.log("Code Copy")

      fs.copyFile('./projects/data/scene.json', './projects/build/linux/scene.json', (err) => {if (err){throw err}})
      fs.copyFile('./projects/data/scene.json', './projects/build/windows/data/scene.json', (err) => {if (err){throw err}})
      console.log("JSON Copy")
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
    fs.writeFile("./projects/data/code.py", script, (err)=>{})
  })
}

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, `{"scene":${JSON.stringify(data)}}`)
  } catch (err) {
    console.error(err)
  }
}

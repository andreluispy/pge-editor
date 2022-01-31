const {ipcRenderer} = require('electron')
const ipc = ipcRenderer
const fs = require("fs")

// CLOSE APP
closeProject.addEventListener('click', ()=>{
    ipc.send('closeProject')
})

// OPEN IDE
openIDE.addEventListener('click', ()=>{
    ipc.send('openIDE')
})

// EXPORT FILE
exportProject.addEventListener('click', ()=>{
    ipc.send('exportProject', objs)
    ipc.send('runProject')
})

// BUILD FILE
buildProject.addEventListener('click', ()=>{
    ipc.send('exportProject', objs)
    ipc.send('buildProject')
})

// SAVE FILE
saveProject.addEventListener('click', ()=>{
    fs.readFile('projects/data/code.py', 'utf8', function(err, data) {ipc.send('saveProject', objs, data)
    console.log("SAVE FILE - IPC SEND")})
})

// OPEN FILE
openFile.addEventListener('click', ()=>{
    ipc.send('openFile')
    console.log("OPEN FILE - IPC SEND")
})

NewProject.addEventListener('click', ()=>{
    ipc.send('NewProject')
})

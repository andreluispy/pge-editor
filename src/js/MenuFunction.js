const {ipcRenderer} = require('electron')
const ipc = ipcRenderer

// CLOSE APP
closeProject.addEventListener('click', ()=>{
    ipc.send('closeProject')
})


// OPEN IDE
openIDE.addEventListener('click', ()=>{
    ipc.send('openIDE')
})

// SAVE FILE
saveProject.addEventListener('click', ()=>{
    ipc.send('saveProject')
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

// OPEN FILE
openFile.addEventListener('click', ()=>{
    ipc.send('openFile')
})

NewProject.addEventListener('click', ()=>{
    ipc.send('NewProject')
})

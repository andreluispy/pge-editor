const {ipcRenderer} = require('electron')
const ipc = ipcRenderer

// CLOSE APP
closeProject.addEventListener('click', ()=>{
    ipc.send('closeProject')
})


// OPEM IDE
openIDE.addEventListener('click', ()=>{
    ipc.send('openIDE')
})

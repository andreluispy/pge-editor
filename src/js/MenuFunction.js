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
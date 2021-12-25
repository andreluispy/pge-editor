const { ipcRenderer } = require('electron')
const ipc = ipcRenderer
const fs = require("fs")

let keys = {}
setInterval(function () {document.addEventListener('keydown', function (e) {keys[e.key] = true}); document.addEventListener('keyup', function (e) {delete keys[e.key]})}, 25)
function get_pressed(_key) {if (_key in keys) {return true == true}}

fs.readFile('projects/code.py', 'utf8', function(err, data) {
    document.getElementById("editor").innerHTML = data
    var editor = ace.edit("editor")
    editor.setTheme("ace/theme/monokai")
    editor.session.setMode("ace/mode/python")

    // EXPORT FILE
    setInterval(function () {
        if (get_pressed('Control') && get_pressed('s')) {
            ipc.send('saveScript', editor.getValue())
        }
    }, 25)
})

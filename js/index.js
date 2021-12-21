// Vars
var objs_html = document.getElementById("objs")
var objs = []
var props_html = document.getElementsByClassName("props")[0]

var mousePos = {x: 0, y: 0}
var toReturn = null

var modal = document.getElementById("ModalBox")
var span = document.getElementsByClassName("close")[0]
var confirm = document.getElementById("confirmAdd")

span.onclick = function() {
    modal.style.display = "none"
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

function modalConfirm() {
    modal.style.display = "none"

    let objType = document.getElementById("objToAdd").value
    
    if (objType == "rect"){
        toReturn = {
            name: 'NewRect',
            rendering: new Rect(mousePos.x.toFixed(2), mousePos.y.toFixed(2), 32, 32, "#0000ff")
        }
    }
    else if (objType == "circle"){
        toReturn = {
            name: 'NewCircle',
            rendering: new Circle(mousePos.x.toFixed(2), mousePos.y.toFixed(2), 32, "#0000ff")
        }
    }
    else if (objType == "text"){
        toReturn = {
            name: 'NewText',
            rendering: new CText("Hello World", mousePos.x.toFixed(2), mousePos.y.toFixed(2), "#ffffff", "25px Arial")
        }
    }

    objs.push(toReturn)
    prop_Load(objs.length-1)
}

confirm.onclick = modalConfirm
confirm.onchange = modalConfirm

function update_editor() {
    // Update Objects View
    var to_write = makeObjHtml()
    if (objs_html.innerHTML !== to_write) {
        objs_html.innerHTML = to_write
    }

    // Add Objects
    canvas.onclick = event => {
        if (event.detail === 2) {
            mousePos = getMousePos(event)
            toReturn = null
            modal.style.display = "block"
        }
    }
}

update(update_editor)

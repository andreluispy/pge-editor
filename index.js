// Vars
var objs_html = document.getElementById("objs")
var objs = []
var props_html = document.getElementsByClassName("props")[0]

function update_editor() {
    // Update Objects View
    var to_write = makeObjHtml()
    if (objs_html.innerHTML !== to_write) {
        objs_html.innerHTML = to_write
    }

    // Add Objects
    canvas.onclick = event => {
        let mousePos = getMousePos(event)
        if (event.detail === 2) {
            objs.push({
                name: 'NewRect',
                rendering: new Rect(mousePos.x.toFixed(2), mousePos.y.toFixed(2), 32, 32, "blue")
            })
        }
    }
}

update(update_editor)

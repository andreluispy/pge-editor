// Vars
var objs_html = document.getElementById("objs")
var objs = []

function delObjs(i) {
    objs.pop(i)
    objects.pop(i)
}

function update_editor() {
    // Update Objects View
    var to_write = ""
    for (obj in objs) {
        to_write = to_write + "<li onclick=\"delObjs("+objs.length+")\"><span class=\"caret\">"+objs[obj].name+"</span></li>"
    }
    objs_html.innerHTML = "<ul id=\"objs\">"+to_write+"</ul>"


    // Add Objects
    canvas.onclick = event => {
        let mousePos = getMousePos(event)
        if (event.detail === 2) {
            objs.push({
                name: 'NewRect',
                rendering: new Rect(mousePos.x, mousePos.y, 32, 32, "blue")
            })
        }
    }
}

update(update_editor)

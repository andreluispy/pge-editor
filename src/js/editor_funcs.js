/*
ipcReciver.on('loadProject', (event, data) => {
    // Load Scene
    objs = data['o']

    // Load Code
    let codePreload = data['c']

    console.log("CARREGADO")
})
*/

function makeObjHtml(){
    let to_write = ""
    for (obj in objs) {
        to_write = to_write + `<li class="caret" onclick="prop_Load(${obj})">${objs[obj].name}</li>`
    }
    return "<ul id=\"objs\">"+to_write+"</ul>"
}

function delObjs(i) {
    objs.splice(i, 1)
    objects.splice(i, 1)
    props_html.innerHTML = ""
}

function renameObj(i, inputbox){
    objs[i].name = inputbox.value
    document.getElementById("props_obj_name").innerHTML = `<h3 id="props_obj_name">Obj: ${inputbox.value}</h3>`
}

function renderChange(i, inputBox, type){
    objs[i].rendering[type] = inputBox.value
}

function prop_Load(i){
    let new_html = ""
    let obj = objs[i]
    
    // button delete
    new_html = `<h3 id="props_obj_name">Obj: ${obj.name}</h3><br><button onclick="delObjs(${i})" style="width:100%">Delete Object</button>`
    
    // obj.name
    new_html = `${new_html}<br><br><hr><br><label>Name: </label><input type="text" value="${obj.name}" onchange="renameObj(${i}, this)"><br>`

    let objProps = Object.keys(obj.rendering)
    for (objProp in objProps){
        if (objProps[objProp] == "type"){
            continue
        }
        else if (objProps[objProp] == "color"){
            new_html = `${new_html}<br><label>Color: </label><input type="color" value="${obj.rendering.color}" onchange="renderChange(${i}, this, 'color')"><br>`
        }
        else if (objProps[objProp] == "font" || objProps[objProp] == "text"){
            new_html = `${new_html}<br><label>${objProps[objProp]}: </label><input type="text" value="${obj.rendering[objProps[objProp]]}" onchange="renderChange(${i}, this, '${objProps[objProp]}')"><br>`
        }
        else {
            new_html = `${new_html}<br><label>${objProps[objProp]}: </label><input type="number" value="${obj.rendering[objProps[objProp]]}" onchange="renderChange(${i}, this, '${objProps[objProp]}')"><br>`
        }
    }

    props_html.innerHTML = new_html
}

function openModal(mousePos){
    // Get the modal
    var modal = document.getElementById("ModalBox")
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0]
    modal.style.display = "block"
    var confirm = document.getElementById("confirmAdd")

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none"
    }
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
    }

    confirm.onclick = function() {
        modal.style.display = "none"

        let objType = document.getElementById("objToAdd").value
        if (objType == "rect"){
            return {
                name: 'NewRect',
                rendering: new Rect(mousePos.x.toFixed(2), mousePos.y.toFixed(2), 32, 32, "blue")
            }
        }
    }
}

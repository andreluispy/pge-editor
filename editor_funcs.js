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
    if (type == "x"){
        objs[i].rendering.x = inputBox.value
    }
    else if (type == "y"){
        objs[i].rendering.y = inputBox.value
    }
    else if (type == "width"){
        objs[i].rendering.width = inputBox.value
    }
    else if (type == "height"){
        objs[i].rendering.height = inputBox.value
    }
    else if (type == "color"){
        objs[i].rendering.color = inputBox.value
    }
}

function prop_Load(i){
    let new_html = ""
    let obj = objs[i]
    
    // button delete
    new_html = `<h3 id="props_obj_name">Obj: ${obj.name}</h3><br><button onclick="delObjs(${i})" style="width:100%">Delete Object</button>`
    
    // obj.name
    new_html = `${new_html}<br><br><hr><br><label>Name: </label><input value="${obj.name}" onchange="renameObj(${i}, this)">`

    new_html = `${new_html}<br>
    
    <label for="posx">Pos X: </label><input name="posx" value="${obj.rendering.x}" onchange="renderChange(${i}, this, 'x')"><br>
    
    <label>Pos Y: </label><input value="${obj.rendering.y}" onchange="renderChange(${i}, this, 'y')"><br>
    
    <label>Width: </label><input value="${obj.rendering.width}" onchange="renderChange(${i}, this, 'width')"><br>
    
    <label>Height: </label><input value="${obj.rendering.height}" onchange="renderChange(${i}, this, 'height')"><br>
    
    <label>color: </label><input value="${obj.rendering.color}" onchange="renderChange(${i}, this, 'color')">
    
    `

    props_html.innerHTML = new_html
}

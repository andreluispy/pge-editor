function export_to_python(objs){
    let objs_to_write = ""
    let objs_to_draw = ""

    for (obj in objs){
        let objProps = Object.keys(objs[obj].rendering)
        let objValues = ""
        for (objProp in objProps){
            if (objProps[objProp] == "type"){
                continue
            }
            else if (objProps[objProp] == "color"){
                objValues = `${objValues}${objProps[objProp]}="${ objs[obj].rendering[ objProps[objProp] ]}",`
            }
            else if (objProps[objProp] == "font"){
                objValues = `${objValues}font="${ objs[obj].rendering[ objProps[objProp] ].split(" ")[1]}", font_size=${ objs[obj].rendering[ objProps[objProp] ].split(" ")[0]},`
            }
            else {
                objValues = `${objValues}${objProps[objProp]}=${ objs[obj].rendering[ objProps[objProp] ]},`
            }
        }

        if (objs[obj].rendering.type == "text"){
            objs_to_write = `${objs_to_write}        self.${objs[obj].name}=pge.${objs[obj].rendering.type}()\n`
            objs_to_draw = `${objs_to_draw}        self.${objs[obj].name}draw(${objValues.slice(0, -1)})\n`
        }
        else {
            objs_to_write = `${objs_to_write}        self.${objs[obj].name}=pge.${objs[obj].rendering.type}(${objValues.slice(0, -1)})\n`        
            objs_to_draw = `${objs_to_draw}        self.${objs[obj].name}draw()\n`
        }
    }

    python_code = `import pge2d as pge

class game(pge.game):
    window_size = (800, 600)
    window_color = (94, 94, 94)

    def start(self):
${objs_to_write}
    def update(self):
${objs_to_draw}

game()`

    var a = document.getElementById("a");
    var file = new Blob([python_code], {type: "text/html"});
    a.href = URL.createObjectURL(file);
    a.download = "game.py";
    a.click();
}

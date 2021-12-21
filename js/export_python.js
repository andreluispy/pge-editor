function export_to_python(objs){
    let objs_to_write = ""
    let objs_to_draw = ""
    for (obj in objs){
        if (objs[obj].rendering.type == "rect"){
            objs_to_write = `${objs_to_write}    self.${objs[obj].name}=pge.${objs[obj].rendering.type}( (${objs[obj].rendering.x}, ${objs[obj].rendering.y}), (${objs[obj].rendering.width}, ${objs[obj].rendering.height}), "${objs[obj].rendering.color}")\n`
        }
        else if (objs[obj].rendering.type == "circle"){
            objs_to_write = `${objs_to_write}    self.${objs[obj].name}=pge.${objs[obj].rendering.type}( (${objs[obj].rendering.x}, ${objs[obj].rendering.y}), "${objs[obj].rendering.color}", ${objs[obj].rendering.radius})\n`
        }

        if (objs[obj].rendering.type == "text"){
            objs_to_write = `${objs_to_write}    self.${objs[obj].name}=pge.text()\n`
            objs_to_draw = `${objs_to_draw}    self.${objs[obj].name}.draw() \n`
        }
        else {
            objs_to_draw = `${objs_to_draw}    self.${objs[obj].name}.draw() \n`
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

game()
    `

    console.log(python_code)
    console.log(objs)
}

var objects = []
var keys = {}
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

function update(update_func){
    setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        // auto draw objects
        for (let obj in objects){
            objects[obj].draw()
        }
    
        document.addEventListener('keydown', function(e){
            keys[e.key] = true
        })
        document.addEventListener('keyup', function(e){
            delete keys[e.key]
        })

        update_func()
    }, 25)
}

function get_pressed(_key){
    if (_key in keys){
        return true == true
    }
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    }
}

function getObjType(){
    let objT = prompt
    return objT
}

class Rect{
    type = 'rect'
    x = 0
    y = 0
    width = 0
    height = 0
    color = ''

    constructor(x, y, width, height, color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        
        objects.push(this)
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

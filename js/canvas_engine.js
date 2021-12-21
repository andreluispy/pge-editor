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

class Circle{
    type = 'circle'
    x = 0
    y = 0
    radius = 0
    color = ''

    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        
        objects.push(this)
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color
        ctx.fill();
    }
}

class CText{
    type = 'text'
    x = 0
    y = 0
    text = ""
    font = "48px arial"
    color = "white"

    constructor(text, x, y, color, font='48px arial'){
        this.text = text
        this.x = x
        this.y = y
        this.font = font
        this.color = color
        
        objects.push(this)
    }
    draw(){
        ctx.font = this.font
        ctx.fillStyle = this.color
        ctx.fillText(this.text, this.x, this.y)
    }
}

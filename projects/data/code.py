def start():
    pass

def update():
    if pge.key.get_key_pressed("w"):
        pge.sceneObjs["player"].y -= 10
    elif pge.key.get_key_pressed("s"):
        pge.sceneObjs["player"].y += 10
    
    if pge.key.get_key_pressed("a"):
        pge.sceneObjs["player"].x -= 10
    elif pge.key.get_key_pressed("d"):
        pge.sceneObjs["player"].x += 10

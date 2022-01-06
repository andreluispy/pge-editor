
class game(pge.game):
    window_size = (800, 600)
    window_color = (94, 94, 94)
    
    def start(self):
        pge.loadSceneJSON(open("./data/scene.json"))
        start()
    def update(self):
        update()
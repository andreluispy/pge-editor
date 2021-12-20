import webview
import tkinter as tk

root = tk.Tk()
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()

webview.create_window('PGE - Engine', './index.html', width=screen_width, height=screen_height)
webview.start()

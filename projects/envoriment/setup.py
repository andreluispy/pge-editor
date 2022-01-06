import sys
from cx_Freeze import setup, Executable


build_exe_options = {"packages": ["pygame"]}

base = None
setup(
    name = "Game",
    version = "1.0",
    description = "",
    options = {"build_exe": build_exe_options},
    executables = [Executable("game.py", base=base)]
)

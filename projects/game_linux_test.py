#!/usr/bin/env python

f1 = open("data/game.py", 'r').read()
f2 = open("data/code.py", 'r').read()

exec(f'import data.pge2d as pge\n\n{f2}\n{f1}\n\ngame()')

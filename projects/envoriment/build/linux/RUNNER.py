#!/usr/bin/env python

f1 = open("g.py", 'r').read()
f2 = open("c.py", 'r').read()

exec(f'import pge2d as pge\n\n{f2}\n{f1}\n\ngame()')

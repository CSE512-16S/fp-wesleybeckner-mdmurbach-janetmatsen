Lessons learned:
- enclose javascript in brackets (e.g. [ { json stuff... } ]
  in the file you load. 
    - error: Cannot set property 'depth' of undefined

- you can't put comments w/ // in the data file. 
    - error: Cannot read property '0' of undefined
    - it is looking for a 0th element and not seeing it

Status:
- learned what is most likely preventing visualize_javascript_tree
  from working.

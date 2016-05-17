To start a python3 server:
`python3 -m http.server`

Virtualenv: 
`source activate d3_tree`
Then go to http://0.0.0.0:8000/  or similar

To see the tree data in the console, type "root". 

How to color the nodes?
- This tutorial shows inclusion of the data in the orgiginal json:
    http://www.d3noob.org/2014/01/tree-diagrams-in-d3js_11.html
    {
        "name": "Top Level",
        "parent": "null",
        "value": 10,
        "type": "black",
        "level": "red",
        "children": [
          {
    - then they call object attributes:
        nodeEnter.append("circle")
         .attr("r", function(d) { return d.value; })
         .style("stroke", function(d) { return d.type; })
         .style("fill", function(d) { return d.level; });
- I should try to have my own function that parses the text. 
    - Example of my text: 
        Object {children: Array[2], name: "Po2_flat > 0.021143555641174316", depth: 0, x: 510.1037613488976, y: 0…}
        children : Array[2]
        depth : 0
        id : 1869
        name : "Po2_flat > 0.021143555641174316"
        x : 510.1037613488976
        y : 0
    - Write a function that gets Po2_flat out of Po2_flat > 0.021143555641174316
    - Write a function that converts Po2_flat to a color
    - Write a function that assigns color based on Po2_flat > 0.021143555641174316

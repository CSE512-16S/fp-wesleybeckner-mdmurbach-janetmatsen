function generate_tree(tree_json_path) {
  // ************** Generate the tree diagram  *****************
  console.log("Generate Tree")
  console.log("json path:")
  console.log(tree_json_path)

  var margin = {top: 20, right: 120, bottom: 20, left: 120},
  width = 1200 - margin.right - margin.left,
  height = 1000 - margin.top - margin.bottom;
  
  // Variable i get used in `var_node` below. 
  var i = 0;
  
  function separation(a, b) {
    return (a.parent == b.parent ? 1 : 2) / a.depth;
  }
  
  var tree = d3.layout.tree()
    .size([height, width]) // size option A: fixed width height/width for whole tree
    //.nodeSize([3, 3])  // size option B: fixed spacing between nodes
    ; 
  
  var diagonal = d3.svg.diagonal()
   .projection(function(d) { return [d.x, d.y]; });
  
  var svg = d3.select("body").append("svg")
   .attr("width", width + margin.right + margin.left)
   .attr("height", height + margin.top + margin.bottom)
    .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // Load our .json data exported from scikit-learn
  d3.json(tree_json_path, function(error, treeData) {
    root = treeData[0];
    update(root);
  });
  
  // Global Variables:
  NODE_OPACITY = 0.3
  
  // ?? Is this continually being called?  
  function update(source) {
  
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
     links = tree.links(nodes);
  
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 20; });
  
    // Declare the nodes:
    // Declare the variable / function node so that when we call it later it 
    // will know to select the appropriate object (a node) with the appropriate .id.
    var node = svg.selectAll("g.node")
     .data(nodes, function(d) { return d.id || (d.id = ++i); });
  
    // http://stackoverflow.com/questions/19297808/how-to-display-name-of-node-when-mouse-over-on-node-in-collapsible-tree-graph
    // You have to apply this to the node.enter().append("g") thing, 
    // *not* the circle made by nodeEnter.append("circle").  (need to understand better)
    var hoverLabelOn = function() {
      console.log("hover on");
      d3.select(this).append("text")
        .classed('info', true)
        .attr('x', 20)  // 20 pixels to the right
        .attr('y', 10)  // 10 pixels under the circle
        .text(function(d) {return d.name;})
      ;}
  
    var hoverLabelOff = function() {
      console.log("hover off");
      d3.select(this).select('text.info').remove()
      ;}
  
    // Enter the nodes.
    // assigns the variable / function nodeEnter to the action of appending
    // a node to a particular position
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; })
      .on("mouseout", hoverLabelOff )
      .on("mouseover", hoverLabelOn )
      ;
  
    var hoverCircleOn = function() {
      // http://stackoverflow.com/questions/19297808/how-to-display-name-of-node-when-mouse-over-on-node-in-collapsible-tree-graph
      console.log("mouse is over")
      var hoverCircle = d3.select(this);
        // note: the transition makes it possible for the node to remain enlarged
        // after you expect it to shrink (if you mouseout before it is done enlarging)
  	  hoverCircle.transition().duration(300)
  	    .attr("opacity", 1 )
  		.attr("r", hoverCircle.attr("r") * 1 + 10 );
      }
   
    var hoverCircleOff = function() {
      var hoverCircle = d3.select(this);
        hoverCircle.attr("r", 5); // leave them bigger for fun
    }
  
    // Plot circles, colored by the decision being made
    nodeEnter.append("circle")
      .attr("r", 3)
      .attr("opacity", NODE_OPACITY)
      .style("fill", function(d) { return color_for_node(d.name); })
      .on("mouseover", hoverCircleOn )
      .on("mouseout", hoverCircleOff )
      ;
  
    // Declare the links
    // declare the link variable / function and tell it to make a link based on 
    // all the links that have unique target id’s
    // we only want to draw links between a node and it’s parent.
    var link = svg.selectAll("path.link")
     .data(links, function(d) { return d.target.id; });
  
    // Enter the links.
    link.enter().insert("line", "g")
     .attr("class", "link")
      // make straight lines: http://www.harrysurden.com/wordpress/archives/581
     .attr("x1", function (d){
         return d.source.x;
     })
     .attr("y1", function (d){
         return d.source.y;
     })
     .attr("x2", function (d){
         return d.target.x;
     })
     .attr("y2", function (d){
         return d.target.y;
     });

}
}

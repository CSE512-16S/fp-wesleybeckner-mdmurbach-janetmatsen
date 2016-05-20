function generate_tree() {
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
     width = .55*window.innerWidth - margin.right - margin.left,
     height = window.innerHeight/2 - margin.top - margin.bottom;
     
    var i = 0;

    var tree = d3.layout.tree()
     .size([width, height]);

    var diagonal = d3.svg.diagonal()
     .projection(function(d) { return [d.x, d.y]; });

    var svg = d3.select("div#tree").append("svg")
     .attr("width", width + margin.right + margin.left)
     .attr("height", height + margin.top + margin.bottom)
      .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //root = treeData[0];
      
    //update(root);

    d3.json("data/sample_json_from_sklearn.json", function(error, treeData) {
      root = treeData[0];
      update(root);
    });

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
       links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) {d.y = d.depth * 20; });

      // Declare the nodes:
      // declare the variable / function node so that when we call it later it 
      // will know to select the appropriate object (a node) with the appropriate .id.
      var node = svg.selectAll("g.node")
       .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter the nodes.
      // assigns the variable / function nodeEnter to the action of appending
      // a node to a particular position
      var nodeEnter = node.enter().append("g")
       .attr("class", "node")
       .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; });

      nodeEnter.append("circle")
       .attr("r", 3)
       // #fb0 expands to #ffbb00, so #fff --> #ffffff (html shorthand)
       .style("fill", function(d) { return color_for_node(d.name); });

    //  nodeEnter.append("text")
    //   .attr("x", function(d) { 
    //    return d.children || d._children ? -13 : 13; })
    //   .attr("dy", ".35em")
    //   .attr("text-anchor", function(d) { 
    //    return d.children || d._children ? "end" : "start"; })
    //   .text(function(d) { return d.name; })
    //   .style("fill-opacity", 1);

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
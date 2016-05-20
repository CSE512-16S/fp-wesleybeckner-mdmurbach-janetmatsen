// show_image(filename, outerWidth, outerheight, title, id) is a function which
// reads in a tab delimeted matrix from the input_file, adds an svg 
// element to the div with the specified id tag, and draws a pixel by pixel
// "heatmap" of the data. It also adds a title above this element.
function show_image(filename, outerWidth, outerHeight, title, id) {

    var margin = {top: 40, right: 40, bottom: 40, left: 40},
        width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var x = d3.scale.linear().range([0, width]),
        y = d3.scale.linear().range([0, height]),
        z = d3_scale.scaleViridis();

    var svg = d3.select("div" + id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Read in Ht.txt and plot a pixel by pixel image
    // http://stackoverflow.com/questions/13870265/read-csv-tsv-with-no-header-line-in-d3
    d3.text(filename, function(text) {
      var full = d3.tsv.parseRows(text).map(function(row, i) {
        return row.map(function(value) {
          return +value;
        });
      });
      
      // Take a subsection of the input data using .slice() method
      var col_start = 40;
      var col_end = 104;
      var row_start = 40;
      var row_end = 104;
      
      var data = [];
      
      subset = full.slice(col_start,col_end);
      subset.forEach(function(d, i) {data[i] = d.slice(row_start,row_end)})
      
      N = data[0].length; // Number of columns
      M = data.length; // Number of rows
      
      // Compute the x and y scale domains.
      x.domain([0, N-1]);
      y.domain([0, M-1]);
      
      // Flatten the matrix into a single array so we have a data
      // object for each pixel
      flatten = d3.merge(data);
      
      z.domain(d3.extent(flatten, function(d) {return d}));

      // Display the tiles for each non-zero bucket.
      svg.selectAll(".tile")
          .data(flatten).enter().append("rect")
          .attr("class", "tile")
          .attr("x", function(d, j) {return x((j % N)); }) // column number
          .attr("y", function(d, j) {return y(Math.floor(j/N)); }) // row number
          .attr("width", x(1) - x(0))
          .attr("height", y(1) - y(0))
          .style("fill", function(d) { return z(d); })
          .on("mouseover", function(d,i){
              var index = i;
              d3.selectAll("#inputs").selectAll(".tile").classed("cell-hover", function(d, i) {
                  if(i % (N*M) == index) {return true;}
                  });
              d3.selectAll("#output").selectAll(".tile").classed("cell-hover", function(d, i) {
                  if(i % (N*M) == index) {return true;}
                  });
                })
          .on("mouseout", function(){
               d3.selectAll("#inputs").selectAll(".tile").classed("cell-hover",false)
               d3.selectAll("#output").selectAll(".tile").classed("cell-hover",false);
               });
               
      svg.append("text")
        .attr("class", "title")
        .attr("x", width/2)
        .attr("y", -margin.top/2)
        .attr("text-anchor", "middle")
        .text(title); 
    });
};
function show_output(filename_predict, filename_true, outerWidth, outerHeight, title, id) {

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

    // Read in true file
    d3.text(filename_true, function(text) {
      var full_true = d3.tsv.parseRows(text).map(function(row, i) {
        return row.map(function(value) {
          return +value;
        });
      });
      
          // Read in predicted file
          d3.text(filename_predict, function(text) {
          full_predict = d3.tsv.parseRows(text).map(function(row, i) {
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
          
          subset_predict = full_predict.slice(row_start,row_start + (row_end-row_start)/2);
          subset_true = full_true.slice(row_start + (row_end-row_start)/2,row_end);
                   
          subset_predict.forEach(function(d, i) {data[i] = d.slice(col_start,col_end)})
          subset_true.forEach(function(d, i) {data[i + (row_end-row_start)/2] = d.slice(col_start,col_end)})
          
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
                  data = d3.select(this);
                  var index = i;
                  d3.selectAll("#inputs svg")[0].forEach( function(d, i) {
                      // select the rectangle in each of the input svg corresponding to the
                      // one selected on mouseover (index)
                      t = d3.selectAll("#inputs").selectAll(".tile")[0][i*(N*M) + index];
                      d3.select(d).append("rect")
                          .attr("class", "zoom")
                          .attr("x", data.attr("x") - 16*(x(1) - x(0))/2)
                          .attr("y", data.attr("y") - 16*(y(1) - y(0))/2)
                          .attr("width", 16*(x(1) - x(0)))
                          .attr("height", 16*(y(1) - y(0)))                  
                          .style("fill", t.style.fill)
                          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  })
                  
                  d3.selectAll("#output svg")[0].forEach( function(d, i) {
                      t = d3.selectAll("#output").selectAll(".tile")[0][i*(N*M) + index];
                      d3.select(d).append("rect")
                          .attr("class", "zoom")
                          .attr("x", data.attr("x") - 16*(x(1) - x(0))/2) // column number
                          .attr("y", data.attr("y") - 16*(y(1) - y(0))/2) // row number
                          .attr("width", 16*(x(1) - x(0)))
                          .attr("height", 16*(y(1) - y(0)))                  
                          .style("fill", t.style.fill)
                          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  })
                    })
              .on("mouseout", function(){
                   // remove the added rectangles (class = zoom)
                   d3.selectAll("#inputs").selectAll(".zoom").remove()
                   d3.selectAll("#output").selectAll(".zoom").remove()
                   });
                   
          svg.append("text")
            .attr("class", "title")
            .attr("x", width/2)
            .attr("y", -margin.top/2)
            .attr("text-anchor", "middle")
            .text(title); 
        });
    });
};

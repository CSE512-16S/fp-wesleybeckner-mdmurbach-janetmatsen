var a;
function generate_slider(title) {
    var margin = {top: 30, right: 10, bottom: 30, left: 10},
        width = .18*window.innerWidth - margin.left - margin.right,
        height = 70 - margin.bottom - margin.top;;

    var x = d3.scale.ordinal()
        .domain([1,2,3,4])
        .rangePoints([0, width]);
        
    var brush = d3.svg.brush()
        .x(x)
        .on("brush", brushed);

    var svg = d3.select(".slider").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickSize(0)
          .tickPadding(12))
      .select(".domain")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "halo");
        
    var slider = svg.append("g")
        .attr("class", "slider");
        
    var slider_value = d3.select(".slider").append("text")
    
    svg.append("text")
        .attr("class", "title")
        .attr("x", width/2)
        .attr("y", -margin.top/2)
        .attr("text-anchor", "middle")
        .text(title);

    slider.selectAll(".extent,.resize")
        .remove();

    var handle = slider.append("circle")
        .attr("class", "handle")
        .attr("transform", "translate(0," + height / 2 + ")")
        .attr("r", 7);

    slider
        .call(brush.extent([3]))
        .call(brush.event);

    // 
    function brushed() {
      var value = brush.extent()[0];

      if (d3.event.sourceEvent) { // not a programmatic event
        value = Math.round(4*d3.mouse(this)[0]/x(4) + 1);
        console.log(value)
        if(value > 4) {
            value = 4;
        } else if(value < 1) {
            value = 1;            
        }
      
      brush.extent([value, value]);
      }

      handle.attr("cx", x(value));
      d3.select(".title").text(title + ": " + value);
}
    
}
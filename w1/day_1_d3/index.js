
var width = 1480;
var height = 700;

var canvas = d3.select("#myVis")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background-color", "#34b1eb");

var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

var centerX = width / 2;
var centerY = height / 2 + 200;

var radInc = 20;

colors.forEach(function(color, index) {
        console.log("Creating arc for color:", color);
        var arc = d3.arc()
                    .innerRadius(100 + index * radInc)
                    .outerRadius(120 + index * radInc)
                    .startAngle(-Math.PI / 2) // Start angle in radians (half circle)
                    .endAngle(Math.PI / 2); // End angle in radians (half circle)

        canvas.append("path")
                .attr("d", arc)
                .attr("fill", color)
                .attr("transform", "translate(" + centerX + "," + centerY + ")");
});

var circle = canvas.append("circle")
        .attr("cx", 120)
        .attr("cy", 120)
        .attr("r", 100)
        .attr("fill", "yellow")

function animateCircleRightToLeft() {
        circle.transition()
                .duration(2000)
                .attr("cx", width - 120) // Assuming the circle's radius is 100, so we stop a bit before the edge
                .on("end", animateCircleLeftToRight); // Once this animation ends, call the function to move it back
}
            
function animateCircleLeftToRight() {
circle.transition()
        .duration(2000)
        .attr("cx", 120) // Move the circle back to its starting position
        .on("end", animateCircleRightToLeft); // Once this animation ends, call the function to move it right again
}

// Start the animation loop
animateCircleLeftToRight();
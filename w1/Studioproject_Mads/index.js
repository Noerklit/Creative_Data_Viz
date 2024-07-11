var width = 1400;
var height = 630;
var margin = { top: 20, right: 20, bottom: 30, left: 60 };

var canvas = d3.select("#canvas")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("background-color", "#34b1eb")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dataObject = [
    {
        color: "#5a5e5c", // Grey
        soundLevel: 3,
        obsObject: 0,
        time: "12:51",
        shapeCategory: "Non living object"
    },
    {
        color: "#5a5e5c", // Grey
        soundLevel: 2,
        obsObject: 3,
        time: "12:52",
        shapeCategory: "Non living object"
    },
    {
        color: "#bbbdbc", // Light Grey
        soundLevel: 5,
        obsObject: 0,
        time: "12:52",
        shapeCategory: "Living object"
    },
    {
        color: "#f5f7f6", // White
        soundLevel: 2,
        obsObject: 0,
        time: "12:53",
        shapeCategory: "Non living object"
    },
    {
        color: "#078adb", // Light Blue
        soundLevel: 2,
        obsObject: 4,
        time: "12:53",
        shapeCategory: "Nothing"
    },
    {
        color: "#5a5e5c", // Grey
        soundLevel: 5,
        obsObject: 1,
        time: "12:54",
        shapeCategory: "Living object"
    },
    {
        color: "#f5f7f6", // White
        soundLevel: 1,
        obsObject: 1,
        time: "12:55",
        shapeCategory: "Non living object"
    },
    {
        color: "#5a5e5c", // Grey
        soundLevel: 5,
        obsObject: 3,
        time: "12:55",
        shapeCategory: "Non living object"
    },
    {
        color: "#5a5e5c", // Grey
        soundLevel: 5,
        obsObject: 0,
        time: "12:57",
        shapeCategory: "Non living object"
    },
    {
        color: "#5a5e5c", // Grey
        soundLevel: 3,
        obsObject: 5,
        time: "12:59",
        shapeCategory: "Living object"
    },
    {
        color: "#f5f7f6", // White
        soundLevel: 5,
        obsObject: 2,
        time: "13:00",
        shapeCategory: "Non living object"
    },
    {
        color: "#f5f7f6", // White
        soundLevel: 2,
        obsObject: 1,
        time: "13:02",
        shapeCategory: "Living object"
    },
]
var times = dataObject.map (d => d.time)
var timeSet = new Set(times)

var yScale = d3.scaleBand()
                .domain(timeSet)
                .range([height - 50, 0]);

var xScale = d3.scaleLinear()
                .domain([-1, 5])
                .range([0, width - 50])

var xAxis = d3.axisBottom(xScale)
            .ticks(6)

var yAxis = d3.axisLeft(yScale)

canvas.append("g")
    .attr("transform", `translate(0, ${height - 50})`)
    .call(xAxis);

canvas.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .text("Amount of objects observed in the sky");


canvas.append("g")
    .attr("transform", "translate(0, 0)")
    .call(yAxis);

canvas.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2 + 25)
    .attr("y", -40)
    .text("Time");

var tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "1px solid black")
    .style("padding", "5px");

function determineShape (shapeCategory) {
    switch(shapeCategory) {
        case "Non living object":
            return "circle";
        case "Living object":
            return "ellipse";
        case "Nothing":
            return "rect";
        case "Concept":
            return "polygon";
    }       
}
                
function createShape (color, soundLevel, obsObject, time, shapeCategory) {
    const shapeType = determineShape(shapeCategory);
    let shape;

    switch (shapeType) {
        case "circle":
            shape = canvas.append("circle")
                .attr("cx", xScale(obsObject))
                .attr("cy",  yScale(time) + yScale.bandwidth() / 2)
                .attr("r", soundLevel * 10)
                .attr("fill", color)
                .attr("fill-opacity", 0.8)
                break;
        case "rect":
            shape = canvas.append("rect")
                .attr("x", xScale(obsObject) - (soundLevel * 20) / 2)
                .attr("y", yScale(time) + yScale.bandwidth() / 2 - (soundLevel * 20) / 2)
                .attr("height", soundLevel * 20)
                .attr("width", soundLevel * 20)
                .attr("fill", color)
                .attr("fill-opacity", 0.8)
                break;
        case "ellipse":
            shape = canvas.append("ellipse")
            .attr("cx", xScale(obsObject))
            .attr("cy", yScale(time) + yScale.bandwidth() / 2)
            .attr("rx", soundLevel * 10)
            .attr("ry", soundLevel * 8)
            .attr("fill", color)
            .attr("fill-opacity", 0.8)
            break;     
    }

    shape.on("mouseover", function(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`Color: ${color}<br>Sound Level: ${soundLevel}<br>Object: ${obsObject}<br>Time: ${time}<br>Category: ${shapeCategory}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
}   

dataObject.forEach(obj => {
    createShape(obj.color, obj.soundLevel, obj.obsObject, obj.time, obj.shapeCategory);
});
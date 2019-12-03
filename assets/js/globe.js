﻿var width =66,
    height = 66,
    speed = 1e-2,
    start = Date.now();

var sphere = { type: "Sphere" };

var projection = d3.geo.orthographic()
    .scale(height / 2.1)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .precision(.5);

var graticule = d3.geo.graticule();

var canvas = d3.select("#globe").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);

d3.json("assets/js/world-110m.json", function (error, topo) {
    if (error) throw error;

    var land = topojson.feature(topo, topo.objects.land),
        borders = topojson.mesh(topo, topo.objects.countries, function (a, b) { return a !== b; }),
        grid = graticule();

    d3.timer(function () {
        projection.rotate([speed * (Date.now() - start), -15]);

        context.clearRect(0, 0, width, height);

        context.beginPath();
        path(sphere);
        context.lineWidth = 1;
        context.strokeStyle = "#363738";
        context.stroke();

        context.beginPath();
        path(sphere);
        context.fillStyle = "#363738";
        context.fill();

        context.beginPath();
        path(land);
        context.fillStyle = "#e8e8e8";
        context.fill();

        //context.beginPath();
        //path(borders);
        //context.lineWidth = .5;
        //context.strokeStyle = "#fff";
        //context.stroke();

        //context.beginPath();
        //path(grid);
        //context.lineWidth = .5;
        //context.strokeStyle = "rgba(119,119,119,.5)";
        //context.stroke();
    });
});

d3.select(self.frameElement).style("height", height + "px");
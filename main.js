// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};
const radi = Math.min(MAX_WIDTH, MAX_HEIGHT) / 2;

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;



let svg = d3.select("#graph1")
    .append("svg")
    .attr("height", graph_1_height)
    .attr("width", graph_1_width)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
let countRef = svg.append("g");

d3.csv("./../data/q1data.csv").then(function (data) {
console.log(data)

let x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return parseInt(d.Global_Sales); })])
        .range([0, graph_1_width - margin.left - margin.right]);
        
let y = d3.scaleBand()
        .domain(data.map(function(d) { return d.Name; }))
        .range([0, graph_1_height - margin.top - margin.bottom])
        .padding(0.1);  
        
svg.append("g")
        .call(d3.axisLeft(y).tickSize(0).tickPadding(10));
        
let bars = svg.selectAll("rect").data(data);

      
let color = d3.scaleOrdinal()
    .domain(data.map(function(d) { return d.Name }))
    .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 10));
    
bars.enter()
        .append("rect")
        .merge(bars)
        .attr("fill", function(d) { return color(d.Name) })
        .attr("x", x(0))
        .attr("y", function(d) { return y(d.Name) } ) 
        .attr("width", function(d) { return x(parseInt(d.Global_Sales))})
        .attr("height",  y.bandwidth()); 
        
let counts = countRef.selectAll("text").data(data);

    
    counts.enter()
        .append("text")
        .merge(counts)
        .attr("x", function(d) { return 8 + x(parseInt(d.Global_Sales))})      
        .attr("y", function(d) { return 8 + y(d.Name)})       
        .style("text-anchor", "start")
        .text(function(d) { return d.Global_Sales});   
        
svg.append("text")
        
        .style("text-anchor", "middle")
        .text("Video Game");

    
    svg.append("text")
        .attr("transform", `translate(${margin.left + 130}, ${margin.top + 30 })`)      
        .style("text-anchor", "middle")
        .text("Global Sales (millions)");

    
    svg.append("text")
        .attr("transform", `translate(${margin.left + 80}, ${margin.top - 50})`)       
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Top 10 Games of All Time");
});

let svg1 = d3.select("#graph2")
      .append("svg")
      .attr("width", graph_2_width)
      .attr("height", graph_2_height)
     
const proj1 = d3.geoRobinson().scale(110).translate([graph_2_width /2.16, graph_2_height /1.6]);
const path = d3.geoPath(proj1);

const g = svg1.append("g");

d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then((data) => {
    
    const cntries = topojson.feature(data, data.objects.countries);
    
    g.selectAll("path").data(cntries.features)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .style('stroke', 'white')
        .style('stroke-width', 0.1)
        .style('fill', d => {return "green"});
      
        
    d3.csv("./../data/q2df.csv").then(function (data) {
        g.selectAll("text").data(data)
            .enter()
            .append("text")
            .text(function(d) {
                return d.Genre;
                })
            .attr("x", function(d) {return proj1([d.longitude, d.latitude])[0] + 5;})
            .attr("y", function(d) {return proj1([d.longitude, d.latitude])[1] + 15;})
            .attr("class","labels");   
            });  
    });   
    
    
let svg2 = d3.select("#graph3")
      .append("svg")
      .attr("width", graph_3_width)
      .attr("height", graph_3_height)
     

const g2 = svg2.append("g");

d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then((data) => {
    
    const cntries = topojson.feature(data, data.objects.countries);
    
    g2.selectAll("path").data(cntries.features)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .style('stroke', 'white')
        .style('stroke-width', 0.1)
        .style('fill', d => {return "green"});
        
      
        
    d3.csv("./../data/q3df.csv").then(function (data) {
        g2.selectAll("text").data(data)
            .enter()
            .append("text")
            .text(function(d) {
                return d.Publisher;
                })
            .attr("x", function(d) {return proj1([d.longitude, d.latitude])[0] + 5;})
            .attr("y", function(d) {return proj1([d.longitude, d.latitude])[1] + 15;})
            .attr("class","labels");   
            });  
    });   
// Exercise 5.3 - Donut Chart


// Load CSV
d3.csv("data/Data_exercise 5.3.csv", d => {

    return {
        category: d.Screensize_Category,
        count: +d.Count
    };

}).then(data => {

    console.log(data);

    drawDonutChart(data);

});


// Draw donut chart
const drawDonutChart = data => {

    // Chart size
    const width = 800;
    const height = 500;

    // Radius based on shortest side
    const radius = Math.min(width, height) / 2 - 50;


    // Colour scale
    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.category))
        .range(d3.schemeTableau10);


    // Calculate pie angles
    const pie = d3.pie()
        .sort(null)
        .value(d => d.count);

    const pieData = pie(data);


    // Create arc generator
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius)
        .padAngle(0.02)
        .cornerRadius(5);


    // Create SVG
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");


    // Move chart to centre
    const chart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${width / 2}, ${height / 2})`
        );


    // Draw donut slices
    chart
        .selectAll("path")
        .data(pieData)
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", d => colorScale(d.data.category));


    // Add labels
    chart
        .selectAll("text")
        .data(pieData)
        .join("text")
        .attr(
            "transform",
            d => `translate(${arcGenerator.centroid(d)})`
        )
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.data.category)
        .style("font-size", "14px")
        .style("fill", "white");

};
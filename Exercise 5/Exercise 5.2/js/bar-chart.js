// Exercise 5.1 - Vertical Bar Chart


// Load CSV
d3.csv("data/Data_exercise 5.1-1.csv", d => {

    return {
        screenType: d.Screen_Tech,
        energy: +d["Mean(Labelled energy consumption (kWh/year))"]
    };

}).then(data => {

    // Sort highest to lowest
    data.sort((a, b) => b.energy - a.energy);

    console.log(data);

    // Draw chart
    drawBarChart(data);

});


// Draw Bar Chart
const drawBarChart = data => {

    // Margins
    const margin = {
        top: 40,
        right: 30,
        bottom: 60,
        left: 70
    };

    const width = 800;
    const height = 500;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    // Create SVG
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");


    // Create inner chart
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // X scale
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenType))
        .range([0, innerWidth])
        .padding(0.2);


    // Y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy)])
        .range([innerHeight, 0])
        .nice();


    // X axis
    const bottomAxis = d3.axisBottom(xScale);

    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);


    // Y axis
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .call(leftAxis);


    // Y-axis label
    svg
        .append("text")
        .text("Energy Consumption (kWh/year)")
        .attr("x", 15)
        .attr("y", 20)
        .style("font-size", "14px");


    // Draw bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.screenType))
        .attr("y", d => yScale(d.energy))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.energy))
        .attr("fill", "steelblue");

};


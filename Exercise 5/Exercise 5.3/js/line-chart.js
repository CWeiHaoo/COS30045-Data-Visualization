// Exercise 5.2 - Scatter Plot and Line Chart


// Load CSV
d3.csv("data/ARE_Spot_Prices.csv", d => {

    return {
        year: +d.Year,
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };

}).then(data => {

    console.log(data);

    drawLineChart(data);

});


// Draw line chart
const drawLineChart = data => {

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


    // SVG
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");


    // Inner chart
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // X scale
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);


    // Y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0])
        .nice();


    // X axis
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));


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
        .text("Average Price ($ per MWh)")
        .attr("x", 15)
        .attr("y", 20)
        .style("font-size", "14px");


    // X-axis label
    svg
        .append("text")
        .text("Year")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px");


    // Scatter plot
    innerChart
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", "steelblue");


    // Line generator
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));


    // Draw line
    innerChart
        .append("path")
        .datum(data)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

};
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

const drawBarChart = data => {

    const barHeight = 40;

    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + 10))
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "steelblue");
};

d3.csv("assets/data/tvBrandCount.csv", d => {

    return {
        brand: d.brand,
        count: +d.count
    };

}).then(data => {

    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));

    data.sort((a, b) => b.count - a.count);

    drawBarChart(data);

});
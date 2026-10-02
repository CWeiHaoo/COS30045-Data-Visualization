const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 700")
    .style("border", "1px solid black");

const drawBarChart = data => {

    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 700])
        .padding(0.1);

    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
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

    console.log(
        d3.max(data, d => d.count)
    );

    console.log(
        d3.min(data, d => d.count)
    );

    console.log(
        d3.extent(data, d => d.count)
    );

    //sort the data from highest to lowest
    data.sort(
        (a, b) => b.count - a.count
    );

    drawBarChart(data);

});
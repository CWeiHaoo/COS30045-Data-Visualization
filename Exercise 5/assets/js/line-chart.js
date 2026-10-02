const drawLineChart = data => {

    const margin = {
        top: 50,
        right: 30,
        bottom: 70,
        left: 80
    };

    const width = 900;
    const height = 500;

    const innerWidth =
        width - margin.left - margin.right;

    const innerHeight =
        height - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid #ddd");

    const innerChart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );

    const xScale = d3.scaleLinear()
        .domain(
            d3.extent(data, d => d.year)
        )
        .range([
            0,
            innerWidth
        ]);

    const yScale = d3.scaleLinear()
        .domain([
            0,
            d3.max(data, d => d.averagePrice)
        ])
        .range([
            innerHeight,
            0
        ])
        .nice();

    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    innerChart
        .append("g")
        .attr("class", "axis")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(bottomAxis);

    const leftAxis =
        d3.axisLeft(yScale);

    innerChart
        .append("g")
        .attr("class", "axis")
        .call(leftAxis);

    innerChart
        .selectAll(".data-point")
        .data(data)
        .join("circle")
        .attr("class", "data-point")
        .attr("r", 4)
        .attr(
            "cx",
            d => xScale(d.year)
        )
        .attr(
            "cy",
            d => yScale(d.averagePrice)
        );

    const lineGenerator = d3.line()
        .x(
            d => xScale(d.year)
        )
        .y(
            d => yScale(d.averagePrice)
        );

    innerChart
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", lineGenerator);

    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height - 15)
        .attr("text-anchor", "middle")
        .text("Year");

    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Average Price ($ per MWh)");

};

d3.csv("data/ARE_Spot_Prices (1).csv", d => {

    return {

        year: +d.Year,

        averagePrice:
            +d["Average Price (notTas-Snowy)"]

    };

}).then(data => {

    console.log("Exercise 5.2 Data:", data);

    drawLineChart(data);

});
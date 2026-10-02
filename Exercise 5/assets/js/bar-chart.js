const drawBarChart = data => {

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

    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid #ddd");

    const innerChart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenType))
        .range([0, innerWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([
            0,
            d3.max(data, d => d.energy)
        ])
        .range([
            innerHeight,
            0
        ])
        .nice();

    //x axis
    const bottomAxis = d3.axisBottom(xScale);

    innerChart
        .append("g")
        .attr("class", "axis")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(bottomAxis);

    //y axis
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .attr("class", "axis")
        .call(leftAxis);

    //bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr(
            "x",
            d => xScale(d.screenType)
        )
        .attr(
            "y",
            d => yScale(d.energy)
        )
        .attr(
            "width",
            xScale.bandwidth()
        )
        .attr(
            "height",
            d => innerHeight - yScale(d.energy)
        );

    //y-axis label
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    //x-axis label
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height - 15)
        .attr("text-anchor", "middle")
        .text("Screen Technology");

};

d3.csv("data/Data_exercise 5.1-1 (1).csv", d => {

    return {

        screenType: d.Screen_Tech,
        energy:
            +d["Mean(Labelled energy consumption (kWh/year))"]
    };

}).then(data => {

    console.log("Exercise 5.1 Data:", data);
    data.sort(
        (a, b) => b.energy - a.energy
    );
    drawBarChart(data);

});
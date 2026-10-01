const drawScatterplot = data => {

    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    innerChartS = svg
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );

    const maxStar = d3.max(
        data,
        d => d.star
    );

    const maxEnergy = d3.max(
        data,
        d => d.energyConsumption
    );

    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth])
        .nice();

    yScaleS
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    colorScale
        .domain(["lcd", "led", "oled"])
        .range(d3.schemeTableau10);

    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr(
            "fill",
            d => colorScale(d.screenTech.toLowerCase())
        )
        .attr("opacity", 0.5);

    const bottomAxis = d3.axisBottom(xScaleS);

    innerChartS
        .append("g")
        .attr("class", "axis")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(bottomAxis);

    const leftAxis = d3.axisLeft(yScaleS);

    innerChartS
        .append("g")
        .attr("class", "axis")
        .call(leftAxis);


    //x-axis label
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height - 15)
        .attr("text-anchor", "middle")
        .text("Star Rating");


    //y-axislabel
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    const legend = innerChartS
        .append("g")
        .attr(
            "transform",
            `translate(${innerWidth - 100}, 10)`
        );

    const legendItems = legend
        .selectAll(".legend-item")
        .data(colorScale.domain())
        .join("g")
        .attr("class", "legend-item")
        .attr(
            "transform",
            (d, i) => `translate(0, ${i * 20})`
        );

    legendItems
        .append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", d => colorScale(d));

    legendItems
        .append("text")
        .attr("x", 18)
        .attr("y", 10)
        .text(d => d.toUpperCase())
        .style("font-size", "12px");

};
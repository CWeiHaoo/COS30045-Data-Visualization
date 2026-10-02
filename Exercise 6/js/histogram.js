const drawHistogram = data => {

    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );


    //bins
    const bins = binGenerator(data);

    console.log("Bins:", bins);

    //bin limit
    const binsMin = bins[0].x0;

    const binsMax =
        bins[bins.length - 1].x1;

    const binsMaxLength =
        d3.max(bins, d => d.length);

    xScale
        .domain([binsMin, binsMax])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    innerChart
        .selectAll(".bar")
        .data(bins)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr(
            "width",
            d => xScale(d.x1) - xScale(d.x0)
        )
        .attr(
            "height",
            d => innerHeight - yScale(d.length)
        )
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor);

    const bottomAxis = d3.axisBottom(xScale);

    innerChart
        .append("g")
        .attr("class", "axis")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(bottomAxis);

    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .attr("class", "axis")
        .call(leftAxis);

    //y axis
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height - 15)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    //y axis
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Frequency");

};
// Exercise 6.2 - Histogram Filters
const populateFilters = data => {

    // Create filter buttons
    const buttons = d3.select("#filters_screen")
        .selectAll("button")
        .data(screenFilters)
        .join("button")
        .attr("id", d => d.id)
        .text(d => d.label)
        .classed("active", d => d.isActive)
        .on("click", function(event, d) {

            // Update active filter
            screenFilters.forEach(filter => {
                filter.isActive = filter.id === d.id;
            });

            // Update button style
            buttons
                .classed("active", filter => filter.isActive);

            // Update histogram
            updateHistogram(d.id);
        });


    const updateHistogram = id => {

        let updatedData = data;

        // Filter by screen technology
        if (id !== "all") {
            updatedData = data.filter(
                d => d.screenTech.toLowerCase() === id
            );
        }

        // Create new bins
        const updatedBins = binGenerator(updatedData);

        // Update histogram bars
        d3.select("#histogram")
            .selectAll(".bar")
            .data(updatedBins)
            .join("rect")
            .attr("class", "bar")
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .transition()
            .duration(500)
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr(
                "width",
                d => xScale(d.x1) - xScale(d.x0)
            )
            .attr(
                "height",
                d => innerHeight - yScale(d.length)
            );
    };
};


// Exercise 6.4 - Create Tooltip
const createTooltip = () => {

    const tooltip = innerChartS
        .append("g")
        .attr("id", "tooltip")
        .style("opacity", 0);

    // Tooltip rectangle
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", barColor)
        .attr("opacity", 0.8);

    // Tooltip text
    tooltip
        .append("text")
        .attr("id", "tooltip-text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("fill", "white")
        .text("Screen Size");
};


// Exercise 6.4 - Mouse Events
const handleMouseEvents = () => {

    innerChartS
        .selectAll("circle")

        .on("mouseenter", function(event, d) {

            console.log("Mouse entered:", d);

            // Get circle position
            const cx =
                +event.currentTarget.getAttribute("cx");

            const cy =
                +event.currentTarget.getAttribute("cy");

            // Update tooltip text
            d3.select("#tooltip-text")
                .text(`Screen Size: ${d.screenSize} inches`);

            // Position and show tooltip
            d3.select("#tooltip")
                .attr(
                    "transform",
                    `translate(${cx + 10}, ${cy - tooltipHeight - 10})`
                )
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

        .on("mouseleave", function(event, d) {

            console.log("Mouse left:", d);

            // Hide tooltip
            d3.select("#tooltip")
                .transition()
                .duration(200)
                .style("opacity", 0);
        });
};
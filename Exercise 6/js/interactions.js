const populateFilters = data => {

    const buttons = d3.select("#filters_screen")
        .selectAll("button")
        .data(screenFilters)
        .join("button")
        .attr("id", d => d.id)
        .text(d => d.label)
        .classed("active", d => d.isActive)
        .on("click", function(event, d) {

            screenFilters.forEach(filter => {
                filter.isActive = filter.id === d.id;
            });

            buttons
                .classed("active", filter => filter.isActive);

            updateHistogram(d.id);
        });


    const updateHistogram = id => {

        let updatedData = data;

        if (id !== "all") {
            updatedData = data.filter(
                d => d.screenTech.toLowerCase() === id
            );
        }

        const updatedBins = binGenerator(updatedData);

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

const createTooltip = () => {

    const tooltip = innerChartS
        .append("g")
        .attr("id", "tooltip")
        .style("opacity", 0);

    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", barColor)
        .attr("opacity", 0.8);

    tooltip
        .append("text")
        .attr("id", "tooltip-text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("fill", "white")
        .text("Screen Size");
};

const handleMouseEvents = () => {

    innerChartS
        .selectAll("circle")

        .on("mouseenter", function(event, d) {

            console.log("Mouse entered:", d);

            const cx =
                +event.currentTarget.getAttribute("cx");

            const cy =
                +event.currentTarget.getAttribute("cy");

            d3.select("#tooltip-text")
                .text(`Screen Size: ${d.screenSize} inches`);

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
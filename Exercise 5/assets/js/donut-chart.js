const drawDonutChart = data => {

    const width = 900;
    const height = 500;

    const radius =
        Math.min(width, height) / 2 - 50;
    const colorScale = d3.scaleOrdinal()
        .domain(
            data.map(d => d.category)
        )
        .range(d3.schemeTableau10);
    const pie = d3.pie()
        .sort(null)
        .value(d => d.count);
    const pieData =
        pie(data);
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius)
        .padAngle(0.02)
        .cornerRadius(5);
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr(
            "viewBox",
            `0 0 ${width} ${height}`
        )
        .style(
            "border",
            "1px solid #ddd"
        );
    const chart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${width / 2}, ${height / 2})`
        );
    chart
        .selectAll("path")
        .data(pieData)
        .join("path")
        .attr(
            "d",
            arcGenerator
        )
        .attr(
            "fill",
            d => colorScale(d.data.category)
        );
    chart
        .selectAll(".donut-label")
        .data(pieData)
        .join("text")
        .attr(
            "class",
            "donut-label"
        )
        .attr(
            "transform",
            d => `translate(${arcGenerator.centroid(d)})`
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .attr(
            "dominant-baseline",
            "middle"
        )
        .text(
            d => d.data.category
        );
};

d3.csv(
    "data/Data_exercise 5.3 (1).csv",
    d => {
        return {
            category:
                d.Screensize_Category,

            count:
                +d.Count
        };
    }
).then(data => {
    console.log(
        "Exercise 5.3 Data:",
        data
    );
    drawDonutChart(data);
});
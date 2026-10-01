d3.csv("data/Ex6_TVdata_withStar.csv", d3.autoType)
    .then(data => {

        console.log("TV data:", data);

        drawHistogram(data);

        populateFilters(data);

        drawScatterplot(data);

    });
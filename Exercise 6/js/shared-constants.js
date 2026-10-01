// Chart dimensions
const margin = {
    top: 40,
    right: 30,
    bottom: 70,
    left: 80
};

const width = 1000;
const height = 500;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;


// Colours
const barColor = "steelblue";
const bodyBackgroundColor = "white";


// Scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


// Histogram bins
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);


// Screen type filters
const screenFilters = [
    {
        id: "all",
        label: "All",
        isActive: true
    },
    {
        id: "lcd",
        label: "LCD",
        isActive: false
    },
    {
        id: "led",
        label: "LED",
        isActive: false
    },
    {
        id: "oled",
        label: "OLED",
        isActive: false
    }
];

const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

let innerChartS;

const colorScale = d3.scaleOrdinal();

const tooltipWidth = 160;
const tooltipHeight = 60;
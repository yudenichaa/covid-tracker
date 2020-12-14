import numeral from "numeral";

export default {
    worldwideValue: "Worldwide",
    lastDays: {
        min: 1,
        max: 100,
    },
    mapCircles: {
        cases: {
            color: "#91281e",
            multiplier: 0.15,
        },
        recovered: {
            color: "#4bb44b",
            multiplier: 0.15,
        },
        deaths: {
            color: "#91281e",
            multiplier: 0.15,
        }
    },
    chartOptions: {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 5,
            },
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem) =>
                    numeral(tooltipItem.value).format("0,00a"),
            },
        },
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        callback: (value) => numeral(value).format("0,00a"),
                    },
                },
            ],
        },
    },
};

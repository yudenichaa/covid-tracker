import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Select, MenuItem, TextField } from "@material-ui/core";
import config from "../../config";
import "./schedule.scss";

export default function Schedule({ selectedCountry, displayInfo }) {
    const [countryHistory, setCountryHistory] = useState(null);
    const [lastDays, setLastDays] = useState(30);
    const [displayType, setDisplayType] = useState("By days");

    const onDisplayTypeChange = useCallback((event) =>
        setDisplayType(event.target.value)
    );

    const onLastDaysChange = useCallback((event) => {
        const lastDays = +event.target.value;
        lastDays > config.lastDays.max
            ? setLastDays(config.lastDays.max)
            : setLastDays(lastDays);
    });

    useEffect(() => {
        const fetchDays = displayType == "By days" ? lastDays + 1 : lastDays;
        const fetchURL =
            selectedCountry.country == config.worldwideValue
                ? `https://disease.sh/v3/covid-19/historical/all?lastdays=${fetchDays}`
                : `https://disease.sh/v3/covid-19/historical/${selectedCountry.country}?lastdays=${fetchDays}`;
        fetch(fetchURL)
            .then((response) => response.json())
            .then((data) => {
                setCountryHistory(
                    selectedCountry.country == config.worldwideValue
                        ? data
                        : data.timeline
                );
            })
            .catch((error) => console.error(error));
    }, [selectedCountry, lastDays]);

    const getChartData = () => {
        if (countryHistory) {
            switch (displayType) {
                case "By days":
                    let lastDate = null;
                    const chartXData = [];
                    const chartYData = [];
                    for (const date in countryHistory[displayInfo]) {
                        if (lastDate) {
                            chartYData.push(date);
                            chartXData.push(
                                countryHistory[displayInfo][date] -
                                    countryHistory[displayInfo][lastDate]
                            );
                        }
                        lastDate = date;
                    }
                    return { x: chartXData, y: chartYData };
                case "Total":
                    return {
                        x: Object.values(countryHistory[displayInfo]),
                        y: Object.keys(countryHistory[displayInfo]),
                    };
                default:
                    console.error("Unknown display type. Schedule");
                    return { x: [], y: [] };
            }
        } else {
            return { x: [], y: [] };
        }
    };

    const chartData = useMemo(() => {
        const data = getChartData();
        return {
            labels: data.y,
            datasets: [
                {
                    label: "Cases",
                    backgroundColor: "#91281e44",
                    borderColor: "#91281e",
                    data: data.x,
                },
            ],
        };
    }, [countryHistory, displayType, lastDays, displayInfo]);

    return (
        <div className="schedule">
            <div className="schedule__controls">
                <div className="schedule__form-group">
                    <label className="schedule__label">Display type: </label>
                    <Select
                        variant="outlined"
                        value={displayType}
                        onChange={onDisplayTypeChange}
                    >
                        <MenuItem value="By days">By days</MenuItem>
                        <MenuItem value="Total">Total</MenuItem>
                    </Select>
                </div>
                <div className="schedule__form-group">
                    <label className="schedule__label">Last days: </label>
                    <TextField
                        value={lastDays}
                        onChange={onLastDaysChange}
                        variant="outlined"
                        type="number"
                        inputProps={{
                            min: config.lastDays.min,
                            max: config.lastDays.max,
                        }}
                    />
                </div>
            </div>
            <div className="schedule__chart-container">
                <Line data={chartData} options={config.chartOptions} />
            </div>
        </div>
    );
}

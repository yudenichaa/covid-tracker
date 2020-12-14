import React, { useState, useEffect, useCallback } from "react";
import Header from "../Header";
import Summary from "../Summary";
import Schedule from "../Schedule";
import Map from "../Map";
import CasesByCountry from "../CasesByCountry";
import config from "../../config";
import "./app.scss";

export default function () {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const countries = await (
                    await fetch("https://disease.sh/v3/covid-19/countries")
                ).json();
                const worldwide = await (
                    await fetch("https://disease.sh/v3/covid-19/all")
                ).json();
                worldwide.country = config.worldwideValue;
                setCountries([worldwide, ...countries]);
                setSelectedCountry(worldwide);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const onCountryChange = useCallback((event, newValue) => {
        if (newValue) {
            setSelectedCountry(newValue);
        }
    }, []);

    const [displayInfo, setDisplayInfo] = useState("cases");

    const onDisplayInfoChange = useCallback((event) =>
        setDisplayInfo(event.target.value)
    );

    const onSummaryCardClick = useCallback((info) => setDisplayInfo(info));

    return (
        <div className="app">
            <div className="app__content">
                <Header
                    countries={countries}
                    selectedCountry={selectedCountry}
                    onCountryChange={onCountryChange}
                    displayInfo={displayInfo}
                    onDisplayInfoChange={onDisplayInfoChange}
                />
                {selectedCountry && (
                    <Summary
                        onSummaryCardClick={onSummaryCardClick}
                        selectedCountry={selectedCountry}
                        displayInfo={displayInfo}
                    />
                )}
                {selectedCountry && (
                    <Schedule
                        displayInfo={displayInfo}
                        selectedCountry={selectedCountry}
                    />
                )}
                {selectedCountry && (
                    <Map
                        displayInfo={displayInfo}
                        selectedCountry={selectedCountry}
                        countries={countries}
                    />
                )}
                <CasesByCountry
                    countries={countries}
                    displayInfo={displayInfo}
                />
            </div>
        </div>
    );
}

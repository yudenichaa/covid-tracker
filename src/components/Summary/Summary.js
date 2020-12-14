import React, { useCallback } from "react";
import numeral from "numeral";
import "./summary.scss";

export default function Summary({
    selectedCountry,
    onSummaryCardClick,
    displayInfo,
}) {
    const onCasesCardClick = useCallback(() => onSummaryCardClick("cases"));
    const onRecoveredCardClick = useCallback(() =>
        onSummaryCardClick("recovered")
    );
    const onDeathsCardClick = useCallback(() => onSummaryCardClick("deaths"));

    return (
        <div className="summary">
            <div
                onClick={onCasesCardClick}
                className={`summary__card ${
                    displayInfo == "cases" && "summary__card_highlight"
                }`}
            >
                <h2 className="summary__card-headline">Cases</h2>
                <p className="summary__card-title summary__card-title_color_red">
                    {numeral(selectedCountry.todayCases).format("0.00a")} today
                </p>
                <p className="summary__card-secondary-title">
                    {numeral(selectedCountry.cases).format("0.00a")} total
                </p>
            </div>
            <div
                onClick={onRecoveredCardClick}
                className={`summary__card ${
                    displayInfo == "recovered" && "summary__card_highlight"
                }`}
            >
                <h2 className="summary__card-headline">Recovered</h2>
                <p className="summary__card-title summary__card-title_color_green">
                    {numeral(selectedCountry.todayRecovered).format("0.00a")} today
                </p>
                <p className="summary__card-secondary-title">
                    {numeral(selectedCountry.recovered).format("0.00a")} total
                </p>
            </div>
            <div
                onClick={onDeathsCardClick}
                className={`summary__card ${
                    displayInfo == "deaths" && "summary__card_highlight"
                }`}
            >
                <h2 className="summary__card-headline">Deaths</h2>
                <p className="summary__card-title summary__card-title_color_red">
                    {numeral(selectedCountry.todayDeaths).format("0.00a")} today
                </p>
                <p className="summary__card-secondary-title">
                    {numeral(selectedCountry.deaths).format("0.00a")} total
                </p>
            </div>
        </div>
    );
}

import React, { useMemo } from "react";
import numeral from "numeral";
import "./cases-by-country.scss";

export default function CasesByCountry({ countries, displayInfo }) {
    const sortedCountries = useMemo(
        () =>
            Array.from(countries).sort(
                (a, b) => b[displayInfo] - a[displayInfo]
            ),
        [countries, displayInfo]
    );

    return (
        <div className="cases-by-country">
            <h2 className="cases-by-country__headline">Total by country</h2>
            <table className="cases-by-country__table">
                <tbody>
                    {sortedCountries.map((country) => {
                        return (
                            <tr
                                className="cases-by-country__table-row"
                                key={country.country}
                            >
                                <td>{country.country}</td>
                                <td>
                                    {numeral(country[displayInfo]).format(
                                        "0,00a"
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

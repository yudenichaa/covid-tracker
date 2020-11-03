import React from "react";
import { Select, MenuItem, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./header.scss";

export default function Header({
    countries,
    selectedCountry,
    onCountryChange,
    displayInfo,
    onDisplayInfoChange,
}) {
    return (
        <header className="header">
            <h1 className="header__headline">COVID-19 Tracker</h1>
            <div className="header__controls">
                <Select
                    value={displayInfo}
                    onChange={onDisplayInfoChange}
                    variant="outlined"
                >
                    <MenuItem value="cases">Cases</MenuItem>
                    <MenuItem value="recovered">Recovered</MenuItem>
                    <MenuItem value="deaths">Deaths</MenuItem>
                </Select>
                <Autocomplete
                    options={countries}
                    getOptionLabel={(option) => option.country}
                    value={selectedCountry}
                    onChange={onCountryChange}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                    )}
                />
            </div>
        </header>
    );
}

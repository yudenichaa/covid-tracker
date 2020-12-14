import React from "react";
import {
    MapContainer,
    TileLayer,
    MapConsumer,
    Circle,
    Popup,
} from "react-leaflet";
import numeral from "numeral";
import config from "../../config";
import "leaflet/dist/leaflet.css";
import "./map.scss";

export default function Map({ selectedCountry, countries, displayInfo }) {
    const mapCenter =
        selectedCountry.country == config.worldwideValue
            ? [36.278572, -10.963604]
            : [
                  selectedCountry.countryInfo.lat,
                  selectedCountry.countryInfo.long,
              ];
    const mapZoom = selectedCountry.country == config.worldwideValue ? 3 : 6;

    return (
        <div className="map">
            <MapContainer
                className="map__container"
                center={[36.278572, -10.963604]}
                zoom={4}
                scrollWheelZoom={false}
            >
                <MapConsumer>
                    {(map) => {
                        map.flyTo(mapCenter, mapZoom);
                        return null;
                    }}
                </MapConsumer>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {countries.map((country) => {
                    if (country.country == config.worldwideValue) return null;
                    return (
                        <Circle
                            key={country.country}
                            center={[
                                country.countryInfo.lat,
                                country.countryInfo.long,
                            ]}
                            radius={
                                country[displayInfo] *
                                config.mapCircles[displayInfo].multiplier
                            }
                            pathOptions={{
                                color: config.mapCircles[displayInfo].color,
                                fillColor: config.mapCircles[displayInfo].color,
                                fillOpacity: 0.4,
                            }}
                        >
                            <Popup>
                                <img
                                    className="map__country-flag"
                                    src={country.countryInfo.flag}
                                    alt="Country flag"
                                />
                                <p>{country.country}</p>
                                <p>
                                    Cases:{" "}
                                    {numeral(country.cases).format("0,00a")}
                                </p>
                                <p>
                                    Recovered:{" "}
                                    {numeral(country.recovered).format("0,00a")}
                                </p>
                                <p>
                                    Deaths:{" "}
                                    {numeral(country.deaths).format("0,00a")}
                                </p>
                            </Popup>
                        </Circle>
                    );
                })}
            </MapContainer>
        </div>
    );
}

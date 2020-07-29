import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import numeral from "numeral";
// import mapboxgl from 'mapbox-gl';
// import MapboxCircle from 'mapbox-gl-circle';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { Circle, Popup } from "react-leaflet";
import styled from 'styled-components';

const Img = styled.img`
    width:100%;
    height:70px;
    margin-right:15px;
    border-radius:5px;
    box-shadow:0 2px 20px rgba(0,0,0,0.1);
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`
MapBox.propTypes = {
    zoom: PropTypes.number,
    center: PropTypes.array,
    countries: PropTypes.array,
    caseType: PropTypes.string,
    showData:PropTypes.bool,
};
const casesTypeColor = {
    cases: {
        hex: "black",
        multiplier: 200000,
    },
    recovered: {
        hex: "#6edc64",
        multiplier: 520000,
    },
    deaths: {
        hex: "red",
        multiplier: 820000,
    },
}
MapBox.defaultProps = {
    zoom: 3,
    center: [51.505, -0.09],
    countries: null,
    caseType: "cases",
    showData:false,
}
const showDataMap = (data, caseType = "cases", showdata) => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColor[caseType].hex}
            radius={
                Math.sqrt(parseInt(country[caseType]) * parseInt(casesTypeColor[caseType].multiplier))
            }
    
            onMouseOver={(e) => {
                e.target.openPopup();
            }}
            onMouseOut={(e) => {
                e.target.closePopup();
            }}
        >
            <Popup className="map-popup">
                <p className="info-map"><Img src={country.countryInfo.flag}></Img></p>
                <p style={{ fontSize: '15px', fontWeight: 'bold' }} className="info-map">{country.country}</p>
                <p className="info-map">Số ca nhiễm: {country.cases}</p>
                <p className="info-map">Số người chết: {country.deaths}</p>
                <p className="info-map">Số phục hồi: {country.recovered}</p>
            </Popup>
        </Circle>
    ))
);
const style = {
    border: '10px solid #797979',
    borderRadius: '0 2px 20px rgba(0,0,0,0.1)',
    height: '55vh',
    width: '100%',
    marginTop: '20px',
}
function MapBox(props) {
    const { center, zoom, caseType, countries } = props;
    useEffect(() => {
        // mapboxgl.accessToken = 'IqzJukzUWpWrcDHJeDpUPLSGndDx';
        // const map = new mapboxgl.Map({
        //     container: 'map',
        //     style: 'https://apis.wemap.asia/vector-tiles/styles/osm-bright/style.json?key=IqzJukzUWpWrcDHJeDpUPLSGndDx',
        //     center: [106.631478, 10.826952],
        //     zoom: 1,
        // });
        // let myCircle = new MapboxCircle({lat: 39.984, lng: -75.343}, 25000, {
        //     editable: true,
        //     minRadius: 1500,
        //     fillColor: '#29AB87'
        // }).addTo(map);
        // myCircle.on('contextmenu', function (mapMouseEvent) {
        //     console.log('Right-click:', mapMouseEvent.lngLat);
        // });
    }, [])
    
    return (
        <div className="map" style={style}>
            {/* <div style={{ width: "100%", height: '100%'}} id="map"></div> */}
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {showDataMap(countries, caseType)}
            </LeafletMap>
        </div>
    );
}

export default MapBox;
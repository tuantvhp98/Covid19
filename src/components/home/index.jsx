import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import InfoBox from '../infobox';
import LineChart from '../LineChart';
import MapBox from '../map';
import styled from 'styled-components';
// import numeral from 'numeral';
import "leaflet/dist/leaflet.css";
const Img = styled.img`
    width:50px;
    height:30px;
    margin-right:15px;
    border-radius:5px;
    box-shadow:0 2px 20px rgba(0,0,0,0.1);
`
// const convertNum = (num) => {
//     const a = num ? numeral(parseInt(num)).format('$0,0.00') : '0';
//     return a
// }
Home.propTypes = {
    list: PropTypes.array,
};
const sortData = (data) => {
    let a = [...data];
    a.sort((a, b) => {
        if (a.total > b.total) {
            return -1;
        } else {
            return 1;
        }
    })
    return a;
}
function Home(props) {
    const [list, setList] = useState([]);
    const [listTotal, setTotalList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('All');
    const [selectedName, setSelectedName] = useState('Worldwide');
    const [dataAll, setDataAll] = useState({});
    const [center, setCenter] = useState([20, 77]);
    const [zoom, setZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([])
    const [caseType, setCaseType] = useState('cases')
    const handleChange = (e) => {
        setSelectedOption(e.value)
        setSelectedName(e.label)
        setZoom(4)
    }
    const handleChangDeaths = () => {
        setCaseType('deaths');

    }
    const handleChangCases = () => {
        setCaseType('cases');
    }
    const handleChangRecovered = () => {
        setCaseType('recovered');
    }
    const handleOnClickList = (selectedOption, name) => {
        setSelectedOption(selectedOption)
        setSelectedName(name)
        setZoom(4)
    }
    useEffect(() => {

        const getData = async () => {
            await axios.get('https://disease.sh/v3/covid-19/countries')
                .then(res => {
                    const data = res.data;
                    const countries = data.map(e => ({
                        label: e.country,
                        value: e.countryInfo.iso2,
                    }))
                    const allCountries = data.map(e => ({
                        name: e.country,
                        total: e.cases,
                        flag: e.countryInfo.flag,
                        code: e.countryInfo.iso2,
                    }))
                    countries.push({ label: 'Worldwide', value: "All" })
                    setList(countries)
                    setMapCountries(data)
                    setTotalList(sortData(allCountries))

                }).catch(e => {
                    console.log(e)
                })
        }
        getData()
    }, [caseType])
    useEffect(() => {
        const url = selectedOption === 'All' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${selectedOption}`;
        const getdata = async () => {
            await axios.get(url).then(res => {
                setDataAll(res.data)
                if (selectedOption !== 'All') {
                    setCenter([res.data.countryInfo.lat, res.data.countryInfo.long])
                }

            })
        }
        getdata()
    }, [selectedOption])
    return (
        <div>


            <div className="container">
                <div className="tracks">
                    <div className="title">
                        <h2>Thông tin Covid trên thế giới</h2>
                        <div className="select-country">
                            <Select
                                value={selectedOption}
                                placeholder={selectedName}
                                onChange={handleChange}
                                options={list}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="all-info">
                            <InfoBox background={caseType === 'cases' ? "black" : 'white'} changeClick={handleChangCases} color="black" icon="https://img.icons8.com/ios/50/000000/coronavirus.png" label="Số ca nhiễm" numToday={dataAll.todayCases} total={dataAll.cases}></InfoBox>
                            <InfoBox background={caseType === 'deaths' ? "red" : 'white'} changeClick={handleChangDeaths} color="red" icon="./assets/img/deaths.svg" label="Số người chết" numToday={dataAll.todayDeaths} total={dataAll.deaths}></InfoBox>
                            <InfoBox background={caseType === 'recovered' ? "#6edc64" : 'white'} changeClick={handleChangRecovered} color="#6edc64" icon="https://img.icons8.com/color/48/000000/recovery.png" label="Số phục hồi" numToday={dataAll.todayRecovered} total={dataAll.recovered}></InfoBox>
                        </div>
                    </div>
                    <div className="map">
                        <MapBox countries={mapCountries} zoom={zoom} center={center} caseType={caseType}></MapBox>
                    </div>
                </div>
                <div className="case-total">
                    <div className="num-covid">
                        <h2>Số ca nhiễm các nước trên thế giới</h2>
                        <ul className="list-cases">
                            {
                                listTotal.map((e, index) => {
                                    return (
                                        <li className='list-total' key={index} onClick={() => handleOnClickList(e.code, e.name)}>
                                            <p style={{ display: 'flex' }}><Img src={e.flag}></Img> {e.name}</p> <p>{e.total}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>


            </div>
            <div className="container" style={{ margin: "20px 0",     marginBottom: "100px" }}>

                <div className="chart">
                    <h2>Thống kê</h2>
                    <LineChart></LineChart>
                </div>
            </div>

        </div>
    );
}

export default Home;
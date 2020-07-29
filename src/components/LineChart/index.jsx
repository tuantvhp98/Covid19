import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Line } from 'react-chartjs-2';
import Axios from 'axios';
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

function LineChart(props) {
    const [listdata, setListData] = useState([])
    const [listDaydata, setListDayData] = useState([])
    useEffect(() => {
        const url = 'https://disease.sh/v3/covid-19/all';
        const getdata = async () => {
            await Axios.get(url).then(res => {
                let data = res.data;
                setListData([data.cases, data.deaths, data.recovered])
                setListDayData([data.todayCases, data.todayDeaths, data.todayRecovered])
            })
        }
        getdata()
    }, [])
    return (
        <div style={{ display: "flex", maxWidth: "50%" }}>
            <Doughnut
                data={{
                    labels: ['Số ca nhiễm', 'Số người chết', "Số phục hồi"],
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: [
                                "red",
                                "black",
                                "#6edc64",
                            ],
                            data: listdata
                        }
                    ]
                }}
            />
            <Bar
                data={{
                    labels: ['Số ca nhiễm trong ngày', 'Số người chết trong ngày', "Số phục hồi trong ngày"],
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: [
                                "red",
                                "black",
                                "#6edc64",
                            ],
                            data: listDaydata
                        }
                    ]
                }}
            />
        </div>
    );
}

export default LineChart;
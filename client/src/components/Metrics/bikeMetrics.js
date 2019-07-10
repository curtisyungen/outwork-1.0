import React, { Component } from "react";
import "./metrics.css";

import moment from "moment";

class BikeMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userBikes: null,
            totalMiles: null,
            avgMilesPerWeek: null,
            totalClimb: null,
            avgMiles: null,
            maxMiles: null,
            workouts: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userBikes: this.props.userBikes,
        }, () => {
            this.getMetrics();
            this.getAvgMilesPerWeek();
        });
    }

    getMetrics = () => {
        let bikes = this.state.userBikes;
        let totalMiles = 0, totalClimb = 0;
        let avgMiles, maxMiles = 0;

        for (var b in bikes) {
            let miles = parseFloat(bikes[b].distance);
            let climb = parseFloat(bikes[b].climb);

            // Get max miles
            if (maxMiles < miles) {
                maxMiles = miles;
            }

            // Get total miles, total climb
            totalMiles += miles;
            totalClimb += climb;
        }

        // Get avg. miles
        avgMiles = Math.round((totalMiles / bikes.length) * 100) /100;

        this.setState({
            totalMiles: totalMiles,
            totalClimb: totalClimb,
            avgMiles: avgMiles,
            maxMiles: maxMiles,
            workouts: bikes.length,
        });
    }

    getAvgMilesPerWeek = () => {
        let bikes = this.state.userBikes;
        let year = [];
        for (var i=0; i<52; i++) {
            year.push(0);
        }

        let miles = 0;
        let week;
        let totalMiles = 0;
        for (var r in bikes) {
            miles = parseFloat(bikes[r].distance);
            week = moment(bikes[r].date).week();
            year[week] += miles;

            totalMiles += miles;
        }

        let avgMiles = 0;
        let today = new Date();
        avgMiles = Math.round((totalMiles / moment(today).week()) * 100) / 100;

        this.setState({
            avgMilesPerWeek: avgMiles,
        });
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Bikes</h4>
                <table className="table table-bordered metricsTable">
                    <thead className="thead-light">
                        <tr>
                            <th>Total Workouts</th>
                            <th>Total Miles</th>
                            <th>Avg. Miles / Week</th>
                            <th>Total Climb (ft.)</th>
                            <th>Avg. Distance (mi.)</th>
                            <th>Longest Distance (mi.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.workouts}</td>
                            <td>{this.state.totalMiles}</td>
                            <td>{this.state.avgMilesPerWeek}</td>
                            <td>{this.state.totalClimb}</td>
                            <td>{this.state.avgMiles}</td>
                            <td>{this.state.maxMiles}</td>
                        </tr>
                    </tbody>
                </table>
            </span>
        )
    }
}

export default BikeMetrics;
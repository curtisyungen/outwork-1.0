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
                <div className={`d-flex flex-${this.props.flexDir}`}>
                    <div className="metric">
                        <div className="metricTitle">Total Bikes</div>
                        <div>{this.state.workouts}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Miles</div>
                        <div>{this.state.totalMiles}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Miles / Week</div>
                        <div>{this.state.avgMilesPerWeek}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Climb (ft.)</div>
                        <div>{this.state.totalClimb}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Distance (mi.)</div>
                        <div>{this.state.avgMiles}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Longest Distance (mi.)</div>
                        <div>{this.state.maxMiles}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Metric</div>
                        <div></div>
                    </div>
                </div>
            </span>
        )
    }
}

export default BikeMetrics;
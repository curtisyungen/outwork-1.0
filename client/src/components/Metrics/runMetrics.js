import React, { Component } from "react";
import "./metrics.css";

import moment from "moment";

class RunMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userRuns: null,
            workouts: null,
            totalMiles: null,
            avgMilesPerWeek: null,
            totalClimb: null,
            avgMilePace: null,
            avgMiles: null,
            maxMiles: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userRuns: this.props.userRuns,
        }, () => {
            this.getMetrics();
            this.getAvgMilesPerWeek();
        });
    }

    getMetrics = () => {
        let runs = this.state.userRuns;
        let totalMiles = 0, totalClimb = 0, totalSecs = 0;
        let avgMiles, maxMiles = 0, avgMilePace;

        for (var r in runs) {
            let miles = parseFloat(runs[r].distance);
            let climb = parseFloat(runs[r].climb);

            // Get max miles
            if (maxMiles < miles) {
                maxMiles = miles;
            }

            // Get total miles, total climb
            totalMiles += miles;
            totalClimb += climb;

            // Get total mile pace in seconds
            let milePace = runs[r].milePace;
            let paceMins = parseFloat(milePace.split(":")[0]);
            let paceSecs = parseFloat(milePace.split(":")[1]);
            
            totalSecs += (paceMins * 60) + paceSecs;
        }

        // Get avg. miles
        avgMiles = Math.round((totalMiles / runs.length) * 100) /100;

        // Get avg. mile pace
        let addZero = "";
        let avgMilePaceMins = Math.floor((totalSecs / 60) / runs.length);
        let avgMilePaceSecs = Math.round((((totalSecs / 60) / runs.length) - avgMilePaceMins) * 60);

        if (avgMilePaceSecs < 10) {
            addZero = "0";
        }

        avgMilePace = `${avgMilePaceMins}:${addZero}${avgMilePaceSecs}`

        this.setState({
            workouts: runs.length,
            totalMiles: totalMiles,
            totalClimb: totalClimb,
            avgMiles: avgMiles,
            maxMiles: maxMiles,
            avgMilePace: avgMilePace,
        });
    }

    getAvgMilesPerWeek = () => {
        let runs = this.state.userRuns;
        let year = [];
        for (var i=0; i<52; i++) {
            year.push(0);
        }

        let miles = 0;
        let week;
        let totalMiles = 0;
        for (var r in runs) {
            miles = parseFloat(runs[r].distance);
            week = moment(runs[r].date).week();
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
            <h4 className="metricsPageTitle">Runs</h4>
                <div className="d-flex p-2">
                    <div className="d-inline-flex p2">Total Runs</div>
                    <div className="d-inline-flex p2">Total Miles</div>
                    <div className="d-inline-flex p2">Avg. Miles / Week</div>
                    <div className="d-inline-flex p2">Total Climb (ft.)</div>
                    <div className="d-inline-flex p2">Avg. Mile Pace</div>
                    <div className="d-inline-flex p2">Avg. Distance (mi.)</div>
                    <div className="d-inline-flex p2">Longest Distance (mi.)</div>
                </div>

                <div>
                    <div className="d-inline-flex p2">{this.state.workouts}</div>
                    <div className="d-inline-flex p2">{this.state.totalMiles}</div>
                    <div className="d-inline-flex p2">{this.state.avgMilesPerWeek}</div>
                    <div className="d-inline-flex p2">{this.state.totalClimb}</div>
                    <div className="d-inline-flex p2">{this.state.avgMilePace}</div>
                    <div className="d-inline-flex p2">{this.state.avgMiles}</div>
                    <div className="d-inline-flex p2">{this.state.maxMiles}</div>
                </div>
            </span>
        )
    }
}

export default RunMetrics;
import React, { Component } from "react";
import "./metrics.css";

import moment from "moment";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning } from '@fortawesome/free-solid-svg-icons';

library.add(faRunning);

class RunMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userRuns: null,
            workouts: "NA",
            totalMiles: 0,
            avgMilesPerWeek: 0,
            totalClimb: 0,
            avgMilePace: 0,
            avgMiles: 0,
            maxMiles: 0,
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
        avgMiles = Math.round((totalMiles / runs.length) * 100) / 100;

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
        for (var i = 0; i < 52; i++) {
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
                {/* <h4 className="metricsSectionTitle">Runs</h4> */}
                <FontAwesomeIcon className="fa-2x icon" icon={faRunning} />
                <div className={`d-flex flex-${this.props.flexDir} metricRow`}>
                    <div className="metric">
                        <div className="metricTitle">Workouts</div>
                        <div>{this.state.workouts}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Miles</div>
                        <div>{this.state.totalMiles}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Miles / Week</div>
                        <div>{this.state.avgMilesPerWeek}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Climb (ft.)</div>
                        <div>{this.state.totalClimb}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Pace</div>
                        <div>{this.state.avgMilePace}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Dist. (mi.)</div>
                        <div>{this.state.avgMiles}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Max. Dist. (mi.)</div>
                        <div>{this.state.maxMiles}</div>
                    </div>
                </div>
            </span>
        )
    }
}

export default RunMetrics;
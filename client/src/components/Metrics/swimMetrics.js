import React, { Component } from "react";
import "./metrics.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer } from '@fortawesome/free-solid-svg-icons';

library.add(faSwimmer);

class SwimMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userSwims: null,
            workouts: "NA",
            totalMeters: 0,
            totalMins: 0,
            avgMeters: 0,
            avgKnots: 0,
            maxMeters: 0,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userSwims: this.props.userSwims,
        }, () => {
            this.getMetrics();
        });
    }

    getMetrics = () => {
        let swims = this.state.userSwims;
        let totalMeters = 0;
        let totalMins = 0;
        let maxMeters = 0;

        for (var s in swims) {
            let dist = parseFloat(swims[s].distance);

            // Get total meters
            totalMeters += dist;

            // Get max meters
            if (maxMeters < dist) {
                maxMeters = dist;
            }

            // Get total time
            let time = swims[s].duration.split(":");
            let hours = parseFloat(time[0]);
            let minutes = parseFloat(time[1]);
            let seconds = parseFloat(time[2]);

            totalMins = (hours * 60) + minutes + Math.round(((seconds / 60) * 100) / 100);
        }

        // Get avg. meters / workout
        let avgMeters = Math.round((totalMeters / swims.length) * 100) / 100;

        // Convert meters / min. to nautical miles / hour to get avg. knots
        let avgKnots = Math.round(((totalMeters / totalMins) / 30.867) * 100) / 100;

        this.setState({
            workouts: swims.length,
            totalMeters: totalMeters,
            totalMins: totalMins,
            maxMeters: maxMeters,
            avgMeters: avgMeters,
            avgKnots: avgKnots,
        });
    }

    render() {
        return (
            <span>
                {/* <h4 className="metricsSectionTitle">Swims</h4> */}
                <div className={`d-flex flex-${this.props.flexDir} metricRow`}>
                    <div className="metricIcon metricIcon-swim">
                        <FontAwesomeIcon className="fa-2x icon" icon={faSwimmer} />
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Workouts</div>
                        <div>{this.state.workouts}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Time (min.)</div>
                        <div>{this.state.totalMins.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Meters</div>
                        <div>{this.state.totalMeters.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Meters / Wrkt.</div>
                        <div>{this.state.avgMeters.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Climb (ft.)</div>
                        <div>0.00</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Knots</div>
                        <div>{this.state.avgKnots.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Max. Dist. (m)</div>
                        <div>{this.state.maxMeters}</div>
                    </div>
                </div>
            </span>
        )
    }
}

export default SwimMetrics;
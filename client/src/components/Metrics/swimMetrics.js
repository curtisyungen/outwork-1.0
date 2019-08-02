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
            totalMiles: 0,
            totalTime: 0,
            avgMilesPerWeek: 0,
            avgMiles: 0,
            maxMiles: 0,
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
        let totalMiles = 0;
        let totalTime = 0;
        let maxMiles = 0;

        for (var s in swims) {
            let dist = parseFloat(swims[s].distance);

            totalMiles += dist;

            if (maxMiles < dist) {
                maxMiles = dist;
            }

            let time = swims[s].duration.split(":");
            let hours = parseFloat(time[0]);
            let minutes = parseFloat(time[1]);
            let seconds = parseFloat(time[2]);

            totalTime = (hours * 60) + minutes + Math.round(((seconds / 60) * 100) / 100);
        }

        this.setState({
            workouts: swims.length,
            totalMiles: totalMiles,
            totalTime: totalTime,
            maxMiles: maxMiles,
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
                        <div className="metricTitle">Time (min.)</div>
                        <div>{this.state.totalTime}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Meters</div>
                        <div>{this.state.totalMiles}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Dist. (mi.)</div>
                        <div>{this.state.avgMiles}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Max. Dist. (mi.)</div>
                        <div>{this.state.maxMiles}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle"></div>
                        <div></div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle"></div>
                        <div></div>
                    </div>
                </div>
            </span>
        )
    }
}

export default SwimMetrics;
import React, { Component } from "react";
import "./metrics.css";

class SwimMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userSwims: null,
            workouts: null,
            totalMiles: null,
            totalTime: null,
            avgMilesPerWeek: null,
            avgMiles: null,
            maxMiles: null,
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
                <h4 className="metricsPageTitle">Swims</h4>
                <div className={`d-flex flex-${this.props.flexDir}`}>
                    <div className="metric">
                        <div>Total Swims</div>
                        <div>{this.state.workouts}</div>
                    </div>
                    <div className="metric">
                        <div>Total Time (min.)</div>
                        <div>{this.state.totalTime}</div>
                    </div>
                    <div className="metric">
                        <div>Total Miles</div>
                        <div>{this.state.totalMiles}</div>
                    </div>
                    <div className="metric">
                        <div>Avg. Distance (mi.)</div>
                        <div>{this.state.avgMiles}</div>
                    </div>
                    <div className="metric">
                        <div>Longest Distance (mi.)</div>
                        <div>{this.state.maxMiles}</div>
                    </div>
                </div>
            </span>
        )
    }
}

export default SwimMetrics;
import React, { Component } from "react";
import "./metrics.css";

class SwimMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userSwims: null,
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
            totalMiles: totalMiles,
            totalTime: totalTime,
            maxMiles: maxMiles,
        });
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Swims</h4>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Total Miles</th>
                            <th>Avg. Miles / Week</th>
                            <th>Total Time (min.)</th>
                            <th>Avg. Distance</th>
                            <th>Longest Distance (mi.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.totalMiles}</td>
                            <td>{this.state.avgMilesPerWeek}</td>
                            <td>{this.state.totalTime}</td>
                            <td>{this.state.avgMiles}</td>
                            <td>{this.state.maxMiles}</td>
                        </tr>
                    </tbody>
                </table>
            </span>
        )
    }
}

export default SwimMetrics;
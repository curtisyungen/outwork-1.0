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

        console.log(swims);
        
        for (var s in swims) {
            let dist = parseFloat(swims[s].distance);

            totalMiles += dist;

            let time = swims[s].duration;
            let hours = time.split(":")[0];
            let minutes = time.split(":")[1];
            let seconds = time.split(":")[2]

            console.log(time, hours, minutes, seconds);
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
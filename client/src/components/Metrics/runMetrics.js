import React, { Component } from "react";
import actAPI from "../../utils/actAPI";
// import "./metricsTable.css";

class RunMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userRuns: null,
            totalMiles: null,
            avgMilesPerWeek: null,
            totalClimb: null,
            avgMilePace: null,
            avgDistance: null,
            maxDistance: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userRuns: this.props.userRuns,
        }, () => {
            this.getTotalMiles();
        });
    }

    getTotalMiles = () => {
        let runs = this.state.userRuns;
        let miles = 0;

        for (var r in runs) {
            miles += parseFloat(runs[r].distance);
        }

        this.setState({
            totalMiles: miles,
        });
    }

    getAvgMilesPerWeek = () => {

    }

    getTotalClimb = () => {
        let runs = this.state.userRuns;
        let climb = 0;

        for (var r in runs) {
            climb += parseFloat(runs[r].climb);
        }

        this.setState({
            totalClimb: climb,
        });
    }

    getAvgMilePace = () => {

    }

    getAvgDistance = () => {
        let runs = this.state.userRuns;
        let totalDist = 0;
        let maxDist = 0;

        for (var r in runs) {

            let dist = parseFloat(runs[r].distance);

            if (dist > maxDist) {
                maxDist = dist;
            }

            totalDist += dist;
        }

        let avgDist = totalDist / runs.length;

        this.setState({
            avgDistance: avgDist,
            maxDistance: maxDist, 
        });
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Runs</h4>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Total Miles</th>
                            <th>Avg. Miles / Week</th>
                            <th>Total Climb (ft.)</th>
                            <th>Avg. Mile Pace</th>
                            <th>Avg. Distance (mi.)</th>
                            <th>Longest Distance (mi.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.totalMiles}</td>
                            <td></td>
                            <td>{this.state.totalClimb}</td>
                            <td></td>
                            <td>{this.state.avgDistance}</td>
                            <td>{this.state.maxDistance}</td>
                        </tr>
                    </tbody>
                </table>
            </span>
        )
    }
}

export default RunMetrics;
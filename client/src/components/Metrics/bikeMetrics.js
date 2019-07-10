import React, { Component } from "react";
import "./metrics.css";

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
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userBikes: this.props.userBikes,
        }, () => {
            this.getMetrics();
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

            // Get total mile pace in seconds
            let milePace = bikes[b].milePace;
            let paceMins = parseFloat(milePace.split(":")[0]);
            let paceSecs = parseFloat(milePace.split(":")[1]);
            
            totalSecs += (paceMins * 60) + paceSecs;
        }

        // Get avg. miles
        avgMiles = Math.round((totalMiles / bikes.length) * 100) /100;

        this.setState({
            totalMiles: totalMiles,
            totalClimb: totalClimb,
            avgMiles: avgMiles,
            maxMiles: maxMiles,
        });
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Bikes</h4>
                <table className="table table-bordered metricsTable">
                    <thead className="thead-light">
                        <tr>
                            <th>Total Miles</th>
                            <th>Avg. Miles / Week</th>
                            <th>Total Climb (ft.)</th>
                            <th>Avg. Distance (mi.)</th>
                            <th>Longest Distance (mi.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.totalMiles}</td>
                            <td></td>
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
import React, { Component } from "react";
import "./metrics.css";

class LiftMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userLifts: null,
            totalTime: null,
            pushups: null,
            pullups: null,
            workouts: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userLifts: this.props.userLifts,
        }, () => {
            this.getMetrics();
        });
    }

    getMetrics = () => {
        let lifts = this.state.userLifts;
        let totalTime = 0;
        let pushups = 0;
        let pullups = 0;

        for (var l in lifts) {

            let time = lifts[l].duration.split(":");
            let hours = parseFloat(time[0]);
            let minutes = parseFloat(time[1]);
            let seconds = parseFloat(time[2]);

            totalTime += (hours * 60) + minutes + Math.round(seconds / 60);

            pushups += parseFloat(lifts[l].pushups);
            pullups += parseFloat(lifts[l].pullups);
        }

        this.setState({
            totalTime: totalTime,
            pushups: pushups,
            pullups: pullups,
            workouts: lifts.length,
        });
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Lifts</h4>
                <table className="table table-bordered metricsTable">
                    <thead className="thead-light">
                        <tr>
                            <th>Total Workouts</th>
                            <th>Total Time (min.)</th>
                            <th>Push-Ups</th>
                            <th>Pull-Ups</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.workouts}</td>
                            <td>{this.state.totalTime}</td>
                            <td>{this.state.pushups}</td>
                            <td>{this.state.pullups}</td>
                        </tr>
                    </tbody>
                </table>
            </span>
        )
    }
}

export default LiftMetrics;
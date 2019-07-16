import React, { Component } from "react";
import "./metrics.css";

class LiftMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userLifts: null,
            totalTime: 0,
            pushups: 0,
            pullups: 0,
            workouts: "NA",
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

            // Get total time
            let time = lifts[l].duration.split(":");
            let hours = parseFloat(time[0]);
            let minutes = parseFloat(time[1]);
            let seconds = parseFloat(time[2]);

            totalTime += (hours * 60) + minutes + Math.round(seconds / 60);

            // Get total push-ups
            if (lifts[l].pushups) {
                pushups += parseFloat(lifts[l].pushups);
            }

            // Get total pull-ups
            if (lifts[l].pullups) {
                pullups += parseFloat(lifts[l].pullups);
            }
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
                <h4 className="metricsSectionTitle">Lifts</h4>
                <div className={`d-flex flex-${this.props.flexDir}`}>
                    <div className="metric">
                        <div className="metricTitle">Total Lifts</div>
                        <div>{this.state.workouts}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Time</div>
                        <div>{this.state.totalTime}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Push-Ups</div>
                        <div>{this.state.pushups}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Pull-Ups</div>
                        <div>{this.state.pullups}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Metric</div>
                        <div>0</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Metric</div>
                        <div>0</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Metric</div>
                        <div>0</div>
                    </div>
                </div>
            </span>
        )
    }
}

export default LiftMetrics;
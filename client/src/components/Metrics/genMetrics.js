import React, { Component } from "react";
import "./metrics.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

library.add(faBullseye);

class GenMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            workouts: 0,
            restDays: 0,
            time: 0,
            races: 0,
            rainyDays: 0,
        }
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <span>
                <div className={`d-flex flex-${this.props.flexDir} metricRow`}>
                    <div className="metricIcon metricIcon-bullseye">
                        <FontAwesomeIcon className="fa-2x icon" icon={faBullseye} />
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Workouts</div>
                        <div>{this.state.workouts}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Rest Days</div>
                        <div>{this.state.restDays}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Time (min.)</div>
                        <div>{this.state.time}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Races</div>
                        <div>{this.state.races}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Rainy Days</div>
                        <div>{this.state.rainyDays}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle"></div>
                        <div>{this.state.workouts}</div>
                    </div>
                </div>
            </span>
        )
    }
}

export default GenMetrics;
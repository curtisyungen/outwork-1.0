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

    render() {
        return (
            <span>
                <div className={`d-flex flex-${this.props.flexDir} metricRow metricRow-gen`}>
                    <div className="metricIcon metricIcon-bullseye">
                        <FontAwesomeIcon className="fa-2x icon" icon={faBullseye} />
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Workouts</div>
                        <div>{this.props.workouts}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Time (min.)</div>
                        <div>{this.props.time}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Rest Days</div>
                        <div>{this.props.restDays}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Races</div>
                        <div>{this.props.races}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Rainy Days</div>
                        <div>{this.props.rainyDays}</div>
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

export default GenMetrics;
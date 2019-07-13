import React, { Component } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faBicycle, faSwimmer, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import "./LogActivity.css";

library.add(faRunning, faBicycle, faSwimmer, faDumbbell);

class LogActivity extends Component {

    componentDidMount = () => {
        this.props.checkValidUser();
    }

    render() {
        return (
            <div className={`${this.props.theme} logActivity col-md-12`}>
                <a className="activity col-md-2 runIcon" href="/run"><FontAwesomeIcon className="fa-3x" icon={faRunning}/></a>
                <a className="activity col-md-2 bikeIcon" href="/bike"><FontAwesomeIcon className="fa-3x" icon={faBicycle}/></a>
                <a className="activity col-md-2 swimIcon" href="/swim"><FontAwesomeIcon className="fa-3x" icon={faSwimmer}/></a>
                <a className="activity col-md-2 liftIcon" href="/lift"><FontAwesomeIcon className="fa-3x" icon={faDumbbell}/></a>
            </div>
        )
    }
}

export default LogActivity;
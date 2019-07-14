import React, { Component } from "react";
import "./activityIcons.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faBicycle, faSwimmer, faDumbbell } from '@fortawesome/free-solid-svg-icons';

library.add(faRunning, faBicycle, faSwimmer, faDumbbell);

class ActivityIcons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hidden: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            hidden: this.props.hidden,
        });
    }

    render() {
        return (
            <div className="activityIcons">
                {this.state.hidden !== "run" ? (
                    <a className="activityIcon runIcon" href="/run"><FontAwesomeIcon className="icon fa-2x" icon={faRunning} /></a>
                ) : (
                    <></>
                )}

                {this.state.hidden !== "bike" ? (
                    <a className="activityIcon bikeIcon" href="/bike"><FontAwesomeIcon className="icon fa-2x" icon={faBicycle} /></a>
                ) : (
                    <></>
                )}

                {this.state.hidden !== "swim" ? (
                    <a className="activityIcon swimIcon" href="/swim"><FontAwesomeIcon className="icon fa-2x" icon={faSwimmer} /></a>
                ) : (
                    <></>
                )}
                
                {this.state.hidden !== "lift" ? (
                    <a className="activityIcon liftIcon" href="/lift"><FontAwesomeIcon className="icon fa-2x" icon={faDumbbell} /></a>
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default ActivityIcons;
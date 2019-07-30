import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./award.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrophy, faBed, faRulerHorizontal,
    faMountain, faMedal, faDragon, faClock,
    faFlagCheckered, faCloudShowersHeavy, faFish, faHotdog
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faTrophy, faBed, faRulerHorizontal,
    faMountain, faMedal, faDragon, faClock,
    faFlagCheckered, faCloudShowersHeavy, faFish, faHotdog);

class Award extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: null,
        }
    }

    componentDidMount = () => {
        let award = this.props.hof;
        let icon = null;

        switch (award) {
            case "mostWorkouts": icon = faTrophy; break;
            case "mostRestDays": icon = faBed; break;
            case "longestRun": icon = faRulerHorizontal; break;
            case "maxClimb": icon = faMountain; break;
            case "mostPushups": icon = faMedal; break;
            case "mostPullups": icon = faMedal; break;
            case "mostGoggins": icon = faDragon; break;
            case "mostTime": icon = faClock; break;
            case "mostRaces": icon = faFlagCheckered; break;
            case "mostRainyDays": icon = faCloudShowersHeavy; break;
            case "mostSwims": icon = faFish; break;
            case "hotdog": icon = faHotdog; break;
            default: icon = faTrophy;
        }

        this.setState({
            icon: icon,
        }, () => {
            console.log(this.state.icon.iconName);
        });
    }

    render() {
        return (
            <span>
                <Popup
                    trigger={
                        <div className={`award ${this.state.icon.iconName}`}>
                            <FontAwesomeIcon className="awardIcon" icon={this.state.icon} />
                        </div>
                    }
                    on="hover"
                    position="top"
                    closeOnDocumentClick
                    className="popup"
                >
                    Award Name
                </Popup>
            </span>
        )
    }
}

export default Award;
import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./award.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrophy, faBed, faRulerHorizontal,
    faMountain, faMedal, faDragon, faClock,
    faFlagCheckered, faCloudShowersHeavy, faFish, 
    faHotdog, faTshirt, faGlobeAfrica, faCrown,
    faHammer,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faTrophy, faBed, faRulerHorizontal,
    faMountain, faMedal, faDragon, faClock,
    faFlagCheckered, faCloudShowersHeavy, faFish, 
    faHotdog, faTshirt, faGlobeAfrica, faCrown,
    faHammer);

class Award extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: null,
        }
    }

    componentDidMount = () => {
        let icon = this.props.hof[1];

        switch (icon) {
            case "faTrophy": icon = faTrophy; break;
            case "faBed": icon = faBed; break;
            case "faRulerHorizontal": icon = faRulerHorizontal; break;
            case "faMountain": icon = faMountain; break;
            case "faMedal": icon = faMedal; break;
            case "faCrown": icon = faCrown; break;
            case "faDragon": icon = faDragon; break;
            case "faClock": icon = faClock; break;
            case "faFlagCheckered": icon = faFlagCheckered; break;
            case "faCloudShowersHeavy": icon = faCloudShowersHeavy; break;
            case "faFish": icon = faFish; break;
            case "faHotdog": icon = faHotdog; break;
            case "faTshirt": icon = faTshirt; break;
            case "faGlobeAfrica": icon = faGlobeAfrica; break;
            case "faHammer": icon = faHammer; break;
            default: icon = faTrophy;
        }

        this.setState({
            icon: icon,
        });
    }

    render() {
        return (
            <span>
                {this.state.icon ? (
                    <Popup
                        trigger={
                            <div className={`award ${this.state.icon.iconName}`}>
                                <FontAwesomeIcon className="awardIcon" icon={this.state.icon} />
                            </div>
                        }
                        on="hover"
                        closeOnDocumentClick
                        className="popup-profile"
                    >
                        <div className="popup-profile-data">{this.props.hof[0]}</div>
                    </Popup>
                ) : (
                        <></>
                    )}
            </span>
        )
    }
}

export default Award;

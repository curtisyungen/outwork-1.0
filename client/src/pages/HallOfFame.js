import React, { Component } from "react";
import hofAPI from "../utils/hofAPI";
import "./HallOfFame.css";

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

class HallOfFame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            awards: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
        // this.props.updateHof();

        let userId, firstName, lastName;

        if (this.props.profileId !== null) {
            userId = this.props.profileId;
            firstName = this.props.otherUserFirst;
            lastName = this.props.otherUserLast;
        }
        else {
            userId = localStorage.getItem("userId");
            firstName = localStorage.getItem("fn");
            lastName = localStorage.getItem("ln");
        }

        this.setState({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
        }, () => {
            this.getHof();
        });
    }

    getHof = () => {
        hofAPI.getHof()
            .then((res) => {
                let awards = [];

                for (var r in res.data) {
                    let award = {};
                    award.title = res.data[r].title;
                    award.icon = res.data[r].icon;
                    award.desc = res.data[r].desc;
                    award.userName = res.data[r].userName;
                    award.value = res.data[r].value;
                    award.unit = res.data[r].unit;

                    awards.push(award);
                }

                this.setState({
                    awards: awards,
                });
            });
    }

    getIcon = (iconRef) => {

        let icon;

        switch (iconRef) {
            case "faTrophy": icon = faTrophy; break;
            case "faBed": icon = faBed; break;
            case "faRulerHorizontal": icon = faRulerHorizontal; break;
            case "faMountain": icon = faMountain; break;
            case "faMedal": icon = faMedal; break;
            case "faDragon": icon = faDragon; break;
            case "faClock": icon = faClock; break;
            case "faFlagCheckered": icon = faFlagCheckered; break;
            case "faCloudShowersHeavy": icon = faCloudShowersHeavy; break;
            case "faFish": icon = faFish; break;
            case "faHotdog": icon = faHotdog; break;
            default: icon = faTrophy;
        }

        return icon;
    }

    // HALL OF FAME
    // ==================================

    render() {
        return (
            <div className="container pageContainer hofContainer">
                <h4>Hall of Fame</h4>
                {/* <div>
                    <img 
                        className="hofLogo"
                        src="https://vignette.wikia.nocookie.net/rsf-franchise/images/7/74/HoF.png/revision/latest?cb=20170603045124" 
                        alt="Hall of Fame" 
                    />
                </div> */}
                <div className="hallOfFame">
                    {this.state.awards && this.state.awards.length > 0 ? (
                        this.state.awards.map(award => (
                            <div className="hofMetric mostWorkouts">
                                <div className="hofIcon hofCol"><FontAwesomeIcon className={`fa-2x ${award.icon}`} icon={this.getIcon(award.icon)} /></div>
                                <div className="hofTitle hofCol">{award.title}</div>
                                <div className="hofName hofCol">{award.userName}</div>
                                <div className="hofValue hofCol">{award.value}&nbsp;{award.units}</div>
                                <div className="hofDesc hofCol">{award.desc}</div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        )
    }
}

export default HallOfFame;

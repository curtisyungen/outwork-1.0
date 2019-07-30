import React, { Component } from "react";
import hofAPI from "../utils/hofAPI";
import "./HallOfFame.css";

import moment from "moment";

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
        this.props.updateHof();

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
                    awards.push([res.data[r].userName, res.data[r].value]);
                }

                this.setState({
                    awards: awards,
                }, () => {
                    console.log("Awards", this.state.awards);
                });
            });
    }

    // HALL OF FAME
    // ==================================

    render() {
        return (
            <div className="container pageContainer hofContainer">
                <h4>Hall of Fame</h4>
                <div className="hallOfFame">
                    {this.state.awards && this.state.awards.length > 0 ? (
                        this.state.awards.map(award => (
                            <div className="hofMetric mostWorkouts">
                                <div className="hofHover">Description</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x trophyIcon" icon={faTrophy} /></div>
                                <div className="hofTitle">Award Title</div>
                                <div className="hofName">{award.userName}</div>
                                <div className="hofValue">{award.value} units</div>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    }
}

export default HallOfFame;

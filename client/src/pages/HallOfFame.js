import React, { Component } from "react";
import workoutAPI from "../utils/workoutAPI";
import "./HallOfFame.css";

import moment from "moment";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBed, faRulerHorizontal, faMountain, faMedal, faDragon, faClock, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

library.add(faTrophy, faBed, faRulerHorizontal, faMountain, faMedal, faDragon, faClock, faFlagCheckered);

class HallOfFame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mostWorkouts: [0, null],
            mostRestDays: [0, null],
            longestRun: [0, null],
            maxClimb: [0, null],
            mostPushUps: [0, null],
            mostPullUps: [0, null],
            mostGoggins: [0, null],
            mostRaces: [0, null],
            mostTime: [0, null],
        }
    }

    componentDidMount = () => {
        this.getUserMaxes();
    }

    getUserMaxes = () => {

        workoutAPI.getMaxWorkouts()
            .then((res) => {
                let max = 0;
                let maxName = "";
                let min = 365;
                let minName = "";

                for (var r in res.data) {
                    if (res.data[r].workouts > max) {
                        max = res.data[r].workouts;
                        maxName = res.data[r].firstName;
                    }
                    if (res.data[r].workouts < min) {
                        min = res.data[r].workouts;
                        minName = res.data[r].firstName;
                    }
                }

                let dateNum = moment().dayOfYear();

                this.setState({
                    mostWorkouts: [max, maxName],
                    mostRestDays: [dateNum - min, minName],
                });
            });

        workoutAPI.getLongestRun()
            .then((res) => {
                this.setState({
                    longestRun: res.data[0],
                });
            });

        workoutAPI.getMaxClimb()
            .then((res) => {
                this.setState({
                    maxClimb: res.data[0],
                });
            });

        workoutAPI.getMaxPushups()
            .then((res) => {
                this.setState({
                    mostPushUps: res.data[0],
                });
            });

        workoutAPI.getMaxPullups()
            .then((res) => {
                this.setState({
                    mostPullUps: res.data[0],
                });
            });

        workoutAPI.getMaxGoggins()
            .then((res) => {
                let max = 0;
                let maxName = "";
                for (var r in res.data) {
                    if (res.data[r].goggins > max) {
                        max = res.data[r].goggins;
                        maxName = res.data[r].firstName;
                    }
                }
                this.setState({
                    mostGoggins: [max, maxName],
                });
            });

        workoutAPI.getMaxRaces()
            .then((res) => {
                let max = 0;
                let maxName = 0;
                for (var r in res.data) {
                    if (res.data[r].race > max) {
                        max = res.data[r].race;
                        maxName = res.data[r].firstName;
                    }
                }
                this.setState({
                    mostRaces: [max, maxName],
                });
            });
    }

    render() {
        return (
            <div className="container pageContainer hofContainer">
                {this.state.mostWorkouts && this.state.mostRestDays && this.state.longestRun && this.state.maxClimb && 
                this.state.mostPushUps && this.state.mostPullUps && this.state.mostGoggins && this.state.mostRaces ? (
                    <span>
                        <h4>Hall of Fame</h4>
                        <div className="hallOfFame">
                            {/* MOST WORKOUTS */}
                            <div className="hofMetric mostWorkouts">
                                <div className="hofHover">Highest number of workouts completed of any type.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x trophyIcon" icon={faTrophy} /></div>
                                <div className="hofTitle">Most Workouts</div>
                                <div className="hofName">{this.state.mostWorkouts[1]}</div>
                                <div className="hofValue">{this.state.mostWorkouts[0]} workouts</div>
                            </div>

                            {/* MOST REST DAYS */}
                            <div className="hofMetric mostRestDays">
                                <div className="hofHover">Most number of rest days. Person here needs to stop cuddling with blanky, get the fuck out of bed, and quit being a lazy bitch.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x restIcon" icon={faBed} /></div>
                                <div className="hofTitle">Most Rest Days</div>
                                <div className="hofName">{this.state.mostRestDays[1]}</div>
                                <div className="hofValue">{this.state.mostRestDays[0]} days</div>
                            </div>

                            {/* LONGEST RUN */}
                            <div className="hofMetric longestRun">
                                <div className="hofHover">Most number of miles run in one workout.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x rulerIcon" icon={faRulerHorizontal} /></div>
                                <div className="hofTitle">Longest Run</div>
                                <div className="hofName">{this.state.longestRun.firstName}</div>
                                <div className="hofValue">{this.state.longestRun.distance} miles</div>
                            </div>

                            {/* GREATEST CLIMB */}
                            <div className="hofMetric mostClimb">
                                <div className="hofHover">Most elevation climbed in single workout. Measured in feet.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x mountainIcon" icon={faMountain} /></div>
                                <div className="hofTitle">Greatest Climb</div>
                                <div className="hofName">{this.state.maxClimb.firstName}</div>
                                <div className="hofValue">{this.state.maxClimb.climb} feet</div>
                            </div>

                            {/* MOST PUSH-UPS */}
                            <div className="hofMetric mostPushUps">
                                <div className="hofHover">Most push-ups done in a single workout.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x silverMedalIcon" icon={faMedal} /></div>
                                <div className="hofTitle">Most Push-Ups</div>
                                <div className="hofName">{this.state.mostPushUps.firstName}</div>
                                <div className="hofValue">{this.state.mostPushUps.pushups} push-ups</div>
                            </div>

                            {/* MOST PULL-UPS */}
                            <div className="hofMetric mostPullUps">
                                <div className="hofHover">Most pull-ups done in a single workout.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x bronzeMedalIcon" icon={faMedal} /></div>
                                <div className="hofTitle">Most Pull-Ups</div>
                                <div className="hofName">{this.state.mostPullUps.firstName}</div>
                                <div className="hofValue">{this.state.mostPullUps.pullups} pull-ups</div>
                            </div>

                            {/* MOST GOGGINS WORKOUTS */}
                            <div className="hofMetric mostGoggins">
                                <div className="hofHover">Most Goggins workouts completed. Winner here is a total badass.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x dragonIcon" icon={faDragon} /></div>
                                <div className="hofTitle">Most Goggins</div>
                                <div className="hofName">{this.state.mostGoggins[1]}</div>
                                <div className="hofValue">{this.state.mostGoggins[0]} workouts</div>
                            </div>

                            {/* MOST RACES */}
                            <div className="hofMetric mostRaces">
                                <div className="hofHover">Most number of races completed.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x flagIcon" icon={faFlagCheckered} /></div>
                                <div className="hofTitle">Most Races</div>
                                <div className="hofName">{this.state.mostRaces[1]}</div>
                                <div className="hofValue">{this.state.mostRaces[0]} races</div>
                            </div>

                            {/* MOST TIME */}
                            <div className="hofMetric mostTime">
                                <div className="hofHover">Most time spent working out. Measured in minutes.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x clockIcon" icon={faClock} /></div>
                                <div className="hofTitle">Most Time</div>
                                <div className="hofName">{null}</div>
                                <div className="hofValue">{null}</div>
                            </div>

                        </div>
                    </span>
                ) : (
                        <></>
                    )}
            </div>

        )
    }
}

export default HallOfFame;
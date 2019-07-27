import React, { Component } from "react";
import workoutAPI from "../utils/workoutAPI";
import userAPI from "../utils/userAPI";
import "./HallOfFame.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBed, faRulerHorizontal, faMountain, faMedal, faDragon, faClock, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

library.add(faTrophy, faBed, faRulerHorizontal, faMountain, faMedal, faDragon, faClock, faFlagCheckered);

class HallOfFame extends Component {

    // Global data: 
    // most workouts, 
    // most rest days, 
    // longest run, 
    // greatest climb, 
    // most push-ups, 
    // most pull-ups, 
    // most Goggins workouts,
    // most races,
    // most time spent,

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
                this.setState({
                    mostWorkouts: res.data[0],
                });
            });

        workoutAPI.getMinWorkouts()
            .then((res) => {
                this.setState({
                    mostRestDays: [365 - parseInt(res.data[0].minWrkt), res.data[0].firstName],
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
                this.setState({
                    mostGoggins: res.data[0],
                });
            });

        workoutAPI.getMaxRaces()
            .then((res) => {
                this.setState({
                    mostRaces: res.data[0],
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
                                <div className="hofName">{this.state.mostWorkouts.firstName}</div>
                                <div className="hofValue">{this.state.mostWorkouts.maxWrkt} workouts</div>
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
                                <div className="hofName">{this.state.mostGoggins.firstName}</div>
                                <div className="hofValue">{this.state.mostGoggins.goggins} workouts</div>
                            </div>

                            {/* MOST RACES */}
                            <div className="hofMetric mostRaces">
                                <div className="hofHover">Most number of races completed.</div>
                                <div className="hofIcon"><FontAwesomeIcon className="fa-3x flagIcon" icon={faFlagCheckered} /></div>
                                <div className="hofTitle">Most Races</div>
                                <div className="hofName">{this.state.mostRaces.firstName}</div>
                                <div className="hofValue">{this.state.mostRaces.races} races</div>
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
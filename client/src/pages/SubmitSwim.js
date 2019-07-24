import React, { Component } from "react";
// import Container from "../components/Container/container";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import SwimLap from "../components/SwimLap/swimLap";
import userAPI from "../utils/userAPI";
import workoutAPI from "../utils/workoutAPI";
// import "./SubmitSwim.css";

class SubmitSwim extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            time: null,
            distance: null,
            duration: null,
            laps: null,
            location: null,
            surface: null,
            workout: [],
            notes: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        // Get user info
        let userId = localStorage.getItem("userId");

        userAPI.getUserById(userId)
            .then((res) => {
                // Get workout
                let lap = {
                    id: 0,
                    distance: "",
                    time: "",
                    stroke: "",
                    rest: "",
                }

                let workout = [lap];

                this.setState({
                    userId: userId,
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    workout: workout,
                });
            });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    addLap = () => {
        let laps = this.state.workout;

        let maxId = -1;
        for (var r in laps) {
            if (laps[r].id > maxId) {
                maxId = parseInt(laps[r].id);
            }
        }

        let lap = {
            id: maxId + 1,
            distance: "",
            time: "",
            stroke: "",
            rest: "",
        }

        laps.push(lap);

        this.setState({
            workout: laps,
        });
    }

    deleteLap = (lap) => {
        let laps = this.state.laps;
        let idx;

        for (var i = 0; i < laps.length; i++) {
            if (laps[i].id === lap) {
                idx = i;
            }
        }

        laps.splice(idx, 1);

        this.setState({
            laps: laps,
        });
    }

    getLap = (lap) => {
        let laps = this.state.laps;
        let idx = -1;

        for (var l in laps) {
            if (laps[l].id === lap.id) {
                idx = l;
            }
        }

        if (idx > -1) {
            laps[idx] = lap;
        }
        else {
            laps.push(lap);
        }

        this.setState({
            workout: laps,
        });
    }

    submitSwim = () => {
        if (this.props.checkValidUser()) {
            let swimData = {
                workoutType: "swim",
                userId: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                date: this.state.date,
                time: this.state.time,
                location: this.state.location,
                distance: this.state.distance,
                duration: this.state.duration,
                milePace: null,
                runType: null,
                laps: this.state.laps,
                race: null,
                surface: this.state.surface,
                weather: null,
                climb: null,
                grade: null,
                shoe: null,
                bike: null,
                generator: null,
                pushups: null,
                pullups: null,
                workout: this.state.workout,
                muscleGroups: null,
                notes: this.state.notes,
                map: null,
            }

            workoutAPI.createWorkout(swimData)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Workout submitted!");
                        window.location.reload();
                    }
                    else {
                        alert("Error submitting workout.");
                    }
                });
        }
    }

    render() {
        return (
            <div className="container pageContainer submitContainer">
                <div>

                    <div className="titleBar">
                        <h4>Swimming Workout</h4>
                        <ActivityIcons
                            hidden="swim"
                        />
                    </div>

                    {/* DATE */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Date</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="date"
                            type="date"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* TIME */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Time of Day</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="time"
                            type="text"
                            className="form-control"
                            placeholder="3:00pm"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* DISTANCE */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Miles</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="distance"
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* DURATION */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Duration</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="duration"
                            type="text"
                            className="form-control"
                            placeholder="hh:mm:ss"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* LOCATION */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Location</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="location"
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* LAPS */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Laps</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="laps"
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* WATER TYPE */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Water</span>
                        </div>
                        <select
                            className="browser-default custom-select"
                            autoComplete="off"
                            name="surface"
                            type="text"
                            onChange={this.handleInputChange}
                            defaultValue={null}
                        >
                            <option value=""></option>
                            <option value="Pool">Pool</option>
                            <option value="Lake">Lake</option>
                            <option value="River">River</option>
                            <option value="Ocean">Ocean</option>
                        </select>
                    </div>

                    {/* WORKOUT */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend submitFormSectTitle">
                            Workout
                        </div>
                    </div>

                    {this.state.workout.map(lap => (
                        <SwimLap
                            key={Math.random() * 100000}
                            id={lap.id}
                            distance={lap.distance}
                            time={lap.time}
                            stroke={lap.stroke}
                            rest={lap.rest}
                            getLap={this.getLap}
                            deleteLap={this.deleteLap}
                        />
                    ))}

                    {/* ADD LAP BUTTON */}
                    <div className="addRepeatBtn">
                        <button className="btn btn-dark btn-sm" onClick={this.addLap}>Add Lap</button>
                    </div>

                    {/* NOTES */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Notes</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="notes"
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={this.submitSwim}>Submit</button>
                </div>
            </div>
        )
    }
}

export default SubmitSwim;
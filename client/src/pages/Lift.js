import React, { Component } from "react";
import actAPI from "../utils/actAPI";
// import "./Lift.css";

class Lift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            duration: null,
            location: null,
            generator: null,
            sets: null,
            pushups: null,
            pullups: null,
            workout: null,
            muscleGroups: null,
            notes: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        let userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    getMuscleGroups = () => {

    }

    getPushUps = () => {

    }

    getPullUps = () => {

    }

    submitLift = () => {

        if(this.props.checkValidUser()) {
            let liftData = {
                userId: this.state.userId,
                date: this.state.date,
                duration: this.state.duration,
                location: this.state.location,
                generator: this.state.generator,
                sets: this.state.sets,
                pushups: this.state.pushups,
                pullups: this.state.pullups,
                workout: this.state.workout,
                muscleGroups: this.state.muscleGroups,
                notes: this.state.notes,
            }
    
            actAPI.createLift(liftData)
                .then((res) => {
                    console.log(res);
                });
        }
    }

    render() {
        return (
            <div className="logRunPage col-lg-4">

                <h4>Lifting Workout</h4>

                {/* DATE */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Date</span>
                    </div>
                    <input
                        autoComplete="off"
                        name="date"
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

                {/* GENERATOR */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Generator</span>
                    </div>
                    <input
                        autoComplete="off"
                        name="generator"
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={this.handleInputChange}
                    />
                </div>

                {/* SETS */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Sets</span>
                    </div>
                    <input
                        autoComplete="off"
                        name="sets"
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={this.handleInputChange}
                    />
                </div>

                {/* WORKOUT */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Workout</span>
                    </div>
                    <input
                        autoComplete="off"
                        name="workout"
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={this.handleInputChange}
                    />
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

                <button className="btn btn-primary" onClick={this.submitLift}>Submit</button>
            </div>
        )
    }
}

export default Lift;
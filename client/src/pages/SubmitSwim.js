import React, { Component } from "react";
// import Container from "../components/Container/container";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import userAPI from "../utils/userAPI";
import workoutAPI from "../utils/workoutAPI";
// import "./SubmitSwim.css";

class SubmitSwim extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            distance: null,
            duration: null,
            laps: null,
            location: null,
            surface: null,
            workout: null,
            notes: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        // Get user info
        let userId = localStorage.getItem("userId");     

        userAPI.getUserById(userId)
            .then((res) => {
                this.setState({
                    userId: userId,
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                });
            });      
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
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
                location: this.state.location,
                distance: this.state.distance,
                duration: this.state.duration,
                milePace: null,
                runType: null,
                laps: this.state.laps,
                repeats: null,
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
            <div className="container pageContainer generatorPage">
                <div className={`${this.props.theme} logSwimPage`}>

                    <ActivityIcons 
                        hidden="swim"
                    />

                    <h4>Swimming Workout</h4>

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
                            <span className="input-group-text" id="inputGroup-sizing-sm">Water Type</span>
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

                    {/* SWIM WORKOUT */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Swim Workout</span>
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

                    <button className="btn btn-primary" onClick={this.submitSwim}>Submit</button>
                </div>
            </div>
        )
    }
}

export default SubmitSwim;
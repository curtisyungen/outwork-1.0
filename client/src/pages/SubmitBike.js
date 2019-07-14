import React, { Component } from "react";
// import Container from "../components/Container/container";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import userAPI from "../utils/userAPI";
import workoutAPI from "../utils/workoutAPI";
// import "./SubmitBike.css";

class SubmitBike extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            date: null,
            time: null,
            distance: null,
            duration: null,
            location: null,
            surface: null,
            weather: null,
            climb: null,
            grade: null,
            bike: null,
            notes: null,
            map: null,
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

    submitBike = () => {
        if (this.props.checkValidUser()) {
            let bikeData = {
                workoutType: "bike",
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
                laps: null,
                repeats: null,
                race: null,
                surface: this.state.surface,
                weather: this.state.weather,
                climb: this.state.climb,
                grade: this.state.grade,
                shoe: null,
                bike: this.state.shoe,
                generator: null,
                pushups: null,
                pullups: null,
                workout: null,
                muscleGroups: null,
                notes: this.state.notes,
                map: this.state.map,
            }

            workoutAPI.createWorkout(bikeData)
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
            <div className="container pageContainer">
                <div>

                    <div className="titleBar">
                        <h4>Biking Workout</h4>
                        <ActivityIcons 
                            hidden="bike"
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
                            <span className="input-group-text" id="inputGroup-sizing-sm">Distance</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="distance"
                            type="text"
                            className="form-control"
                            placeholder="Miles"
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

                    {/* SURFACE */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Surface</span>
                        </div>
                        <select
                            className="browser-default custom-select"
                            autoComplete="off"
                            name="surface"
                            type="text"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                            defaultValue={null}
                        >
                            <option value=""></option>
                            <option value="Street">Street</option>
                            <option value="Bike Path">Bike Path</option>
                            <option value="Track">Track</option>
                            <option value="Trail">Trail</option>
                            <option value="Dirt Road">Dirt Road</option>
                            <option value="Grass">Grass</option>
                            <option value="Stationary">Stationary</option>
                        </select>
                    </div>

                    {/* WEATHER */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Weather</span>
                        </div>
                        <select
                            className="browser-default custom-select"
                            autoComplete="off"
                            name="weather"
                            type="text"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                            defaultValue={null}
                        >
                            <option value=""></option>
                            <option value="sunny">Sunny</option>
                            <option value="rainy">Rainy</option>
                            <option value="cloudy">Cloudy</option>
                            <option value="windy">Windy</option>
                            <option value="snowy">Snowy</option>
                            <option value="icy">Icy</option>
                            <option value="clear">Clear</option>
                            <option value="indoor">Indoor</option>
                            <option value="shitstorm">Shitstorm</option>
                        </select>
                    </div>

                    {/* CLIMB */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Climb</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="climb"
                            type="text"
                            className="form-control"
                            placeholder="feet"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* GRADE */}


                    {/* BIKE */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Bike</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="bike"
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
                        <textarea
                            autoComplete="off"
                            name="notes"
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* MAP */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Link</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="map"
                            type="url"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={this.submitBike}>Submit</button>
                </div>
            </div>
        )
    }
}

export default SubmitBike;
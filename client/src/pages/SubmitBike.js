import React, { Component } from "react";
// import Container from "../components/Container/container";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import WeatherIcons from "../components/WeatherIcons/weatherIcons";
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
            ttlMins: null,
            location: null,
            surface: null,
            weather: "Sunny",
            climb: null,
            grade: null,
            bike: null,
            notes: null,
            map: null,
            today: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
        this.getToday();

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

    validateBikeForm = () => {
        let date = this.state.date;
        let dist = this.state.distance;
        let time = this.state.duration;

        if (date === null || date === "" || date.length < 10) {
            alert("Inputted date is not valid.");
            return false;
        }

        if (dist === null || dist === "" || dist < 0 || isNaN(dist)) {
            alert("Distance must be a positive integer.");
            return false;
        }

        if (time === null || time === "" || time.length < 8) {
            alert("Duration must be in hh:mm:ss format.");
            return false;
        }

        return true;
    }

    setWeather = (weather) => {
        this.setState({
            weather: weather,
        });
    }

    getGrade = () => {
        let distance = this.state.distance;
        let climb = this.state.climb;
        let grade = Math.round(((climb / (distance * 5280)) * 100) * 100) / 100;

        this.setState({
            grade: grade,
        });
    }

    getTtlMins = () => {
        let time = this.state.duration;
        let hours, mins, secs;

        hours = parseFloat(time.split(":")[0]);
        mins = parseFloat(time.split(":")[1]);
        secs = parseFloat(time.split(":")[2]);

        let ttlMins = 0;

        ttlMins = Math.round(((hours * 60) + mins + (secs / 60)) * 100) / 100;

        this.setState({
            ttlMins: ttlMins,
        }, () => {
            this.submitBike();
        });
    }

    getToday = () => {
        let today = new Date();
        let month = today.getMonth() + 1;
        let date = today.getDate();

        let moZero = "";

        if (month < 10) {
            moZero = 0;
        }

        let dateZero = "";

        if (date < 10) {
            dateZero = 0;
        }

        let defaultDate = `2019-${moZero}${month}-${dateZero}${date}`

        this.setState({
            today: defaultDate,
        });
    }

    submitBike = () => {
        this.props.checkValidUser()

        if (this.validateBikeForm()) {
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
                ttlMins: this.state.ttlMins,
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
                bike: this.state.bike,
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
            <div className="container pageContainer submitContainer">
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
                            <span className="input-group-text" id="inputGroup-sizing-sm">Date*</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="date"
                            type="date"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                            defaultValue={this.state.today}
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
                            <span className="input-group-text" id="inputGroup-sizing-sm">Distance*</span>
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
                            onBlur={this.getGrade}
                        />
                    </div>

                    {/* DURATION */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Duration*</span>
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
                            <WeatherIcons 
                                setWeather={this.setWeather}
                                selected={this.state.weather}
                            />
                        </div>
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
                            onBlur={this.getGrade}
                        />
                    </div>

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

                    {localStorage.getItem("userId") === "834292GU" ? (
                        <></>
                    ) : (
                        <button className="btn btn-primary" onClick={this.getTtlMins}>Submit</button>
                    )}
                </div>
            </div>
        )
    }
}

export default SubmitBike;
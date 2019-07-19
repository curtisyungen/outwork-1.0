import React, { Component } from "react";
import RunRepeat from "../components/RunRepeat/runRepeat";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import WeatherIcons from "../components/WeatherIcons/weatherIcons";
import workoutAPI from "../utils/workoutAPI";
import userAPI from "../utils/userAPI";
import "./SubmitRun.css";

class SubmitRun extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            time: null,
            distance: null,
            duration: null,
            milePace: null,
            runType: null,
            repeats: [],
            race: null,
            location: null,
            surface: null,
            weather: null,
            climb: null,
            grade: null,
            shoe: null,
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
                // Get repeats
                let repeat = {
                    id: 0,
                    distance: "",
                    time: "",
                    rest: "",
                }

                let repeats = [repeat];

                this.setState({
                    userId: userId,
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    repeats: repeats,
                });
            });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    getMilePace = () => {
        let milePace, hours, minutes, seconds, totalMinutes;
        let paceMins, paceSecs;
        let addZeroSecs = "";

        if (Number(this.state.distance) && this.state.duration) {
            hours = parseFloat(this.state.duration.split(":")[0]);
            minutes = parseFloat(this.state.duration.split(":")[1]);
            seconds = parseFloat(this.state.duration.split(":")[2]);

            totalMinutes = (hours * 60) + minutes + (seconds / 60);

            paceMins = Math.floor(totalMinutes / this.state.distance);
            paceSecs = Math.round(((totalMinutes / this.state.distance) - paceMins) * 60);

            if (paceSecs < 10) {
                addZeroSecs = 0;
            }

            milePace = `${paceMins}:${addZeroSecs}${paceSecs}`;

            this.setState({
                milePace: milePace,
            });
        }
    }

    addRepeat = () => {
        let repeats = this.state.repeats;
        let repeat = {
            id: repeats.length,
            distance: "",
            time: "",
            rest: "",
        }

        repeats.push(repeat);

        this.setState({
            repeats: repeats,
        });
    }

    deleteRepeat = (repeat) => {
        let repeats = this.state.repeats;
        let idx;

        for (var i = 0; i < repeats.length; i++) {
            if (repeats[i].id === repeat) {
                idx = i;
            }
        }

        repeats.splice(idx, 1);

        this.setState({
            repeats: repeats,
        });
    }

    setDistance = (id, distance) => {
        let repeats = this.state.repeats;
        let idx;
        for (var i = 0; i < repeats.length; i++) {
            if (repeats[i].id === id) {
                idx = i;
            }
        }

        repeats[idx].distance = distance;

        this.setState({
            repeats: repeats,
        });
    }

    setTime = (id, time) => {
        let repeats = this.state.repeats;
        let idx;
        for (var i = 0; i < repeats.length; i++) {
            if (repeats[i].id === id) {
                idx = i;
            }
        }

        repeats[idx].time = time;

        this.setState({
            repeats: repeats,
        });
    }

    setRest = (id, rest) => {
        let repeats = this.state.repeats;
        let idx;
        for (var i = 0; i < repeats.length; i++) {
            if (repeats[i].id === id) {
                idx = i;
            }
        }

        repeats[idx].rest = rest;

        this.setState({
            repeats: repeats,
        });
    }

    setWeather = (weather) => {
        this.setState({
            weather: weather,
        });
    }

    submitRun = () => {
        if (this.props.checkValidUser()) {
            let runData = {
                workoutType: "run",
                userId: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                date: this.state.date,
                time: this.state.time,
                location: this.state.location,
                distance: this.state.distance,
                duration: this.state.duration,
                milePace: this.state.milePace,
                runType: this.state.runType,
                laps: null,
                repeats: JSON.stringify(this.state.repeats),
                race: this.state.race,
                surface: this.state.surface,
                weather: this.state.weather,
                climb: this.state.climb,
                grade: this.state.grade,
                shoe: this.state.shoe,
                bike: null,
                generator: null,
                pushups: null,
                pullups: null,
                workout: null,
                muscleGroups: null,
                notes: this.state.notes,
                map: this.state.map,
            }

            workoutAPI.createWorkout(runData)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Run submitted!");
                        window.location.reload();
                    }
                    else {
                        alert("Error submitting run.");
                    }
                });
        }
    }

    render() {
        return (
            <div className="container pageContainer submitContainer">

                <div>

                    <div className="titleBar">
                        <h4>Running Workout</h4>
                        <ActivityIcons
                            hidden="run"
                        />
                    </div>

                    <div>

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
                            {/* MILE PACE */}
                            <div className="col-md-2 input-group-text milePace">
                                {this.state.milePace}
                            </div>
                        </div>

                        {/* TYPE */}
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Run Type</span>
                            </div>
                            <select
                                className="browser-default custom-select"
                                autoComplete="off"
                                name="runType"
                                type="text"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                                onFocus={this.getMilePace}
                                defaultValue={null}
                            >
                                <option value=""></option>
                                <option value="Repeats">Repeats</option>
                                <option value="Race">Race</option>
                            </select>
                        </div>

                        {/* REPEATS */}
                        {this.state.type === "Repeats" ? (
                            <button className="btn btn-dark btn-sm addRepeatBtn" onClick={this.addRepeat}>Add</button>
                        ) : (
                                <></>
                            )}

                        {this.state.type === "Repeats" ? (
                            this.state.repeats.map(repeat => (
                                <RunRepeat
                                    key={Math.random() * 100000}
                                    id={repeat.id}
                                    distance={repeat.distance}
                                    time={repeat.time}
                                    rest={repeat.rest}
                                    setDistance={this.setDistance}
                                    setTime={this.setTime}
                                    setRest={this.setRest}
                                    deleteRepeat={this.deleteRepeat}
                                />
                            ))
                        ) : (
                                <></>
                            )}

                        {/* RACE */}
                        {this.state.type === "Race" ? (
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Race Name</span>
                                </div>
                                <input
                                    autoComplete="off"
                                    name="race"
                                    type="text"
                                    className="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        ) : (
                                <></>
                            )}

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
                                <option value="Beach">Beach</option>
                                <option value="Treadmill">Treadmill</option>
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
                            />
                        </div>

                        {/* SHOE */}
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Footwear</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="shoe"
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

                        <button className="btn btn-primary" onClick={this.submitRun}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitRun;
import React, { Component } from "react";
import RunRepeat from "../components/RunRepeat/runRepeat";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import WeatherIcons from "../components/WeatherIcons/weatherIcons";
import workoutAPI from "../utils/workoutAPI";
import userAPI from "../utils/userAPI";
import shoeAPI from "../utils/shoeAPI";
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
            ttlMins: null,
            milePace: null,
            runType: "Training",
            repeats: [],
            race: null,
            location: null,
            surface: null,
            weather: null,
            climb: null,
            grade: 0.00,
            shoe: "",
            shoes: null,
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
                }, () => {
                    this.getShoes();
                });
            });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    validateRunForm = () => {
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
                ttlMins: Math.round((totalMinutes * 100) / 100),
            });
        }
    }

    addRepeat = () => {
        let repeats = this.state.repeats;

        let maxId = -1;
        for (var r in repeats) {
            if (repeats[r].id > maxId) {
                maxId = parseInt(repeats[r].id);
            }
        }

        let repeat = {
            id: maxId + 1,
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

    getRepeat = (repeat) => {
        let repeats = this.state.repeats;
        let idx = -1;

        for (var r in repeats) {
            if (repeats[r].id === repeat.id) {
                idx = r;
            }
        }

        if (idx > -1) {
            repeats[idx] = repeat;
        }
        else {
            repeats.push(repeat);
        }

        this.setState({
            repeats: repeats,
        });
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

    getShoes = () => {
        shoeAPI.getShoesByUserId(this.state.userId)
            .then((res) => {
                this.setState({
                    shoes: res.data,
                });
            });
    }

    submitRun = () => {
        this.props.checkValidUser();
        
        if (this.validateRunForm()) {
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
                ttlMins: this.state.ttlMins,
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

    setDist = (id, dist) => {
        let repeats = this.state.repeats;

        for (var r in repeats) {
            if (repeats[r].id === id) {
                repeats[r].distance = dist;
            }
        }

        this.setState({
            repeats: repeats,
        });
    }

    setTime = (id, time) => {
        let repeats = this.state.repeats;

        for (var r in repeats) {
            if (repeats[r].id === id) {
                repeats[r].time = time;
            }
        }

        this.setState({
            repeats: repeats,
        });
    }

    setRest = (id, rest) => {
        let repeats = this.state.repeats;

        for (var r in repeats) {
            if (repeats[r].id === id) {
                repeats[r].rest = rest;
            }
        }

        this.setState({
            repeats: repeats,
        });
    }

    getToday = () => {
        let today = new Date();
        let month = today.getMonth();
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
                                <span className="input-group-text" id="inputGroup-sizing-sm">Miles*</span>
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
                                onBlur={() => {
                                    this.getMilePace();
                                    this.getGrade();
                                }}
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
                                onBlur={this.getMilePace}
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
                                defaultValue={null}
                            >
                                <option value="">Training</option>
                                <option value="Repeats">Repeats</option>
                                <option value="Race">Race</option>
                            </select>
                        </div>

                        {/* REPEATS */}
                        {this.state.runType === "Repeats" ? (
                            this.state.repeats.map(repeat => (
                                <RunRepeat
                                    key={repeat.id}
                                    id={repeat.id}
                                    getRepeat={this.getRepeat}
                                    deleteRepeat={this.deleteRepeat}
                                    setDist={this.setDist}
                                    setTime={this.setTime}
                                    setRest={this.setRest}
                                />
                            ))
                        ) : (
                                <></>
                            )}

                        {/* ADD REPEAT BUTTON */}
                        {this.state.runType === "Repeats" ? (
                            <div className="addRepeatBtn">
                                <button className="btn btn-dark btn-sm" onClick={this.addRepeat}>Add Repeat</button>
                            </div>
                        ) : (
                                <></>
                            )}

                        {/* RACE */}
                        {this.state.runType === "Race" ? (
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
                                onBlur={this.getGrade}
                            />
                            {/* GRADE */}
                            <div className="col-md-2 input-group-text grade">
                                {this.state.grade}%
                            </div>
                        </div>

                        {/* SHOE */}
                        {this.state.shoes && this.state.shoes.length > 0 ? (
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Footwear</span>
                                </div>
                                <select
                                    className="browser-default custom-select"
                                    autoComplete="off"
                                    name="shoe"
                                    type="text"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={this.handleInputChange}
                                    value={this.state.shoe}
                                >
                                    <option value=""></option>
                                    {this.state.shoes.map(shoe => (
                                        <option key={Math.random() * 1000000} value={shoe.shoe}>{shoe.shoe}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
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
                        )}

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
                            <button className="btn btn-primary" onClick={this.submitRun}>Submit</button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitRun;
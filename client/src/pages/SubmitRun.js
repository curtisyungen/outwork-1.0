import React, { Component } from "react";
import Container from "../components/Container/container";
import RunRepeat from "../components/RunRepeat/runRepeat";
import actAPI from "../utils/actAPI";
import "./SubmitRun.css";

class SubmitRun extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            distance: null,
            duration: null,
            milePace: null,
            type: null,
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

        let repeat = {
            id: 0,
            distance: "",
            time: "",
            rest: "",
        }

        let repeats = [repeat];

        let userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
            repeats: repeats,
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

    submitRun = () => {
        if (this.props.checkValidUser()) {
            let runData = {
                userId: this.state.userId,
                date: this.state.date,
                distance: this.state.distance,
                duration: this.state.duration,
                milePace: this.state.milePace,
                type: this.state.type,
                repeats: JSON.stringify(this.state.repeats),
                race: this.state.race,
                location: this.state.location,
                surface: this.state.surface,
                weather: this.state.weather,
                climb: this.state.climb,
                grade: this.state.grade,
                shoe: this.state.shoe,
                notes: this.state.notes,
                map: this.state.map,
            }

            actAPI.createRun(runData)
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
            <Container>
                <div>

                    <a className="activity-sm" href="/bike">Bike</a>
                    <a className="activity-sm" href="/swim">Swim</a>
                    <a className="activity-sm" href="/lift">Lift</a>

                    <h4>Running Workout</h4>

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
                        {/* MILE PACE */}
                        <div className="col-md-2 input-group-text">
                            {this.state.milePace}
                        </div>
                    </div>



                    {/* TYPE */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Type</span>
                        </div>
                        <select
                            className="browser-default custom-select"
                            autoComplete="off"
                            name="type"
                            type="text"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                            onFocus={this.getMilePace}
                            defaultValue={null}
                        >
                            <option value=""></option>
                            <option value="repeats">Repeats</option>
                            <option value="race">Race</option>
                        </select>
                    </div>

                    {/* REPEATS */}

                    {this.state.type === "repeats" ? (
                        <button className="btn btn-dark btn-sm addRepeatBtn" onClick={this.addRepeat}>Add</button>
                    ) : (
                            <></>
                        )}

                    {this.state.type === "repeats" ? (
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
                    {this.state.type === "race" ? (
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
                            <option value="sunny">Street</option>
                            <option value="rainy">Bike Path</option>
                            <option value="cloudy">Track</option>
                            <option value="sunny">Trail</option>
                            <option value="rainy">Dirt Road</option>
                            <option value="cloudy">Grass</option>
                            <option value="sunny">Beach</option>
                            <option value="rainy">Treadmill</option>
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
            </Container>
        )
    }
}

export default SubmitRun;
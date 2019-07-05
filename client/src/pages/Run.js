import React, { Component } from "react";
import actAPI from "../utils/actAPI";
import "./Run.css";

class Run extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            distance: null,
            duration: null,
            milePace: null,
            type: null,
            repeats: null,
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

    submitRun = () => {
        if(this.props.checkValidUser()) {
            let runData = {
                userId: this.state.userId,
                date: this.state.date,
                distance: this.state.distance,
                duration: this.state.duration,
                milePace: this.state.milePace,
                type: this.state.type,
                repeats: this.state.repeats,
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

            actAPI.createRun(runData);
        }
    }

    render() {
        return (
            <div className="logRunPage col-lg-12">

                <a className="activity-sm col-md-2" href="/bike">Bike</a>
                <a className="activity-sm col-md-2" href="/swim">Swim</a>
                <a className="activity-sm col-md-2" href="/lift">Lift</a>

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
                        placeholder="miles"
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

                <div className="input-group-text">
                    {this.state.milePace}
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
                        onFocus={this.getMilePace}
                    />
                </div>

                {/* TYPE */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Type</span>
                    </div>
                    <input 
                        autoComplete="off"
                        name="type" 
                        type="text" 
                        className="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-sm" 
                        onChange={this.handleInputChange}
                    />
                </div>

                {/* REPEATS */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Repeats</span>
                    </div>
                    <input 
                        autoComplete="off"
                        name="repeats" 
                        type="text" 
                        className="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-sm" 
                        onChange={this.handleInputChange}
                    />
                </div>

                {/* RACE */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Race</span>
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

                {/* SURFACE */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Surface</span>
                    </div>
                    <input 
                        autoComplete="off"
                        name="surface" 
                        type="text" 
                        className="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-sm" 
                        onChange={this.handleInputChange}
                    />
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
        )
    }
}

export default Run;
import React, { Component } from "react";
import actAPI from "../utils/actAPI";
// import "./Swim.css";

class Swim extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            distance: null,
            duration: null,
            laps: null,
            location: null,
            waterType: null,
            swimWorkout: null,
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

    submitSwim = () => {
        if(this.props.checkValidUser()) {
            let swimData = {
                userId: this.state.userId,
                date: this.state.date,
                distance: this.state.distance,
                duration: this.state.duration,
                laps: this.state.laps,
                location: this.state.location,
                waterType: this.state.waterType,
                swimWorkout: this.state.swimWorkout,
                notes: this.state.notes,
            }

            actAPI.createSwim(swimData)
                .then((res) => {
                    console.log(res);
                });
        }
    }

    render() {
        return (
            <div className="logRunPage col-lg-4">

                <a className="activity-sm col-md-2" href="/run">Run</a>
                <a className="activity-sm col-md-2" href="/bike">Bike</a>
                <a className="activity-sm col-md-2" href="/lift">Lift</a>

                <h4>Swimming Workout</h4>

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
                    <input
                        autoComplete="off"
                        name="waterType"
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={this.handleInputChange}
                    />
                </div>

                {/* SWIM WORKOUT */}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Swim Workout</span>
                    </div>
                    <input
                        autoComplete="off"
                        name="swimWorkout"
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
        )
    }
}

export default Swim;
import React, { Component } from "react";
import Container from "../components/Container/container";
import actAPI from "../utils/actAPI";
// import "./Bike.css";

class Bike extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
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

    submitBike = () => {
        if (this.props.checkValidUser()) {
            let bikeData = {
                userId: this.state.userId,
                date: this.state.date,
                distance: this.state.distance,
                duration: this.state.duration,
                location: this.state.location,
                surface: this.state.surface,
                weather: this.state.weather,
                climb: this.state.climb,
                grade: this.state.grade,
                bike: this.state.shoe,
                notes: this.state.notes,
                map: this.state.map,
            }

            actAPI.createBike(bikeData)
                .then((res) => {
                    console.log(res);
                });
        }
    }

    render() {
        return (
            <Container>
                <div>

                    <a className="activity-sm col-md-2" href="/run">Run</a>
                    <a className="activity-sm col-md-2" href="/swim">Swim</a>
                    <a className="activity-sm col-md-2" href="/lift">Lift</a>

                    <h4>Biking Workout</h4>

                    {/* DATE */}
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                            <option value="rainy">Stationary</option>
                        </select>
                    </div>

                    {/* WEATHER */}
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
            </Container>
        )
    }
}

export default Bike;
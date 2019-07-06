import React, { Component } from "react";
// import Modal from "react-responsive-modal";
// import "./repeat.css";

class Repeat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            distance: "",
            time: "",
            rest: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            distance: this.props.distance,
            time: this.props.time,
            rest: this.props.rest,
        });
    }

    deleteRepeat = () => {
        this.props.deleteRepeat(this.state.id);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        }, () => {
            if (name === "distance") {
                this.props.setDistance(this.state.id, this.state.distance);
            }
            else if (name === "time") {
                this.props.setTime(this.state.id, this.state.time);
            }
            else if (name === "rest") {
                this.props.setRest(this.state.id, this.state.rest);
            }
        });        
    }

    render() {
        return (
            <div className="col-md-4 input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Repeat</span>
                </div>
                <input
                    name="distance"
                    type="text"
                    className="form-control"
                    placeholder="Miles"
                    onChange={this.handleInputChange}
                    value={this.props.distance}
                />
                <input
                    name="time"
                    type="text"
                    className="form-control"
                    placeholder="Time"
                    onChange={this.handleInputChange}
                    value={this.props.time}
                />
                <input
                    name="rest"
                    type="text"
                    className="form-control"
                    placeholder="Rest"
                    onChange={this.handleInputChange}
                    value={this.props.rest}
                />
                <button
                    className="btn btn-danger btn-sm"
                    onClick={this.deleteRepeat}
                >
                    Delete
                </button>
            </div>
        )
    }

}

export default Repeat;

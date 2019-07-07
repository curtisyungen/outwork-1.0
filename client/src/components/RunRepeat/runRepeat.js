import React, { Component } from "react";
// import "./runRepeat.css";

class RunRepeat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            distance: "",
            time: "",
            rest: "",
            focus: "",
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
        });        
    }

    updateParent = () => {
        this.props.setDistance(this.state.id, this.state.distance);
        this.props.setTime(this.state.id, this.state.time);
        this.props.setRest(this.state.id, this.state.rest);
    }

    render() {
        return (
            <div className="input-group input-group-sm mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">Repeat</span>
                </div>
                <input
                    autoComplete="off"
                    name="distance"
                    type="text"
                    className="form-control"
                    placeholder="Miles"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.distance}
                />
                <input
                    autoComplete="off"
                    name="time"
                    type="text"
                    className="form-control"
                    placeholder="Time"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.time}
                />
                <input
                    autoComplete="off"
                    name="rest"
                    type="text"
                    className="form-control"
                    placeholder="Rest"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.rest}
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

export default RunRepeat;

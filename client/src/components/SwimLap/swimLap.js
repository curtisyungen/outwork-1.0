import React, { Component } from "react";
import "./swimLap.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faSave, faTrashAlt);

class SwimLap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            distance: "",
            units: "",
            time: "",
            stroke: "",
            sets: "",
            rest: "",
            saved: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            distance: this.props.distance,
            units: this.props.units,
            time: this.props.time,
            stroke: this.props.stroke,
            rest: this.props.rest,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            saved: false,
        });
    }

    deleteLap = () => {
        this.props.deleteLap(this.state.id);
    }

    updateParent = () => {
        this.props.setDistance(this.props.id, this.state.distance);
        this.props.setTime(this.props.id, this.state.time);
        this.props.setStroke(this.props.id, this.state.stroke);
        this.props.setSets(this.props.id, this.state.sets);
        this.props.setRest(this.props.id, this.state.rest);
    }

    render() {
        return (
            <div className={`input-group input-group-sm lap saved-${this.state.saved}`}>
                {/* DISTANCE */}
                <input
                    autoComplete="off"
                    name="distance"
                    type="text"
                    className="form-control lapInput-md"
                    placeholder={this.props.units}
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.distance}
                />
                {/* TIME */}
                <input
                    autoComplete="off"
                    name="time"
                    type="text"
                    className="form-control lapInput-md"
                    placeholder="Time (mm:ss)"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.time}
                />
                {/* STROKE */}
                <input
                    autoComplete="off"
                    name="stroke"
                    type="text"
                    className="form-control lapInput-md"
                    placeholder="Stroke"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.stroke}
                />
                {/* SETS */}
                <input
                    autoComplete="off"
                    name="sets"
                    type="text"
                    className="form-control lapInput-md"
                    placeholder="Sets"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.sets}
                />
                {/* REST */}
                <input
                    autoComplete="off"
                    name="rest"
                    type="text"
                    className="form-control lapInput-md"
                    placeholder="Rest (min.)"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.rest}
                />
                {/* DELETE */}
                <button
                    className="btn btn-danger btn-sm exerciseBtn"
                    onClick={this.deleteLap}
                >
                    <FontAwesomeIcon className="fa-2x faTrashAlt" icon={faTrashAlt} />
                </button>
            </div>
        )
    }
}

export default SwimLap;
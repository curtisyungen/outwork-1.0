import React, { Component } from "react";
import "./runRepeat.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faSave, faTrashAlt);

class RunRepeat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            distance: "",
            time: "",
            rest: "",
            focus: "",
            saved: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            distance: this.props.distance,
            time: this.props.time,
            rest: this.props.rest,
        }, () => {
            this.checkSaved();
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            saved: false,
        });
    }

    checkSaved = () => {
        if (this.props.distance !== "" && this.props.time !== "") {
            this.setState({
                saved: true,
            });
        }
    }

    sendRepeat = () => {
        let repeat = {
            id: this.props.id,
            distance: this.state.distance,
            time: this.state.time,
            rest: this.state.rest,
        }

        this.props.getRepeat(repeat);

        this.setState({
            saved: true,
        });
    }

    deleteRepeat = () => {
        this.props.deleteRepeat(this.state.id);
    }

    render() {
        return (
            <div className={`input-group input-group-sm repeat saved-${this.state.saved}`}>
                {/* DISTANCE */}
                <input
                    autoComplete="off"
                    name="distance"
                    type="text"
                    className="form-control repeatInput-md"
                    placeholder="Miles"
                    onChange={this.handleInputChange}
                    value={this.state.distance}
                />
                {/* TIME */}
                <input
                    autoComplete="off"
                    name="time"
                    type="text"
                    className="form-control repeatInput-md"
                    placeholder="Time (mm:ss)"
                    onChange={this.handleInputChange}
                    value={this.state.time}
                />
                {/* REST */}
                <input
                    autoComplete="off"
                    name="rest"
                    type="text"
                    className="form-control repeatInput-md"
                    placeholder="Rest (min.)"
                    onChange={this.handleInputChange}
                    value={this.state.rest}
                />
                {/* SAVE */}
                <button
                    className="btn btn-success btn-sm exerciseBtn saveBtn"
                    onClick={this.sendRepeat}
                >
                    <FontAwesomeIcon className="fa-2x faSave" icon={faSave} />
                </button>
                {/* DELETE */}
                <button
                    className="btn btn-danger btn-sm exerciseBtn"
                    onClick={this.deleteRepeat}
                >
                    <FontAwesomeIcon className="fa-2x faTrashAlt" icon={faTrashAlt} />
                </button>
            </div>
        )
    }

}

export default RunRepeat;

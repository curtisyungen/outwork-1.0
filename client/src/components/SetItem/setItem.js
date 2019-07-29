import React, { Component } from "react";
import "./setItem.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

library.add(faSave);

class SetItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            actualReps: "",
            weight: "",
            rest: "",
            notes: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    updateParent = () => {
        if (this.state.actualReps !== null) {
            this.props.setActualReps(this.props.id, this.props.assignName, this.state.actualReps);
        }

        if (this.state.weight !== null) {
            this.props.setWeight(this.props.id, this.props.assignName, this.state.weight);
        }

        if (this.state.rest !== null) {
            this.props.setRest(this.props.id, this.props.assignName, this.state.rest);
        }

        if (this.state.notes !== null) {
            this.props.setNotes(this.props.id, this.props.assignName, this.state.notes);
        }
    }

    render() {
        return (
            <div className={`setItem`}>
                <a
                    className="exName"
                    href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.assignName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.props.assignName}
                </a>

                <div className="exReps">
                    {this.props.assignReps}
                </div>

                <div className={`exActual saved-${this.state.saved}`}>
                    {/* ACTUAL REPS */}
                    <input
                        autoComplete="off"
                        name="actualReps"
                        type="text"
                        className="form-control actualData"
                        placeholder="Reps"
                        onChange={this.handleInputChange}
                        onBlur={this.updateParent}
                        value={this.state.actualReps}
                    />
                    {/* WEIGHT */}
                    <input
                        autoComplete="off"
                        name="weight"
                        type="text"
                        className="form-control actualData"
                        placeholder="Lbs."
                        onChange={this.handleInputChange}
                        onBlur={this.updateParent}
                        value={this.state.weight}
                    />
                    {/* REST */}
                    <input
                        autoComplete="off"
                        name="rest"
                        type="text"
                        className="form-control actualData"
                        placeholder="Rest"
                        onChange={this.handleInputChange}
                        onBlur={this.updateParent}
                        value={this.state.rest}
                    />
                    {/* NOTES */}
                    <input
                        autoComplete="off"
                        name="notes"
                        type="text"
                        className="form-control actualData"
                        placeholder="Notes"
                        onChange={this.handleInputChange}
                        onBlur={this.updateParent}
                        value={this.state.notes}
                    />
                    
                </div>
            </div>
        )
    }
}

export default SetItem;
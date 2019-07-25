import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faBed, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import "./setItem.css";

library.add(faDumbbell, faBed, faPencilAlt);

class SetItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openWeightModal: false,
            openRestModal: false,
            openNotesModal: false,
            id: null,
            name: null,
            actualReps: null,
            weight: "",
            rest: "",
            notes: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            name: this.props.name,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    openModal = (name) => {

        let weight = false, rest = false, notes = false;

        switch (name) {
            case "weight": weight = true; break;
            case "rest": rest = true; break;
            case "notes": notes = true; break;
            default: weight = false;
        }

        this.setState({
            openWeightModal: weight,
            openRestModal: rest,
            openNotesModal: notes,
        });
    }

    closeModal = (name) => {

        if (this.state.weight !== null) {
            this.props.setWeight(this.state.id, this.state.name, this.state.weight);
        }

        if (this.state.rest !== null) {
            this.props.setRest(this.state.id, this.state.name, this.state.rest);
        }

        if (this.state.notes !== null) {
            this.props.setNotes(this.state.id, this.state.name, this.state.notes);
        }

        this.setState({
            openWeightModal: false,
            openRestModal: false,
            openNotesModal: false,
        });
    }

    render() {
        return (
            <div className={`setItem diff${this.props.difficulty}`}>
                <a
                    className="exName"
                    href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.props.name}
                </a>

                <div className="exReps">
                    {this.props.reps}
                </div>

                <div className="exActual">
                    {/* ACTUAL REPS */}
                    <input
                        autoComplete="off"
                        name="actualReps"
                        type="text"
                        className="form-control actualData"
                        placeholder="Reps"
                        onChange={this.handleInputChange}
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
                        value={this.state.notes}
                    />
                </div>

                {/* <div className="setItemIcons">
                    
                    <FontAwesomeIcon 
                        className={`setIcon icon-${this.state.weight && this.state.weight !== ""}`} 
                        icon={faDumbbell} 
                        onClick={this.openModal.bind(null, "weight")} 
                    />
                    <FontAwesomeIcon 
                        className={`setIcon icon-${this.state.rest && this.state.rest !== ""}`} 
                        icon={faBed} 
                        onClick={this.openModal.bind(null, "rest")} 
                    />
                    <FontAwesomeIcon 
                        className={`setIcon icon-${this.state.notes && this.state.notes !== ""}`} 
                        icon={faPencilAlt} 
                        onClick={this.openModal.bind(null, "notes")} 
                    />
                </div> */}

                {this.state.openWeightModal ? (
                    <Modal
                        open={this.state.openWeightModal}
                        onClose={this.closeModal.bind(null, "weight")}
                    >
                        <div className="col-md-4 input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Weight (lbs.)</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="weight"
                                type="text"
                                className="form-control"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                                value={this.state.weight}
                            />
                            <button className="btn btn-success btn-sm" onClick={this.closeModal}>Save</button>
                        </div>
                    </Modal>
                ) : (
                        <></>
                    )}

                {this.state.openRestModal ? (
                    <Modal
                        open={this.state.openRestModal}
                        onClose={this.closeModal.bind(null, "rest")}
                    >
                        <div className="col-md-4 input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Rest (min.)</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="rest"
                                type="text"
                                className="form-control"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                                value={this.state.rest}
                            />
                            <button className="btn btn-success btn-sm" onClick={this.closeModal}>Save</button>
                        </div>
                    </Modal>
                ) : (
                        <></>
                    )}

                {this.state.openNotesModal ? (
                    <Modal
                        open={this.state.openNotesModal}
                        onClose={this.closeModal.bind(null, "notes")}
                    >
                        <div className="col-md-4 input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Notes</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="notes"
                                type="text"
                                className="form-control"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                                value={this.state.notes}
                            />
                            <button className="btn btn-success btn-sm" onClick={this.closeModal}>Save</button>
                        </div>
                    </Modal>
                ) : (
                        <></>
                    )}

            </div>
        )
    }
}

export default SetItem;
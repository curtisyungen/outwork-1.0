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
            weight: null,
            rest: null,
            notes: null,
        }
    }

    componentDidMount = () => {

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

    closeModal = () => {
        this.setState({
            openWeightModal: false,
            openRestModal: false,
            openNotesModal: false,
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="setItem col-md-12">
                <a
                    className="exName col-md-8"
                    href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.props.name}
                </a>

                <div className="setItemIcons col-md-4">
                    <span className="setIcon">{this.props.reps}</span>
                    <FontAwesomeIcon className={`setIcon icon-${this.state.weight !== null}`} icon={faDumbbell} onClick={this.openModal.bind(null, "weight")} />
                    <FontAwesomeIcon className={`setIcon icon-${this.state.rest !== null}`} icon={faBed} onClick={this.openModal.bind(null, "rest")} />
                    <FontAwesomeIcon className={`setIcon icon-${this.state.notes !== null}`} icon={faPencilAlt} onClick={this.openModal.bind(null, "notes")} />
                </div>

                {this.state.openWeightModal ? (
                    <Modal
                        open={this.state.openWeightModal}
                        onClose={this.closeModal}
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
                            />
                        </div>
                    </Modal>
                ) : (
                        <></>
                    )}

                {this.state.openRestModal ? (
                    <Modal
                        open={this.state.openRestModal}
                        onClose={this.closeModal}
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
                            />
                        </div>
                    </Modal>
                ) : (
                        <></>
                    )}

                {this.state.openNotesModal ? (
                    <Modal
                        open={this.state.openNotesModal}
                        onClose={this.closeModal}
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
                            />
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
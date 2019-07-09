import React, { Component } from "react";
import Modal from "react-responsive-modal";
import LiftDetailSet from "../LiftDetailSet/liftDetailSet";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import "./lift.css";

library.add(faDumbbell);

class Lift extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            userId: null,
            workout: null,
            generator: null,
        }
    }

    componentDidMount = () => {
        let workout = JSON.parse(this.props.workout);

        let generator = this.props.generator;
        let generatorText;

        switch (generator) {
            case "1": generatorText = "Baby"; break;
            case "2": generatorText = "Easy"; break;
            case "3": generatorText = "Average"; break;
            case "4": generatorText = "Superior"; break;
            case "5": generatorText = "Hero"; break;
            case "6": generatorText = "Superman"; break;
            case "7": generatorText = "Rogan"; break;
            case "8": generatorText = "Goggins"; break;
            default: generatorText = "";
        }

        this.setState({
            userId: this.props.userId,
            workout: workout,
            generatorText: generatorText,
        });
    }

    openModal = () => {
        this.setState({
            openModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

    deleteLift = (event) => {
        event.preventDefault();

        let confirm = window.confirm("Delete this workout?");

        if (confirm) {
            this.props.deleteActivity("lift", this.props.id);
        }
    }

    render() {
        return (
            <span>
                <table className="table table-hover table-bordered actCard" onClick={this.openModal}>
                    <tbody>
                        <tr>
                            <td className="liftIcon"><FontAwesomeIcon className="fa-2x icon" icon={faDumbbell} /></td>
                            <td className="cell">{this.props.firstName} {this.props.lastName}</td>
                            <td className="cell">{this.props.date}</td>
                        </tr>
                    </tbody>
                </table>

                {this.state.openModal ? (
                    <Modal 
                        open={this.state.openModal}
                        onClose={this.closeModal}
                    >
                        <div>
                            <h5>Summary:</h5>
                            <table className="table table-striped table-bordered table-sm text-center align-middle liftDetails">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Date</th>
                                        <th>Duration (hh:mm:ss)</th>
                                        <th>Location</th>
                                        <th>Generator</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.props.date}</td>
                                        <td>{this.props.duration}</td>
                                        <td>{this.props.location}</td>
                                        <td>{this.state.generatorText}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <table className="table table-striped table-bordered table-sm text-center align-middle liftDetails">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Total Pull-Ups</th>
                                        <th>Total Push-Ups</th>
                                        <th>Muscle Groups</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.props.pullups}</td>
                                        <td>{this.props.pushups}</td>
                                        <td>{this.props.muscleGroups}</td>
                                        <td>{this.props.notes}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                        <h5>Workout:</h5>
                            {this.state.workout && this.state.workout.length > 0 ? (
                                this.state.workout.map(set => (
                                    <LiftDetailSet
                                        key={Math.random() * 100000}
                                        set={set}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>

                        <button className="btn btn-danger btn-sm deleteActivity" onClick={this.deleteLift}>Delete Workout</button>
                    </Modal>
                ) : (
                    <></>
                )}
            </span>
        )
    }
}

export default Lift;
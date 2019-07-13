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
            generatorText: null,
            muscleGroups: null,
        }
    }

    componentDidMount = () => {
        let workout = JSON.parse(this.props.workout);

        this.getMuscleGroups();

        this.setState({
            userId: this.props.userId,
            workout: workout,
        });
    }

    getMuscleGroups = () => {
        this.setState({
            muscleGroups: this.props.muscleGroups,
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
            this.props.deleteActivity(this.props.id);
        }
    }

    render() {
        return (
            <span>
                <div className="d-flex flex-row actCard" onClick={this.openModal}>
                    <div className="liftIcon"><FontAwesomeIcon className="fa-2x icon" icon={faDumbbell} /></div>
                    <div className="cell"><span className="cellDesc">Name</span>{this.props.firstName}</div>
                    <div className="cell"><span className="cellDesc">Date</span>{this.props.date}</div>
                    <div className="cell"><span className="cellDesc">Generator</span>{this.props.generator}</div>
                    <div className="cell cell4"><span className="cellDesc">Time</span>{this.props.duration}</div>
                    <div className="cell cell5"><span className="cellDesc">Muscle Grps.</span>{this.state.muscleGroups}</div>
                    <div className="cell cell6"><span className="cellDesc">Push-Ups</span>{this.state.pushups}</div>
                    <div className="cell cell7"><span className="cellDesc">Pull-Ups</span>{this.props.pullups}</div>
                    <div className="cell cell8 actNotes"><span className="cellDesc">Notes</span>{this.props.notes}</div>
                </div>

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

                        {this.props.userId === localStorage.getItem("userId") ? (
                            <button className="btn btn-danger btn-sm deleteActivity" onClick={this.deleteLift}>Delete Workout</button>
                        ) : (
                            <></>
                        )}
                    </Modal>
                ) : (
                    <></>
                )}
            </span>
        )
    }
}

export default Lift;
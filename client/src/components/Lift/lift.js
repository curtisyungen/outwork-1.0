import React, { Component } from "react";
import Modal from "react-responsive-modal";
import LiftDetailSet from "../LiftDetailSet/liftDetailSet";
import "./lift.css";

class Lift extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            workout: null,
        }
    }

    componentDidMount = () => {
        let workout = JSON.parse(this.props.workout);

        this.setState({
            workout: workout,
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

    deleteLift = () => {
        let confirm = window.confirm("Delete this workout?");

        if (confirm) {
            this.props.deleteActivity("lift", this.props.id);
        }
    }

    render() {
        return (
            <span>
            <div className="card actCard" onClick={this.openModal}>
                <div className="card-body">
                    <h4 className="card-title mb-0">Lift</h4>
                    <h6 className="card-subtitle text-muted mb-0">{this.props.date}</h6>
                    <div className="card-text">
                        <span>{this.props.duration}</span>
                        <span>{this.props.generator}</span>
                    </div>
                </div>
            </div>

            {this.state.openModal ? (
                <Modal 
                    open={this.state.openModal}
                    onClose={this.closeModal}
                >
                    <div>
                        <h5>Summary:</h5>
                        <table className="table table-striped table-bordered table-sm text-center liftDetails">
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
                                    <td>{this.props.generator}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <table className="table table-striped table-bordered table-sm text-center liftDetails">
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

                    <div className="card-link deleteActivity" onClick={this.deleteLift}>Delete Workout</div>
                </Modal>
            ) : (
                <></>
            )}
            </span>


        )
    }
}

export default Lift;
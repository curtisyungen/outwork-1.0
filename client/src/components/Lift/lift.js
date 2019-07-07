import React, { Component } from "react";
import Modal from "react-responsive-modal";
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

        console.log(workout);
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
        this.props.deleteActivity("lift", this.props.id);
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
                    <div className="liftDetails">
                        <div>Date: {this.props.date}</div>
                        <div>Duration: {this.props.duration}</div>
                        <div>Location: {this.props.location}</div>
                        <div>Generator: {this.props.generator}</div>
                        <div>Muscle Groups: {this.props.muscleGroups}</div>
                        <div>Notes: {this.props.notes}</div>
                        <div>Pull-Ups: {this.props.pullups}</div>
                        <div>Push-Ups: {this.props.pushups}</div>
                        <div>Workout: 
                            {this.state.workout && this.state.workout.length > 0 ? (
                                this.state.workout.map(set => (
                                    <div>{set[0].name}</div>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="card-link deleteActivity" onClick={this.deleteLift}>Delete</div>
                </Modal>
            ) : (
                <></>
            )}
            </span>


        )
    }
}

export default Lift;
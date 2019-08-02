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
        let muscleGroups = JSON.parse(this.props.muscleGroups);
        let groups = [];
        
        if (muscleGroups !== null && muscleGroups.length > 1) {
            groups = muscleGroups.join(", ");
        }

        this.setState({
            muscleGroups: groups,
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
                    <div className={`liftIcon border-${this.props.generator.toLowerCase()}`}><FontAwesomeIcon className="fa-2x icon" icon={faDumbbell} /></div>
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
                        {/* ICON, DATE */}
                        <div className="">
                            <FontAwesomeIcon className="fa-3x liftIcon dataIcon" icon={faDumbbell} />
                            <h5 className="dataPoint-xl">{this.props.firstName} | {this.props.date}</h5>
                        </div>

                        {/* DATA */}
                        <div>
                            <div className="d-flex flex-column">
                                <div className="border-bottom">
                                    <div className="dataTitle">Location</div>
                                    <div className="dataPoint">{this.props.location}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Time of Day</div>
                                    <div className="dataPoint">{this.props.time}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Duration</div>
                                    <div className="dataPoint">{this.props.duration}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Generator</div>
                                    <div className="dataPoint">{this.props.generator}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Push-Ups</div>
                                    <div className="dataPoint">{this.props.pushups}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Pull-Ups</div>
                                    <div className="dataPoint">{this.props.pullups}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Muscle Groups</div>
                                    <div className="dataPoint">{this.props.muscleGroups ? (
                                        JSON.parse(this.props.muscleGroups).map(group => (
                                            <span key={group}>{group}&nbsp;&nbsp;</span>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Notes</div>
                                    <div className="dataPoint">{this.props.notes}</div>
                                </div>
                            </div>
                        </div>

                        <div className="liftWorkout">
                            <h5>Workout</h5>
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
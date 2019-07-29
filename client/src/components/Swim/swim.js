import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer } from '@fortawesome/free-solid-svg-icons';
import "./swim.css";

library.add(faSwimmer);

class Swim extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            userId: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
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

    deleteSwim = () => {
        this.props.deleteActivity(this.props.id);
    }

    render() {
        return (
            <span>
                <div className="d-flex flex-row actCard" onClick={this.openModal}>
                    <div className="swimIcon"><FontAwesomeIcon className="fa-2x icon" icon={faSwimmer} /></div>
                    <div className="cell"><span className="cellDesc">Name</span>{this.props.firstName}</div>
                    <div className="cell"><span className="cellDesc">Date</span>{this.props.date}</div>
                    <div className="cell"><span className="cellDesc">Miles</span>{this.props.distance} miles</div>
                    <div className="cell cell4"><span className="cellDesc">Time</span>{this.props.duration}</div>
                    <div className="cell cell5"><span className="cellDesc">Location</span>{this.props.location}</div>
                    <div className="cell cell6"><span className="cellDesc">Water Type</span>{this.props.surface}</div>
                    <div className="cell cell7"><span className="cellDesc">Laps</span>{this.props.laps}</div>
                    <div className="cell cell8 actNotes"><span className="cellDesc">Notes</span>{this.props.notes}</div>
                </div>

                {this.state.openModal ? (
                    <Modal
                        open={this.state.openModal}
                        onClose={this.closeModal}
                    >
                        {/* ICON, DATE */}
                        <div className="">
                            <FontAwesomeIcon className="fa-3x swimIcon dataIcon" icon={faSwimmer} />
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
                                    <div className="dataTitle">Distance (mi.)</div>
                                    <div className="dataPoint">{this.props.distance}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Duration</div>
                                    <div className="dataPoint">{this.props.duration}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Laps</div>
                                    <div className="dataPoint">{this.props.laps}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Workout</div>
                                    <div className="dataPoint">{this.props.workout ? (
                                        JSON.parse(this.props.workout).map(lap => (
                                            <div className="swimLapDiv">
                                                <span className="swimLapModal">Distance: {lap.distance}</span>
                                                <span className="swimLapModal">Time: {lap.time}</span>
                                                <span className="swimLapModal">Stroke: {lap.stroke}</span>
                                                <span className="swimLapModal">Rest: {lap.rest}</span>
                                            </div>
                                        ))
                                    ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>

                                <div className="border-bottom">
                                    <div className="dataTitle">Water Type</div>
                                    <div className="dataPoint">{this.props.surface}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Notes</div>
                                    <div className="dataPoint">{this.props.notes}</div>
                                </div>
                            </div>
                        </div>

                        {this.props.userId === localStorage.getItem("userId") ? (
                            <button className="btn btn-danger btn-sm deleteActivity" onClick={this.deleteSwim}>Delete Swim</button>
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

export default Swim;
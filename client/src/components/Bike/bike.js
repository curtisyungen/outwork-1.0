import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiking } from '@fortawesome/free-solid-svg-icons';
import "./bike.css";

library.add(faBiking);

class Bike extends Component {

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

    deleteBike = () => {
        this.props.deleteActivity(this.props.id);
    }

    render() {
        return (
            <span>
                <div className="d-flex flex-row actCard" onClick={this.openModal}>
                    <div className="bikeIcon"><FontAwesomeIcon className="fa-2x icon" icon={faBiking} /></div>
                    <div className="cell"><span className="cellDesc">Name</span>{this.props.firstName}</div>
                    <div className="cell"><span className="cellDesc">Date</span>{this.props.date}</div>
                    <div className="cell"><span className="cellDesc">Miles</span>{this.props.distance} miles</div>
                    <div className="cell cell4"><span className="cellDesc">Time</span>{this.props.duration}</div>
                    <div className="cell cell5"><span className="cellDesc">Location</span>{this.props.location}</div>
                    <div className="cell cell6"><span className="cellDesc">Climb</span>{this.props.climb}</div>
                    <div className="cell cell7"><span className="cellDesc">Weather</span>{this.props.weather}</div>
                    <div className="cell cell8 actNotes"><span className="cellDesc">Notes</span>{this.props.notes}</div>
                </div>  

                {this.state.openModal ? (
                    <Modal
                        open={this.state.openModal}
                        onClose={this.closeModal}
                    >
                        {/* ICON, DATE */}
                        <div className="">
                            <FontAwesomeIcon className="fa-3x bikeIcon dataIcon" icon={faBiking} />
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
                                    <div className="dataTitle">Pace (min./mi.)</div>
                                    <div className="dataPoint">{this.props.milePace}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Climb (ft.)</div>
                                    <div className="dataPoint">{this.props.climb}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Grade (%)</div>
                                    <div className="dataPoint">{this.props.grade}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Surface</div>
                                    <div className="dataPoint">{this.props.surface}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Weather</div>
                                    <div className="dataPoint">{this.props.weather}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Bike</div>
                                    <div className="dataPoint">{this.props.bike}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Notes</div>
                                    <div className="dataPoint">{this.props.notes}</div>
                                </div>
                                <div className="border-bottom">
                                    <div className="dataTitle">Map</div>
                                    <div className="dataPoint">{this.props.map}</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* DELETE BUTTON */}
                        {this.props.userId === localStorage.getItem("userId") ? (
                            <button className="btn btn-danger btn-sm deleteActivity" onClick={this.deleteBike}>Delete Bike</button>
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

export default Bike;
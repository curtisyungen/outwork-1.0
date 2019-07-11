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
        this.props.deleteActivity("swim", this.props.id);
    }

    render() {
        return (
            <span>
                <div className="d-flex flex-row actCard" onClick={this.openModal}>
                    <div className="swimIcon"><FontAwesomeIcon className="fa-2x icon" icon={faSwimmer} /></div>
                    <div className="cell"><span className="cellDesc">Name</span>{this.props.firstName}</div>
                    <div className="cell"><span className="cellDesc">Date</span>{this.props.date}</div>
                    <div className="cell"><span className="cellDesc">Miles</span>{this.props.distance} miles</div>
                    <div className="cell"><span className="cellDesc">Time</span>{this.props.duration}</div>
                    <div className="cell cell5"><span className="cellDesc">Location</span>{this.props.location}</div>
                    <div className="cell cell6"><span className="cellDesc">Water Type</span>{this.props.waterType} miles</div>
                    <div className="cell cell7"><span className="cellDesc">Laps</span>{this.props.laps}</div>
                    <div className="cell cell8 actNotes"><span className="cellDesc">Notes</span>{this.props.Notes}</div>
                </div>

                {this.state.openModal ? (
                    <Modal
                        open={this.state.openModal}
                        onClose={this.closeModal}
                    >
                        {/* TABLE ONE */}
                        <div>
                            <h5 className="title">Summary</h5>
                            <table className="table table-striped table-bordered table-sm text-center align-middle swimDetails">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Miles</th>
                                        <th>Duration (hh:mm:ss)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.props.date}</td>
                                        <td>{this.props.location}</td>
                                        <td>{this.props.miles}</td>
                                        <td>{this.props.duration}</td>
                                    </tr>
                                </tbody>
                            </table>
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
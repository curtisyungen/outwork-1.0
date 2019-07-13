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
                        {/* TABLE ONE */}
                        <div>
                            <h5 className="title">Summary</h5>
                            <table className="table table-striped table-bordered table-sm text-center align-middle bikeDetails">
                                <thead className="thead-dark">
                                    <tr>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* TABLE TWO */}
                        <div>
                            <table className="table table-striped table-bordered table-sm text-center align-middle bikeDetails">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Notes</th>
                                        <th>Map</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.props.notes}</td>
                                        <td><a href={this.props.map} target="_blank" rel="noopener noreferrer">{this.props.map}</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

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
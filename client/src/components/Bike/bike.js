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
        this.props.deleteActivity("bike", this.props.id);
    }

    render() {
        return (
            <span>
                <table className="table table-hover table-bordered actCard" onClick={this.openModal}>
                    <tbody>
                        <tr>
                            <td className="bikeIcon"><FontAwesomeIcon className="fa-2x icon" icon={faBiking} /></td>
                            <td className="cell">{this.props.firstName} {this.props.lastName}</td>
                            <td className="cell">{this.props.date}</td>
                            <td className="cell">{this.props.distance} miles</td>
                            <td className="cell">{this.props.duration}</td>
                            <td className="cell">{this.props.location}</td>
                        </tr>
                    </tbody>
                </table>  

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

                        <button className="btn btn-danger btn-sm deleteActivity" onClick={this.deleteBike}>Delete Bike</button>
                    </Modal>
                ) : (
                    <></>
                )}
            </span>
        )
    }
}

export default Bike;
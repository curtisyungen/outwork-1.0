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
                <table className="table table-hover table-bordered actCard" onClick={this.openModal}>
                    <tbody>
                        <tr>
                            <td className="swimIcon"><FontAwesomeIcon className="fa-2x icon" icon={faSwimmer} /></td>
                            <td className="cell">{this.props.firstName} {this.props.lastName}</td>
                            <td className="cell">{this.props.date}</td>
                            <td className="cell">{this.props.distance} miles</td>
                            <td className="cell">{this.props.duration}</td>
                            <td className="cell">{this.props.waterType}</td>
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

                        <button className="btn btn-danger btn-sm deleteActivity" onClick={this.deleteSwim}>Delete Swim</button>
                    </Modal>
                ) : (
                        <></>
                    )}
            </span>
        )
    }
}

export default Swim;
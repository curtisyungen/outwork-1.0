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
                <div className="row actCard" onClick={this.openModal}>
                    <div className="bikeIcon"><FontAwesomeIcon className="fa-2x icon" icon={faBiking} /></div>
                    <div className="col-md-2 cell">{this.props.firstName} {this.props.lastName}</div>
                    <div className="col-md-2 cell">{this.props.date}</div>
                    <div className="col-md-2 cell">{this.props.distance} miles</div>
                    <div className="col-md-2 cell">{this.props.duration}</div>
                    <div className="col-md-2 cell">{this.props.location}</div>
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
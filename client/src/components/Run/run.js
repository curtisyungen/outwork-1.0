import React, { Component } from "react";
import Modal from "react-responsive-modal";
import userAPI from "../../utils/userAPI";
import "./run.css";

class Run extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            userId: null,
            repeats: null,
        }
    }

    componentDidMount = () => {

        this.setState({
            userId: this.props.userId,
            repeats: JSON.parse(this.props.repeats),
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

    deleteRun = (event) => {
        event.preventDefault();

        let confirm = window.confirm("Delete this run?");

        if (confirm) {
            this.props.deleteActivity("run", this.props.id);
        }
    }

    render() {
        return (
            <span>
                <div className="card actCard" onClick={this.openModal}>
                    <div className="card-body">
                        <div>{this.props.firstName} {this.props.lastName}</div>
                        <h4 className="card-title mb-0">Run</h4>
                        <h6 className="card-subtitle text-muted mb-0">{this.props.date}</h6>
                        <div className="card-text">
                            <span>{this.props.duration}</span>
                        </div>
                    </div>
                </div>

                {this.state.openModal ? (
                    <Modal
                        open={this.state.openModal}
                        onClose={this.closeModal}
                    >
                        {/* TABLE ONE */}
                        <div>
                            <h5 className="title">Summary</h5>
                            <table className="table table-striped table-bordered table-sm text-center align-middle runDetails">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Type</th>
                                        {this.props.type === "race" ? (
                                            <th>Race</th>
                                        ) : (
                                                <></>
                                            )}
                                        <th>Miles</th>
                                        <th>Duration (hh:mm:ss)</th>
                                        <th>Mile Pace (mm:ss)</th>
                                        <th>Climb (ft.)</th>
                                        <th>Avg. Grade (%)</th>
                                        <th>Surface</th>
                                        <th>Weather</th>
                                        <th>Footwear</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.props.date}</td>
                                        <td>{this.props.location}</td>
                                        <td>{this.props.type}</td>
                                        {this.props.type === "race" ? (
                                            <td>{this.props.race}</td>
                                        ) : (
                                                <></>
                                            )}
                                        <td>{this.props.distance}</td>
                                        <td>{this.props.duration}</td>
                                        <td>{this.props.milePace}</td>
                                        <td>{this.props.climb}</td>
                                        <td>{this.props.grade}</td>
                                        <td>{this.props.surface}</td>
                                        <td>{this.props.weather}</td>
                                        <td>{this.props.shoe}</td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* TABLE TWO */}
                        <div>
                            <table className="table table-striped table-bordered table-sm text-center align-middle runDetails">
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
                    
                        {/* REPEATS */}
                        <div>
                            {this.props.type && this.props.type.toLowerCase() === "repeats" ? (
                                <span>
                                    <h5 className="title">Repeats</h5>
                                    <table className="table table-striped table-bordered table-sm text-center align-middle runDetails">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Miles</th>
                                                <th>Time (mm:ss)</th>
                                                <th>Rest (min.)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.repeats.map(repeat => (  
                                                <tr key={Math.random() * 100000}>
                                                    <td>{repeat.distance}</td>
                                                    <td>{repeat.time}</td>
                                                    <td>{repeat.rest}</td>
                                                </tr>       
                                            ))}
                                        </tbody>
                                    </table>
                                </span>
                            ) : (
                                    <></>
                                )}
                        </div>

                        <button className="btn btn-danger btn-sm deleteActivity" onClick={this.deleteRun}>Delete Run</button>
                    </Modal>
                ) : (
                        <></>
                    )}
            </span>


        )
    }
}

export default Run;
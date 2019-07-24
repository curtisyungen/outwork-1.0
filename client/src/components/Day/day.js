import React, { Component } from "react";
import Modal from "react-responsive-modal";
import "./day.css";

class Day extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
        }
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

    render() {
        return (
            <span>
                <div 
                    className={`day day-${this.props.type}`}
                    onClick={this.openModal}
                ></div>
                <Modal
                    open={this.state.openModal}
                    onClose={this.closeModal}
                >
                    <div className="streakModal">
                        {this.props.day.workoutType}
                    </div>
                </Modal>
            </span>         
        )
    }
}

export default Day;
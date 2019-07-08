import React, { Component } from "react";
import "./bike.css";

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

    deleteBike = () => {
        this.props.deleteActivity("bike", this.props.id);
    }

    render() {
        return (
            <div className="card actCard">
            <div className="card-body">
                <div>{this.props.firstName} {this.props.lastName}</div>
                <h5 className="card-title mb-0">Bike</h5>
                <h6 className="card-subtitle text-muted mb-0">{this.props.date}</h6>
                <div className="card-text">
                    <span>{this.props.duration}</span>
                    <span>{this.props.location}</span>
                    <span>{this.props.surface}</span>
                    <span>{this.props.weather}</span>
                </div>
                <div className="card-link" onClick={this.deleteBike}>Delete</div>
            </div>
        </div>
        )
    }
}

export default Bike;
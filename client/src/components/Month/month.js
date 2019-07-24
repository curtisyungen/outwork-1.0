import React, { Component } from "react";
import Day from "../Day/day";
import "./month.css";

class Month extends Component {

    constructor(props) {
        super(props);

        this.state = {
            month: [],
            names: [],
        }
    }

    componentDidMount = () => {
        this.setState({
            month: this.props.month,
            names: [
                "January", "February", "March", 
                "April", "May", "June", "July", 
                "August", "September", "October", 
                "November", "December"],
        });
    }

    render() {
        return (
            <div className="month">
                <h4 className="monthName">{this.state.names[this.props.month[0]]}</h4>
                {this.state.month && this.state.month.length > 0 ? (
                    this.state.month.map(day => (
                        <Day 
                            key={Math.random() * 100000}
                            day={day}
                            type={day.workoutType}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default Month;
import React, { Component } from "react";
import Day from "../Day/day";
import "./month.css";

class Month extends Component {

    constructor(props) {
        super(props);

        this.state = {
            month: [],
        }
    }

    componentDidMount = () => {
        this.setState({
            month: this.props.month,
        });
    }

    render() {
        return (
            <div className="week">
                {this.state.month && this.state.month.length > 0 ? (
                    this.state.month.map(day => (
                        <Day 
                            key={Math.random() * 100000}
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
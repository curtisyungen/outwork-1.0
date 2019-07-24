import React, { Component } from "react";
import Day from "../Day/day";
import "./week.css";

class Week extends Component {

    constructor(props) {
        super(props);

        this.state = {
            week: [],
        }
    }

    componentDidMount = () => {
        this.setState({
            week: this.props.week,
        });
    }

    render() {
        return (
            <div className="week">
                {this.state.week ? (
                    this.state.week.map(day => (
                        <Day 
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

export default Week;
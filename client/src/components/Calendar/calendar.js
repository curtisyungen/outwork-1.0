import React, { Component } from "react";
import Day from "../Day/day";
import "./calendar.css";

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId:  null,
            year: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            year: this.props.year,
        });
    }

    render() {
        return (
            <div className="calendar">

            </div>
        )
    }
}

export default Calendar;
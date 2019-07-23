import React, { Component } from "react";
import Day from "../Day/day";
import "./calendar.css";

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId:  null,
            data: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            data: this.props.data,
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
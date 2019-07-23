import React, { Component } from "react";
import "./day.css";

class Day extends Component {
    render() {
        return (
            <div className={`day day-${this.props.type}`}></div>            
        )
    }
}

export default Day;
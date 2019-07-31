import React, { Component } from "react";
import Day from "../Day/day";
import "./month.css";

class Month extends Component {

    constructor(props) {
        super(props);

        this.state = {
            month: [],
            days: [],
            monthName: "Month",
            monthNum: 0,
        }
    }

    componentDidMount = () => {

        let month = this.props.month;
        let monthName = month[0];

        month.shift();

        this.setState({
            month: month,
            monthName: monthName,
            monthNum: this.props.monthNum,
        });
    }

    render() {
        return (
            <div className="month">
                <h4 className="monthName">{this.state.monthName}</h4>
                {this.state.month && this.state.month.length > 0 ? (
                    this.state.month.map(day => (
                        <Day
                            key={Math.random() * 100000}
                            month={this.state.monthNum}
                            day={day}
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
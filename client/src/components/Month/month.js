import React, { Component } from "react";
import Day from "../Day/day";
import "./month.css";

class Month extends Component {

    constructor(props) {
        super(props);

        this.state = {
            month: [],
            names: [],
            days: [],
            monthName: "Month",
            monthNum: 0,
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
            days: [32, 29, 32, 31, 32, 31, 32, 32, 31, 32, 31, 32],
        }, () => {
            this.getMonthName();
        });
    }

    getMonthName = () => {
        let names = this.state.names;
        let id = parseInt(this.props.month[0]);

        this.setState({
            monthName: names[id],
            monthNum: id + 1,
        }, () => {
            this.trimMonth();
        });
    }

    // Loops through each month and trims extra days off the end of each
    // Does not account for leap year
    trimMonth = () => {
        let month = this.state.month;
        let monthId = month[0];
        let days = this.state.days;
        let numDays = days[monthId];

        // Remove extra days at end of month
        month.splice(numDays);

        // Remove month ID at beginning of array
        month.shift();

        this.setState({
            month: month,
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
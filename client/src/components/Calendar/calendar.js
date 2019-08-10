import React, { Component } from "react";
import Month from "../Month/month";
import workoutAPI from "../../utils/workoutAPI";
import "./calendar.css";

import moment from "moment";

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            activity: [],
            year: [],
            processed: false,
            screenWidth: null,
        }
    }

    componentDidMount = () => {
        let screenWidth = window.screen.width;

        let year = [];
        let names = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"];
        let numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let today = new Date();
        let currMonth = moment(today).month();

        for (var i = 0; i <= currMonth; i++) {
            let month = [names[i]];
            for (var m = 0; m < numDays[i]; m++) {
                month.push([m + 1]);
            }

            year.push(month);
        }

        this.setState({
            userId: this.props.userId,
            year: year,
            screenWidth: screenWidth,
        }, () => {
            this.getUserActivity();
        });
    }

    getUserActivity = () => {
        workoutAPI.getAllWorkoutsByUserId(this.state.userId)
            .then((res) => {
                this.setState({
                    activity: res.data,
                }, () => {
                    this.processData();
                });
            });
    }

    // Populate year array with activity by month and day
    processData = () => {
        let activity = this.state.activity;
        let year = this.state.year;

        let month, day;

        for (var a in activity) {
            month = moment(activity[a].date).month();
            day = moment(activity[a].date).date();
            year[month][day].push(activity[a]);
        }

        this.setState({
            year: year,
            processed: true,
        });
    }

    render() {
        return (
            <div className="calendar">
                {this.state.processed === true ? (
                    <span>
                        <h4>Calendar</h4>
                        <div className="calendarContainer">
                            {this.state.year && this.state.year.length > 0 ? (
                                this.state.year.map(month => (
                                    <Month
                                        key={month[0]}
                                        month={month}
                                        monthNum={month[0]}
                                        screenWidth={this.state.screenWidth}
                                    />
                                ))
                            ) : (
                                    <></>
                                )}
                        </div>
                    </span>
                ) : (
                    <p className="text-center">Loading calendar...</p>
                )}
            </div>
        )
    }
}

export default Calendar;
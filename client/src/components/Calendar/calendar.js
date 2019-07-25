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
        }
    }

    componentDidMount = () => {
        let year = [];
        for (var i = 0; i < 12; i++) {
            let month = [i];
            for (var m = 0; m < 31; m++) {
                month.push(m);
            }

            year.push(month);
        }

        this.setState({
            userId: this.props.userId,
            year: year,
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

    processData = () => {
        let activity = this.state.activity;
        let year = this.state.year;

        let month, day;

        for (var a in activity) {
            month = moment(activity[a].date).month();
            day = moment(activity[a].date).date();

            year[month][day] = (activity[a]);
        }

        this.setState({
            year: year,
            processed: true,
        });
    }

    render() {
        return (
            <div className="calendar">
                {this.state.processed ? (
                    <span>
                        <h4>Calendar</h4>
                        <div className="calendarContainer">

                            {this.state.year && this.state.year.length > 0 ? (
                                this.state.year.map(month => (
                                    <Month
                                        key={Math.random() * 100000}
                                        month={month}
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
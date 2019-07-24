import React, { Component } from "react";
// import BarChart from "../components/BarChart/barChart";
import Month from "../components/Month/month";
import workoutAPI from "../utils/workoutAPI";
import "./Streaks.css";

import moment from "moment";

class Streaks extends Component {

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
        for (var i=0; i<12; i++) {
            let month = [i];
            for (var m=0; m<31; m++) {
                month.push(0);
            }

            year.push(month);
        }

        let userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
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
            <div className="">
                {this.state.year && this.state.year.length > 0 && this.state.processed ? (
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
        )
    }
}

export default Streaks;
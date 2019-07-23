import React, { Component } from "react";
// import BarChart from "../components/BarChart/barChart";
import Calendar from "../components/Calendar/calendar";
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
        }
    }

    componentDidMount = () => {
        let year = [];
        for (var i=0; i<52; i++) {
            year.push([]);
        }

        let userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
            year: year,
        }, () => {
            this.getUserActivity();
            console.log("Year", this.state.year);
        });
    }

    getUserActivity = () => {
        workoutAPI.getAllWorkoutsByUserId(this.state.userId)
            .then((res) => {
                console.log("Workouts", res);

                this.setState({
                    activity: res.data,
                }, () => {
                    this.processData();
                });
            });
    }

    processData = () => {
        let activity = this.state.activity;
        let week;

        for (var a in activity) {
            week = moment(activity[a].date).week();

            year[week].push(activity[a]);
        }

        this.setState({
            year: year,
        }, () => {
            console.log(year);
        });
    }

    render() {
        return (
            <div className="container pageContainer">
                <Calendar 
                    year={this.state.year}
                />
            </div>
        )
    }
}

export default Streaks;
import React, { Component } from "react";
// import BarChart from "../components/BarChart/barChart";
import Week from "../components/Week/week";
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
        for (var i=0; i<52; i++) {
            year.push([0, 0, 0, 0, 0, 0, 0]);
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
        let week;

        for (var a in activity) {
            week = moment(activity[a].date).week();

            year[week].push(activity[a]);
        }

        this.setState({
            year: year,
            processed: true,
        });
    }

    render() {
        return (
            <div className="container pageContainer">
                {this.state.year && this.state.year.length > 0 && this.state.processed ? (
                    this.state.year.map(week => (
                        <Week
                            week={week}
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
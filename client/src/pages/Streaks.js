import React, { Component } from "react";
// import BarChart from "../components/BarChart/barChart";
import Calendar from "../components/Calendar/calendar";
import workoutAPI from "../utils/workoutAPI";
import "./Streaks.css";

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
                });
            });
    }

    render() {
        return (
            <div className="container pageContainer">
                <Calendar 
                    data={this.state.data}
                />
            </div>
        )
    }
}

export default Streaks;
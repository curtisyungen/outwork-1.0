import React, { Component } from "react";
import BarChart from "../components/BarChart/barChart";
import Calendar from "../components/Calendar/calendar";
import workoutAPI from "../utils/workoutAPI";
import "./Streaks.css";

let d3 = require("d3");

class Streaks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            dataset: [],
        }
    }

    componentDidMount = () => {
        let userId = localStorage.getItem("userId");

        this.setState({
            userId: userId,
        }, () => {
            this.getUserData();
        });
    }

    getUserData = () => {
        workoutAPI.getAllWorkoutsByUserId(this.state.userId)
            .then((res) => {
                let workouts = res.data;
                let dataset = [];

                for (var w in workouts) {
                    if (workouts[w].workoutType === "run") {
                        dataset.push(parseFloat(workouts[w].distance));
                    }
                }

                this.setState({
                    dataset: dataset,
                });
            });
    }

    render() {
        return (
            <div className="container pageContainer">
                <Calendar />

                {/* {this.state.dataset.length > 0 ? (
                    <BarChart
                        data={this.state.dataset}
                        size={[200, 200]}
                    />
                ) : (
                    <></>
                )} */}
            </div>
        )
    }
}

export default Streaks;
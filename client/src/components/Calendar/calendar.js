import React, { Component } from "react";
import Day from "../Day/day";
import workoutAPI from "../../utils/workoutAPI";
import "./calendar.css";

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId:  null,
            activity: null,
        }
    }

    componentDidMount = () => {
        let userId;
        if (localStorage.getItem("userId")) {
            userId = localStorage.getItem("userId");
        }

        this.setState({
            userId: userId,
        }, () => {
            this.getUserActivity();
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
            <div className="calendar">
                {this.state.activity && this.state.activity.length > 0 ? (
                    this.state.activity.map(act => (
                        <Day 
                            type={act.workoutType}
                        />
                    )) 
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default Calendar;
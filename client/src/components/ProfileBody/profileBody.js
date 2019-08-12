import React, { Component } from "react";
import Container from "../Container/container";
import UserActivity from "../UserActivity/userActivity";
import workoutAPI from "../../utils/workoutAPI";
import "./profileBody.css";

class ProfileBody extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userActivity: null,
            message: null,
            displayOpt: "Recent",
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userActivity: this.props.userActivity,
        }, () => {
            this.getRecentWorkouts();
        });
    }

    getRecentWorkouts = () => {
        let userId = this.props.userId;
        workoutAPI.getRecentWorkoutsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                    displayOpt: "Recent",
                });
            });
    }

    getAllWorkouts = () => {
        let userId = this.props.userId;
        workoutAPI.getAllWorkoutsByUserId(userId)
            .then((res) => {
                this.setState({
                    displayOpt: "All",
                });

                this.sortByDate(res.data);
            });
    }

    getRuns = () => {
        let userId = this.props.userId;
        workoutAPI.getRunsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                    displayOpt: "Runs",
                });
            });
    }

    getBikes = () => {
        let userId = this.props.userId;
        workoutAPI.getBikesByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                    displayOpt: "Bikes",
                });
            });
    }

    getSwims = () => {
        let userId = this.props.userId;
        workoutAPI.getSwimsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                    displayOpt: "Swims",
                });
            });
    }

    getLifts = () => {
        let userId = this.props.userId;
        workoutAPI.getLiftsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                    displayOpt: "Lifts",
                });
            });
    }

    sortByDate = (userActivity) => {
        userActivity.sort(this.compare);

        this.setState({
            userActivity: userActivity,
            message: "No activity found.",
        });
    }

    compare = (a, b) => {
        if (a.date === b.date) {
            return 0;
        }
        else {
            return (a.date > b.date) ? -1 : 1;
        }
    }
    
    reverseSort = () => {
        let userActivity = this.state.userActivity;

        userActivity.sort(this.compareReverse);

        this.setState({
            userActivity: userActivity,
        });
    }

    compareReverse = (a, b) => {
        if (a.date === b.date) {
            return 0;
        }
        else {
            return (a.date < b.date) ? -1 : 1;
        }
    }

    backToTop = () => {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Container>
                <div className="myActivity">
                    <h4>User Activity</h4>
                    <div className="profileFilterBtns mb-1">
                        <button
                            className={`btn btn-dark btn-sm profileFilterBtn opt-${this.state.displayOpt === "All"}`}
                            onClick={this.getAllWorkouts}
                        >
                            All
                        </button>
                        <button
                            className={`btn btn-dark btn-sm toggleDisplayBtn opt-${this.state.displayOpt === "Recent"}`}
                            onClick={(event) => {
                                event.preventDefault();
                                this.getRecentWorkouts();
                            }}>
                            Recent
                        </button>
                        <button
                            className={`btn btn-dark btn-sm profileFilterBtn opt-${this.state.displayOpt === "Runs"}`}
                            onClick={this.getRuns}
                        >
                            Runs
                        </button>
                        <button
                            className={`btn btn-dark btn-sm profileFilterBtn opt-${this.state.displayOpt === "Bikes"}`}
                            onClick={this.getBikes}
                        >
                            Bikes
                        </button>
                        <button
                            className={`btn btn-dark btn-sm profileFilterBtn opt-${this.state.displayOpt === "Swims"}`}
                            onClick={this.getSwims}
                        >
                            Swims
                        </button>
                        <button
                            className={`btn btn-dark btn-sm profileFilterBtn opt-${this.state.displayOpt === "Lifts"}`}
                            onClick={this.getLifts}
                        >
                            Lifts
                        </button>
                        <button 
                            className="btn btn-dark btn-sm reverseSort" 
                            onClick={this.reverseSort}
                        >
                            Reverse Sort
                        </button>

                    </div>

                    {/* BACK TO TOP */}
                    {this.state.userActivity && this.state.userActivity.length >= 15 ? (
                        <div className="backToTopBtn" onClick={this.backToTop}>Back to Top</div>
                    ) : (
                        <></>
                    )}

                    {this.state.userActivity && this.state.userActivity.length > 0 ? (
                        this.state.userActivity.map(act => (
                            <UserActivity
                                key={Math.random() * 100000}
                                activity={act}
                                deleteActivity={this.props.deleteActivity}
                            />
                        ))
                    ) : (
                            <p className="text-center">{this.state.message}</p>
                        )}
                </div>
            </Container>
        )
    }
}

export default ProfileBody;
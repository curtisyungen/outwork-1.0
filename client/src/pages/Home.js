import React, { Component } from "react";
// import Run from "../components/Run/run";
// import Bike from "../components/Bike/bike";
// import Swim from "../components/Swim/swim";
// import Lift from "../components/Lift/lift";
import Container from "../components/Container/container";
import UserActivity from "../components/UserActivity/userActivity";
import userAPI from "../utils/userAPI";
import actAPI from "../utils/actAPI";
import "./Home.css";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            following: null,
            allActivity: [],
            loadingActivity: false,
        }
    }

    componentDidMount = () => {
        this.props.updateParentState();

        // Validate user and then call getUserById
        if (this.props.checkValidUser()) {
            let userId = localStorage.getItem("userId");
            this.setState({
                userId: userId,
            }, () => {
                this.getUserById();
            });
        }
    }

    getUserById = () => {
        userAPI.getUserById(this.state.userId)
            .then((res) => {

                let following = [];
                if (res.data[0].following !== null) {
                    following = JSON.parse(res.data[0].following);
                }

                this.setState({
                    following: following,
                }, () => {
                    // Get user's activity
                    this.getUserActivity(this.state.userId);

                    // Get following's activity
                    for (var f in following) {
                        this.getUserActivity(following[f]);
                    }
                });

            });
    }

    getUserActivity = (userId) => {

        this.setState({
            loadingActivity: true,
        }, () => {

            let allActivity = this.state.allActivity;

            // GET RUNS
            actAPI.getRunsByUser(userId)
                .then((res) => {
                    for (var item in res.data) {
                        allActivity.push(res.data[item]);
                    };

                    // GET BIKES
                    actAPI.getBikesByUser(userId)
                        .then((res) => {
                            for (var item in res.data) {
                                allActivity.push(res.data[item]);
                            };

                            // GET SWIMS
                            actAPI.getSwimsByUser(userId)
                                .then((res) => {
                                    for (var item in res.data) {
                                        allActivity.push(res.data[item]);
                                    };

                                    // GET LIFTS
                                    actAPI.getLiftsByUser(userId)
                                        .then((res) => {
                                            for (var item in res.data) {
                                                allActivity.push(res.data[item]);
                                            };

                                            // SORT BY DATE
                                            this.sortByDate(allActivity);
                                        });
                                });
                        });
                });
        });
    }

    sortByDate = (allActivity) => {
        allActivity.sort(this.compare);

        this.setState({
            allActivity: allActivity,
            loadingActivity: false,
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

    deleteActivity = (type, id) => {

        let userId = this.state.userId;

        if (type === "run") {
            actAPI.deleteRunById(id, userId);
        }
        else if (type === "bike") {
            actAPI.deleteBikeById(id, userId);
        }
        else if (type === "swim") {
            actAPI.deleteSwimById(id, userId);
        }
        else if (type === "lift") {
            actAPI.deleteLiftById(id, userId);
        }

        window.location.reload();
    }

    render() {
        return (
            <Container>
            <div className="homePage">
                <span>
                    {this.state.loadingActivity ? (
                        <p className="text-center">Loading activity...</p>
                    ) : (
                            <span>
                                {this.state.allActivity && this.state.allActivity.length > 0 ? (
                                    this.state.allActivity.map(activity => (
                                        <UserActivity
                                            key={Math.random() * 100000}
                                            activity={activity}
                                            deleteActivity={this.deleteActivity}
                                        />
                                    ))
                                ) : (
                                        <></>
                                    )}
                            </span>
                        )}
                </span>
            </div>
            </Container>
        )
    }
}

export default Home;
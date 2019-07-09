import React, { Component } from "react";
// import Run from "../components/Run/run";
// import Bike from "../components/Bike/bike";
// import Swim from "../components/Swim/swim";
// import Lift from "../components/Lift/lift";
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
            loadingRuns: false,
            loadingBikes: false,
            loadingSwims: false,
            loadingLifts: false,
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
            loadingRuns: true,
            loadingBikes: true,
            loadingSwims: true,
            loadingLifts: true,
        }, () => {
            this.getRunsByUser(userId);
            this.getBikesByUser(userId);
            this.getSwimsByUser(userId);
            this.getLiftsByUser(userId);
        });  
    }

    getRunsByUser = (userId) => {
        actAPI.getRunsByUser(userId)
            .then((res) => {
                let allActivity = this.state.allActivity;

                for (var item in res.data) {
                    allActivity.push(res.data[item]);
                };

                this.setState({
                    allActivity: allActivity,
                    loadingRuns: false,
                });
            });
    }

    getBikesByUser = (userId) => {
        actAPI.getBikesByUser(userId)
            .then((res) => {
                let allActivity = this.state.allActivity;

                for (var item in res.data) {
                    allActivity.push(res.data[item]);
                };

                this.setState({
                    allActivity: allActivity,
                    loadingBikes: false,
                });
            });
    }

    getSwimsByUser = (userId) => {
        actAPI.getSwimsByUser(userId)
            .then((res) => {
                let allActivity = this.state.allActivity;

                for (var item in res.data) {
                    allActivity.push(res.data[item]);
                };

                this.setState({
                    allActivity: allActivity,
                    loadingSwims: false,
                });
            });
    }

    getLiftsByUser = (userId) => {
        actAPI.getLiftsByUser(userId)
            .then((res) => {
                let allActivity = this.state.allActivity;

                for (var item in res.data) {
                    allActivity.push(res.data[item]);
                };

                this.setState({
                    allActivity: allActivity,
                    loadingLifts: false,
                });
            });
    }

    sortByDate = () => {
        let allActivity = this.state.allActivity;
        allActivity.sort(this.compare);

        this.setState({
            allActivity: allActivity,
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

    render() {
        return (
            <div className="col-md-12 homePage">
                <span>
                    {this.state.allActivity && this.state.allActivity.length > 0 ? (
                        this.state.allActivity.map(activity => (
                            <UserActivity 
                                key={Math.random() * 100000}
                                activity={activity}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </span>
            </div>
        )
    }
}

export default Home;
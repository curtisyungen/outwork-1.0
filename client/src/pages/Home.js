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
                allActivity: this.props.allActivity,
            }, () => {
                this.getUserById();
            });
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props !== this.state) {
            this.setState({
                allActivity: this.props.allActivity,
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
                    this.props.getUserActivity(this.state.userId);

                    // Get following's activity
                    for (var f in following) {
                        this.props.getUserActivity(following[f]);
                    }
                });

            });
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
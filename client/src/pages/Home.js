import React, { Component } from "react";
import Container from "../components/Container/container";
import UserActivity from "../components/UserActivity/userActivity";
import userAPI from "../utils/userAPI";
import "./Home.css";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            following: null,
            allActivity: [],
            loadingActivity: false,
            activitySearch: "",
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

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
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

    searchForActivity = (event) => {
        event.preventDefault();

        this.props.checkValidUser();

    }

    render() {
        return (
            <Container>
                <div className="homePage">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Name</a>
                                <a className="dropdown-item" href="#">Date</a>
                                <a className="dropdown-item" href="#">Distance</a>
                                <a className="dropdown-item" href="#">Generator</a>
                                <a className="dropdown-item" href="#">Type</a>
                                <a className="dropdown-item" href="#">Location</a>
                                <a className="dropdown-item" href="#">Race</a>
                            </div>
                        </div>
                        <input
                            autoComplete="off"
                            name="activitySearch"
                            type="text"
                            className="form-control"
                            aria-describedby="basic-addon2"
                            onChange={this.handleInputChange}
                            value={this.state.activitySearch}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchForActivity}
                            >
                                Search
                        </button>
                        </div>
                    </div>

                    <span>
                        {this.state.allActivity && this.state.allActivity.length === 0 ? (
                            <p className="text-center">Loading activity...</p>
                        ) : (
                                <span>
                                    {this.state.allActivity && this.state.allActivity.length > 0 ? (
                                        this.state.allActivity.map(activity => (
                                            <UserActivity
                                                key={Math.random() * 100000}
                                                activity={activity}
                                                deleteActivity={this.props.deleteActivity}
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
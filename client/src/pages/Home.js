import React, { Component } from "react";
import Container from "../components/Container/container";
import UserActivity from "../components/UserActivity/userActivity";
import "./Home.css";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            allActivity: [],
            filtered: [],
            category: null,
            activitySearch: "",
            message: null,
        }
    }

    componentDidMount = () => {
        this.props.updateParentState();
        
        for (var i=0; i<5; i++) {
            this.props.getAllWorkouts();
        }

        // Validate user and then call getUserById
        if (true) {
            let userId = localStorage.getItem("userId");
            this.setState({
                userId: userId,
                allActivity: this.props.allActivity,
                filtered: this.props.allActivity,
                category: "Name",
                message: "Loading activity...",
            });
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.allActivity !== this.props.allActivity) {
            this.setState({
                allActivity: this.props.allActivity,
                filtered: this.props.allActivity,
            });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    searchForActivity = (event) => {
        event.preventDefault();

        this.props.checkValidUser();

        let category = this.state.category;
        let activitySearch = this.state.activitySearch;
        let activity = this.props.allActivity;
        let filtered = [];

        if (activitySearch && activitySearch.length > 0) {

            activitySearch = activitySearch.toLowerCase();

            for (var a in activity) {
                // NAME
                if (category === "Name") {
                    let name = activity[a].firstName.toLowerCase() + " " + activity[a].lastName.toLowerCase();

                    if (name.indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
                // DATE
                else if (category === "Date") {
                    if (activity[a].date.indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
                // LOCATION
                else if (category === "Location") {
                    if (activity[a].location.toLowerCase().indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
                // DISTANCE
                else if (category === "Distance") {
                    if (activity[a].distance && activity[a].distance.indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
                // GENERATOR
                else if (category === "Generator") {
                    if (activity[a].generator && activity[a].generator.toLowerCase().indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
                // WORKOUT TYPE
                else if (category === "Type") {
                    if (activity[a].workoutType.indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
                // RACE
                else if (category === "Race") {
                    if (activity[a].race && activity[a].race.toLowerCase().indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
                // NOTES
                else if (category === "Notes") {
                    if (activity[a].notes.toLowerCase().indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
            }
        }
        
        this.setState({
            filtered: filtered,
            message: "No activity found.",
        });
        
    }

    selectCategory = (category) => {
        this.setState({
            category: category,
        });
    }

    render() {
        return (
            <Container>
                <div className={`homePage`}>
                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <button 
                                className="btn btn-dark dropdown-toggle" 
                                type="button" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false"
                            >
                                {this.state.category}&nbsp;
                            </button>
                            <div className="dropdown-menu">
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "Name")}>Name</div>
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "Date")}>Date</div>
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "Type")}>Type</div>
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "Location")}>Location</div>
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "Distance")}>Distance</div>
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "Generator")}>Generator</div>
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "Race")}>Race</div>
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "Notes")}>Notes</div>
                            </div>
                        </div>
                        <input
                            autoComplete="off"
                            name="activitySearch"
                            type="text"
                            className="form-control activitySearch"
                            aria-describedby="basic-addon2"
                            onChange={this.handleInputChange}
                            value={this.state.activitySearch}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-dark"
                                type="button"
                                onClick={this.searchForActivity}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <span>
                        {this.state.filtered && this.state.filtered.length === 0 ? (
                            <p className="text-center">{this.state.message}</p>
                        ) : (
                                <span>
                                    {this.state.filtered.map(activity => (
                                        <UserActivity
                                            key={Math.random() * 100000}
                                            activity={activity}
                                            deleteActivity={this.props.deleteActivity}
                                        />
                                    ))}
                                </span>
                            )}
                    </span>
                </div>
            </Container>
        )
    }
}

export default Home;

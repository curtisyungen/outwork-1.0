import React, { Component } from "react";
import Modal from "react-responsive-modal";
import Container from "../components/Container/container";
import GroupMetrics from "../components/GroupMetrics/groupMetrics";
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
            openQuickStats: false,
            displayOpt: "View Recent",
        }
    }

    componentDidMount = () => {
        this.props.updateParentState();

        if (this.props.displayOpt === "View Recent") {
            this.props.getRecentWorkouts();
        }
        else {
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
                displayOpt: this.props.displayOpt,
            });
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.allActivity !== this.props.allActivity) {
            this.setState({
                allActivity: this.props.allActivity,
                filtered: this.props.allActivity,
                displayOpt: this.props.displayOpt,
            });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    filterBy = (filter) => {

        let searchTerm = filter;

        if (searchTerm !== "race") {
            this.selectCategory("Type");
        }
        else {
            this.selectCategory("Race");
            searchTerm = "";
        }

        this.setState({
            activitySearch: searchTerm,
        }, () => {
            this.searchForActivity();
        });
    }

    selectCategory = (category) => {
        this.setState({
            category: category,
        });
    }

    searchForActivity = () => {
        this.props.checkValidUser();

        let category = this.state.category;
        let activitySearch = this.state.activitySearch;
        let activity = this.props.allActivity;
        let filtered = [];

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
                // Search for race name
                if (activitySearch !== "") {
                    if (activity[a].race && activity[a].race.toLowerCase().indexOf(activitySearch) > -1) {
                        filtered.push(activity[a]);
                    }
                }
                // Search for all races
                else {
                    if (activity[a].runType === "Race" && activity[a].race) {
                        filtered.push(activity[a]);
                    }
                }
            }
            // NOTES
            else if (category === "Notes") {
                if (activity[a].notes.toLowerCase().indexOf(activitySearch) > -1) {
                    filtered.push(activity[a]);
                }
            }

            this.sortByDate(filtered);
        }
    }


    sortByDate = (allActivity) => {
        allActivity.sort(this.compare);

        this.setState({
            filtered: allActivity,
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

    openQuickStats = () => {
        this.setState({
            openQuickStats: true,
        });
    }

    closeQuickStats = () => {
        this.setState({
            openQuickStats: false,
        });
    }

    render() {
        return (
            <Container>
                <div className={`homePage`}>
                    <div className="input-group mb-2 mt-4">
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
                                <div className="dropdown-item" onClick={this.selectCategory.bind(null, "All")}>All</div>
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
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.searchForActivity();
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* FILTER BUTTONS */}
                    <div className="homePageBtns mb-2">
                        <div className="filterBtns">
                            <button className="btn btn-light btn-sm filterAll" onClick={this.filterBy.bind(null, "")}>All</button>
                            <button className="btn btn-light btn-sm filterRuns" onClick={this.filterBy.bind(null, "run")}>Runs</button>
                            <button className="btn btn-light btn-sm filterBikes" onClick={this.filterBy.bind(null, "bike")}>Bikes</button>
                            <button className="btn btn-light btn-sm filterSwims" onClick={this.filterBy.bind(null, "swim")}>Swims</button>
                            <button className="btn btn-light btn-sm filterLifts" onClick={this.filterBy.bind(null, "lift")}>Lifts</button>
                            <button className="btn btn-light btn-sm filterRaces" onClick={this.filterBy.bind(null, "race")}>Races</button>
                        </div>

                        <div className="quickStatsBtn">
                            <button className="btn btn-info btn-sm quickStatsBtn" onClick={this.openQuickStats}>Quick Stats</button>
                        </div>

                        <div className="toggleDisplayBtn">
                            <button className="btn btn-dark btn-sm toggleDisplayBtn" onClick={this.props.toggleDisplay}>
                                {this.state.displayOpt === "View Recent" ? ("View All"):("View Recent")}
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

                    <Modal
                        open={this.state.openQuickStats}
                        onClose={this.closeQuickStats}
                    >
                        <GroupMetrics />
                    </Modal>
                </div>
            </Container>
        )
    }
}

export default Home;
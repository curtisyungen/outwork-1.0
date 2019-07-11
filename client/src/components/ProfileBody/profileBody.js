import React, { Component } from "react";
import Container from "../Container/container";
import Run from "../Run/run";
import Bike from "../Bike/bike";
import Swim from "../Swim/swim";
import Lift from "../Lift/lift";
import Metrics from "../Metrics/metrics";
import actAPI from "../../utils/actAPI";
// import "./profileBody.css";

class ProfileBody extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
        }
    }

    componentDidMount = () => {
        let userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
            allActivity: this.props.allActivity,
        });
    }

    render() {
        return (
            <Container>

                <Metrics />

                <div className="col-md-12 myActivity">
                    <h4>User Activity</h4>
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
                </div>


            </Container>
        )
    }
}

export default ProfileBody;
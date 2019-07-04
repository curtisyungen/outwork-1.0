import React, { Component } from "react";
// import Container from "../components/Container/container";
import "./LogActivity.css";

class LogActivity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
    }

    render() {
        return (
            <div className="logActivity col-md-12">
                <a className="activity logRun col-md-2" href="/run">Run</a>
                <a className="activity logBike col-md-2" href="/bike">Bike</a>
                <a className="activity logSwim col-md-2" href="/swim">Swim</a>
                <a className="activity logLift col-md-2" href="/lift">Lift</a>
            </div>
        )
    }
}

export default LogActivity;
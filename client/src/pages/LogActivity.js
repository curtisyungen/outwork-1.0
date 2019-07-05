import React, { Component } from "react";
import "./LogActivity.css";

class LogActivity extends Component {

    componentDidMount = () => {
        this.props.checkValidUser();
    }

    render() {
        return (
            <div className="logActivity col-md-12">
                <a className="activity col-md-2" href="/run">Run</a>
                <a className="activity col-md-2" href="/bike">Bike</a>
                <a className="activity col-md-2" href="/swim">Swim</a>
                <a className="activity col-md-2" href="/lift">Lift</a>
            </div>
        )
    }
}

export default LogActivity;
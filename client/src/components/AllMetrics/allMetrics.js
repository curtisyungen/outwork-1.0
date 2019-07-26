import React, { Component } from "react";
import "./allMetrics.css";

class AllMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userActivity: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userActivity: this.props.userActivity,
        });
    }

    

    render() {
        return (
            <div className="allMetrics">

            </div>
        )
    }
}

export default AllMetrics;
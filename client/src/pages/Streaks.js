import React, { Component } from "react";
import BarChart from "../components/BarChart/barChart";
import "./Streaks.css";

let d3 = require("d3");

class Streaks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataset: [1, 2, 3],
        }
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <BarChart 
                data={this.state.dataset}
                size={[500, 500]}
            />
        )
    }
}

export default Streaks;
import React, { Component } from "react";
// import BarChart from "../components/BarChart/barChart";
import "./Streaks.css";

class Streaks extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="container pageContainer">
                {/* <div className="barChartContainer">
                    <BarChart 
                        data={[1, 2, 3, 4, 5]}
                        size={[200, 200]}
                    />
                </div> */}
            </div>
        )
    }
}

export default Streaks;
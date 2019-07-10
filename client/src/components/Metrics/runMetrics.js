import React, { Component } from "react";
// import "./metricsTable.css";

class RunMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
        }
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Runs</h4>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Total Miles</th>
                            <th>Avg. Miles / Week</th>
                            <th>Total Climb (ft.)</th>
                            <th>Avg. Mile Pace</th>
                            <th>Avg. Distance (mi.)</th>
                            <th>Longest Distance (mi.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </span>
        )
    }
}

export default RunMetrics;
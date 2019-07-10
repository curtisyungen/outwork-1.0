import React, { Component } from "react";
import "./metrics.css";

class LiftMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
        }
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Lifts</h4>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Lifts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </span>
        )
    }
}

export default LiftMetrics;
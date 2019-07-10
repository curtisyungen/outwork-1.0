import React, { Component } from "react";
// import "./metricsTable.css";

class SwimMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
        }
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Swims</h4>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Swims</th>
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

export default SwimMetrics;
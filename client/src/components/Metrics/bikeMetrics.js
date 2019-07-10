import React, { Component } from "react";
// import "./metricsTable.css";

class BikeMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
        }
    }

    render() {
        return (
            <span>
            <h4 className="metricsPageTitle">Bikes</h4>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Bikes</th>
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

export default BikeMetrics;
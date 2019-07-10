import React, { Component } from "react";
import Container from "../components/Container/container";
import actAPI from "../utils/actAPI";
// import "./Metrics.css";

class Metrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        let firstName = localStorage.getItem("fn");
        let userId = localStorage.getItem("userId");

        this.setState({
            firstName: firstName,
            userId: userId,
        });
    }

    componentDidUpdate = () => {
        this.props.checkValidUser();
    }

    render() {
        return (
            <Container>
                <h4 className="metricsPageTitle">Running</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Avg. Miles / Wk.</th>
                            <th>Max. Miles / Wk.</th>
                            <th>Longest Dist. (mi.)</th>
                            <th>Avg. Mile Pace</th>
                            <th>Total Miles Run</th>
                            <th>Dist. Climbed (ft.)</th>
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

                <h4 className="metricsPageTitle">Biking</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Avg. Miles / Wk.</th>
                            <th>Max. Miles / Wk.</th>
                            <th>Longest Dist. (mi.)</th>
                            <th>Avg. Mile Pace</th>
                            <th>Total Miles Run</th>
                            <th>Dist. Climbed (ft.)</th>
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

                <h4 className="metricsPageTitle">Swimming</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Avg. Miles / Wk.</th>
                            <th>Max. Miles / Wk.</th>
                            <th>Longest Dist. (mi.)</th>
                            <th>Avg. Mile Pace</th>
                            <th>Total Miles Run</th>
                            <th>Dist. Climbed (ft.)</th>
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

                <h4 className="metricsPageTitle">Lifting</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Avg. Miles / Wk.</th>
                            <th>Max. Miles / Wk.</th>
                            <th>Longest Dist. (mi.)</th>
                            <th>Avg. Mile Pace</th>
                            <th>Total Miles Run</th>
                            <th>Dist. Climbed (ft.)</th>
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
            </Container>
        )
    }
}

export default Metrics;
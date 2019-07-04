import React, { Component } from "react";
// import userAPI from "../../utils/userAPI";
// import actAPI from "../../utils/actAPI";
// import exerAPI from "../../utils/exerAPI";
import "./navbar.css";

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Outwork</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Log Activity</a>
                        </li>
                        <li className="nav-item">
                            <button className="" onClick={this.props.logoutUser}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;

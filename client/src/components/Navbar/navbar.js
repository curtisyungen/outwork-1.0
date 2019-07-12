import React, { Component } from "react";
import "./navbar.css";

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            renderNames: 
                [
                    "/home", 
                    "/profile", 
                    "/logactivity", 
                    "/generator",
                    "/allusers",
                    "/settings",
                    "/run",
                    "/bike",
                    "/swim",
                    "/lift",
                ],
        }
    }

    render() {
        return (
            this.state.renderNames.indexOf(window.location.pathname.toLowerCase()) > -1 ? (

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/home">Outwork</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/logActivity">Log Activity</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/generator">Generator</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/allUsers">Users</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/settings">Settings</a>
                        </li>
                        <li className="nav-item">
                            <button className="" onClick={this.props.logoutUser}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
            ) : (
                <></>
            )
        )
    }
}

export default Navbar;

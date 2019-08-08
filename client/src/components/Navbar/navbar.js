import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./navbar.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

library.add(faCog);

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            renderNames: 
                [
                    "/home", 
                    "/profile", 
                    "/logactivity", 
                    "/generator",
                    "/halloffame",
                    "/allusers",
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
                <a className="navbar-brand" href="/home">
                    <img className="navLogo" src={require("../../images/logo2.png")} alt="Navbar Logo"/>
                    <span>Outwork</span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                        <li className={`nav-item ${localStorage.getItem("userId") === "834292GU"}`}>
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/logActivity">Log Activity</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/generator">Generator</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/hallOfFame">Hall Of Fame</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/allUsers">Users</a>
                        </li>
                        
                        <Popup
                            trigger={
                                <li className="nav-item" onClick={this.displaySettings}>
                                    <FontAwesomeIcon className="fa-2x settingsIcon" icon={faCog}/>
                                </li>}
                            on="click"
                            position="bottom right"
                            closeOnDocumentClick
                            className="popup"
                        >
                            <li className="nav-item">
                                <div className="popupBackground" onClick={this.props.openBackgrounds}>{`Background`}</div>
                            </li>
                            <li className="nav-item">
                                <div className="popupLogout" onClick={this.props.logoutUser}>Logout</div>
                            </li>
                        </Popup>

                        <li className="nav-item navBackground">
                            <div className="nav-link" onClick={this.props.openBackgrounds}>{`Background`}</div>
                        </li>
                        <li className="nav-item navLogout">
                            <div className="nav-link" onClick={this.props.logoutUser}>Logout</div>
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

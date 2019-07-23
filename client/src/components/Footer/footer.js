import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renderNames: 
                [
                    "/home",
                    "/profile",
                    "/logactivity",
                    "/generator",
                    "/streaks",
                    "/allusers",
                    "/run",
                    "/bike",
                    "/swim",
                    "/lift",
                ]
        }
    }
    render() {
        return (
            this.state.renderNames.indexOf(window.location.pathname.toLowerCase()) > -1 ? (
                <div className="footer">
                    Footer
                </div>
            ) : (
                <></>
            )
        )
    }
}

export default Footer;
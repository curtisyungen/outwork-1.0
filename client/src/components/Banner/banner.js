import React, { Component } from "react";
import "./banner.css";

class Banner extends Component {
    render() {
        return (
            <div className="banner">
                Heads up: current glitch with Goggins generator workout submissions. Push-ups aren't being counted. 
                Many reps left blank. Currently investigating. Suggest screenshotting workout before submitting, just in case. 
            </div>
        )
    }
}

export default Banner;
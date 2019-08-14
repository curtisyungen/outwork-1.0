import React, { Component } from "react";
import "./banner.css";

class Banner extends Component {
    render() {
        return (
            <div className="banner">
                {this.props.message}
            </div>
        )
    }
}

export default Banner;
import React, { Component } from "react";
import "./backgrounds.css";

class Backgrounds extends Component {
    render() {
        return (
            <div className="imageList">
                <div className="background" onClick={this.props.setBackground.bind(null, "white")}>
                    <img
                        src={require("../../images/white.png")}
                        alt="White"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "darkGray")}>
                    <img
                        src={require("../../images/darkGray.png")}
                        alt="Dark Gray"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "blue")}>
                    <img
                        src={require("../../images/blue.png")}
                        alt="Blue"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "brick")}>
                    <img
                        src={require("../../images/brick-wall-dark.png")}
                        alt="Brick"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "diagonal")}>
                    <img
                        src={require("../../images/diagonal.png")}
                        alt="Diagonal"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "tiles")}>
                    <img
                        src={require("../../images/batthern.png")}
                        alt="Tiles"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "floral")}>
                    <img
                        src={require("../../images/arabesque.png")}
                        alt="Floral"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "gravel")}>
                    <img
                        src={require("../../images/gravel.png")}
                        alt="Gravel"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "trump")}>
                    <img
                        src={require("../../images/trump.png")}
                        alt="Trump"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "goggins")}>
                    <img
                        src={require("../../images/goggins.png")}
                        alt="Goggins"
                    />
                </div>
                <div className="background" onClick={this.props.setBackground.bind(null, "alex")}>
                    <img
                        src={require("../../images/alex.png")}
                        alt="Alex Jones"
                    />
                </div>
            </div>
        )
    }
}

export default Backgrounds;
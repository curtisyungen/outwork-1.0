import React, { Component } from "react";
import "./user.css";

class User extends Component {
    render() {
        return (
            <div className="user">
                <div>{this.props.firstName} {this.props.lastName}</div>
            </div>
        )
    }
}

export default User;
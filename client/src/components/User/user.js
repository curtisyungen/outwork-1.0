import React, { Component } from "react";
import "./user.css";

class User extends Component {

    loadProfile = () => {
        this.props.loadProfile(this.props.userId, this.props.firstName, this.props.lastName);
    }

    render() {
        return (
            <div 
                className="user"
                onClick={this.loadProfile}
            >
                <div>{this.props.firstName} {this.props.lastName}</div>
            </div>
        )
    }
}

export default User;
import React, { Component } from "react";
import "./user.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons';

library.add(faUserNinja);

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
                <FontAwesomeIcon className="fa-4x userNinja" icon={faUserNinja} />
                <div className="userText">{this.props.firstName} {this.props.lastName}</div>
            </div>
        )
    }
}

export default User;
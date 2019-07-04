import React, { Component } from "react";
// import Container from "../components/Container/container";
// import "./Profile.css";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
    }

    render() {
        return (
            <></>
        )
    }
}

export default Profile;
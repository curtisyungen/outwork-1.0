import React, { Component } from "react";
// import Container from "../components/Container/container";
// import "./FindUsers.css";

class FindUsers extends Component {

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

export default FindUsers;
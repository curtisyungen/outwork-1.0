import React, { Component } from "react";
import Container from "../components/Container/container";
import "./Settings.css";

class Settings extends Component {

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
            <Container>
                <div className="settingsPage">
                    <div>Theme</div>
                </div>
            </Container>
        )
    }
}

export default Settings;
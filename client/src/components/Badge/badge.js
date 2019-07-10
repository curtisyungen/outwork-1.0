import React, { Component } from "react";
// import "./badge.css";

class Badge extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
        }
    }

    render() {
        return (
            <div className="badge">
                Badge
            </div>
        )
    }
}

export default Badge;
import React, { Component } from "react";
import "./equipment.css";

class Equipment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: "",
            status: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            name: this.props.name,
            status: this.props.status,
        });
    }

    render() {
        return (
            <div 
                className={`equipment col-md-3 equip-${this.props.status}`}
                onClick={this.props.toggleStatus.bind(null, this.props.name)}
            >
                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default Equipment;
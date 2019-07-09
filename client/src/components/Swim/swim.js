import React, { Component } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer } from '@fortawesome/free-solid-svg-icons';
import "./swim.css";

library.add(faSwimmer);

class Swim extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            userId: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
        });
    }

    deleteSwim = () => {
        this.props.deleteActivity("swim", this.props.id);
    }

    render() {
        return (
            <span>
                <table className="table table-hover table-bordered actCard" onClick={this.openModal}>
                    <tbody>
                        <tr>
                            <td className="swimIcon"><FontAwesomeIcon className="fa-2x icon" icon={faSwimmer} /></td>
                            <td className="cell">{this.props.firstName} {this.props.lastName}</td>
                            <td className="cell">{this.props.date}</td>
                        </tr>
                    </tbody>
                </table>
            </span>
        )
    }
}

export default Swim;
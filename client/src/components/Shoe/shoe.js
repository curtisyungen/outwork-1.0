import React, { Component } from "react";
import "./shoe.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashAlt);


class Shoe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            name: "",
            buyDate: "",
            miles: "",
            wears: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            name: this.props.name,
            buyDate: this.props.buyDate,
            miles: this.props.miles,
            wears: this.props.wears,
        });
    }

    render() {
        return (
            <div className="shoe">
                <div className="shoeData">{this.props.name}</div>
                <div className="shoeData">{this.props.buyDate}</div>
                <div className="shoeData">{this.props.miles}</div>
                <div className="shoeData">{this.props.wears}</div>
                
                {/* DELETE */}
                <button
                    className="btn btn-danger btn-sm exerciseBtn"
                    onClick={this.props.deleteShoe.bind(null, this.props.id)}
                >
                    <FontAwesomeIcon className="fa-2x faTrashAlt" icon={faTrashAlt} />
                </button>
            </div>
        )
    }
}

export default Shoe;
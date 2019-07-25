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
        }, () => {
            this.getMiles();
        });
    }

    getMiles = () => {
        let shoeMiles = this.props.shoeMiles;
        let miles = this.props.miles;
        let name = this.props.name;

        for (var i in shoeMiles) {
            if (shoeMiles[i][0] === name) {
                miles += parseInt(shoeMiles[i][1]);
            }
        }

        this.setState({
            miles: miles,
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="shoe">
                <div className="shoeData">
                    <div className="shoeTitle">Name</div>
                    <div>{this.props.name}</div>
                </div>
                <div className="shoeData">
                    <div className="shoeTitle">Buy Date</div>
                    <div>{this.props.buyDate}</div>
                </div>
                <div className="shoeData">
                    <div className="shoeTitle">Miles</div>
                    <div>{this.props.miles}</div>
                </div>
                <div className="shoeData">
                    <div className="shoeTitle">Wears</div>
                    <div>{this.props.wears}</div>
                </div>
                
                {/* DELETE */}
                <button
                    className="btn btn-danger btn-sm shoeBtn"
                    onClick={this.props.deleteShoe.bind(null, this.props.id)}
                >
                    <FontAwesomeIcon className="fa-2x faTrashAlt" icon={faTrashAlt} />
                </button>
            </div>
        )
    }
}

export default Shoe;
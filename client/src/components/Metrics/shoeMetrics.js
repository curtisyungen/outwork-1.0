import React, { Component } from "react";
import Modal from "react-responsive-modal";
import Shoe from "../Shoe/shoe";
import shoeAPI from "../../utils/shoeAPI";
import "./metrics.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

library.add(faSave);

class ShoeMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userRuns: null,
            shoes: null,
            name: "",
            buyDate: "",
            miles: "",
            wears: "",
            openShoesModal: false,
        }
    }

    componentDidMount = () => {
        // console.log("Props", this.props);
        this.setState({
            userId: this.props.userId,
            userRuns: this.props.userRuns,
        }, () => {
            this.getShoes();
            this.getMiles();
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    getShoes = () => {
        shoeAPI.getShoesByUserId(this.props.userId)
            .then((res) => {
                this.setState({
                    shoes: res.data,
                }, () => {
                    // console.log("Get Shoes",  this.state);
                });
            });
    }

    addShoe = () => {

        let shoe = {
            userId: this.props.userId,
            shoe: this.state.name,
            buyDate: this.state.buyDate,
            miles: this.state.miles,
            wears: this.state.wears,
        }

        shoeAPI.addShoe(shoe)
            .then((res) => {
                this.getShoes();
            });
    }

    deleteShoe = (id) => {
        shoeAPI.deleteShoe(id, this.props.userId)
            .then((res) => {
                this.getShoes();
            });
    }

    openShoesModal = () => {
        this.setState({
            openShoesModal: true,
        });
    }

    closeShoesModal = () => {
        this.setState({
            openShoesModal: false,
        });
    }

    getMiles = () => {
        let runs = this.props.userRuns;

        if (!runs) {
            return;
        }
        
        let shoeMiles = [];

        for (var r in runs) {
            if (runs[r].shoe) {
                shoeMiles.push([runs[r].shoe, runs[r].distance]);
            }
        }

        this.setState({
            shoeMiles: shoeMiles,
        }, () => {
            // console.log("Shoe Miles",shoeMiles);
        });
    }

    render() {
        return (
            <span>
                <button className="btn btn-outline-dark btn-sm shoesBtn" onClick={this.openShoesModal}>My Shoes</button>

                <Modal
                    open={this.state.openShoesModal}
                    onClose={this.closeShoesModal}
                >
                    <h4>Your Shoes</h4>

                    <div className="shoeList">
                        {this.state.shoes && this.state.shoes.length > 0 ? (
                            this.state.shoes.map(shoe => (
                                <Shoe
                                    key={Math.random() * 100000}
                                    id={shoe.id}
                                    name={shoe.shoe}
                                    buyDate={shoe.buyDate}
                                    miles={shoe.miles}
                                    wears={shoe.wears}
                                    shoeMiles={this.state.shoeMiles}
                                    deleteShoe={this.deleteShoe}
                                />
                            ))
                        ) : (
                                <p className="text-center">No shoes found.</p>
                            )}
                    </div>

                    <div className="shoeModal">
                        <div className={`input-group input-group-sm shoeInputForm saved-${this.state.saved}`}>
                            {/* SHOE NAME */}
                            <input
                                autoComplete="off"
                                name="name"
                                type="text"
                                className="form-control shoeInput"
                                placeholder="Shoe Name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                            />
                            {/* BUY DATE */}
                            <input
                                autoComplete="off"
                                name="buyDate"
                                type="text"
                                className="form-control shoeInput"
                                placeholder="Buy Date"
                                onChange={this.handleInputChange}
                                value={this.state.buyDate}
                            />
                            {/* MILES */}
                            <input
                                autoComplete="off"
                                name="miles"
                                type="text"
                                className="form-control shoeInput"
                                placeholder="Miles"
                                onChange={this.handleInputChange}
                                value={this.state.miles}
                            />
                            {/* WEARS */}
                            <input
                                autoComplete="off"
                                name="wears"
                                type="text"
                                className="form-control shoeInput"
                                placeholder="Wears"
                                onChange={this.handleInputChange}
                                value={this.state.wears}
                            />
                            {/* SAVE */}
                            <button
                                className="btn btn-success btn-sm exerciseBtn saveBtn"
                                onClick={this.addShoe}
                            >
                                <FontAwesomeIcon className="fa-2x faSave" icon={faSave} />
                            </button>
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }
}

export default ShoeMetrics;
import React, { Component } from "react";
import "./shoe.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);

class Shoe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      name: "",
      buyDate: "",
      miles: "",
      wears: ""
    };
  }

  componentDidMount = () => {
    this.setState(
      {
        userId: this.props.userId,
        name: this.props.name,
        buyDate: this.props.buyDate,
        miles: this.props.miles,
        wears: this.props.wears
      },
      () => {
        this.getMilesAndWears();
      }
    );
  };

  getMilesAndWears = () => {
    let shoeMiles = this.props.shoeMiles;
    let miles = parseFloat(this.props.miles);
    let wears = parseFloat(this.props.wears);
    let name = this.props.name;

    for (var i in shoeMiles) {
      if (shoeMiles[i][0] === name) {
        miles += parseFloat(shoeMiles[i][1]);
        wears += 1;
      }
    }

    this.setState({
      miles: Math.round(miles * 100) / 100,
      wears: wears
    });
  };

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
          <div>{this.state.miles}</div>
        </div>
        <div className="shoeData">
          <div className="shoeTitle">Wears</div>
          <div>{this.state.wears}</div>
        </div>

        {/* DELETE */}
        {/* <button
                    className="btn btn-danger btn-sm shoeBtn"
                    onClick={this.props.deleteShoe.bind(null, this.props.id)}
                    disabled={localStorage.getItem("userId") === "834292GU"}
                >
                    <FontAwesomeIcon className="fa-2x faTrashAlt" icon={faTrashAlt} />
                </button> */}
      </div>
    );
  }
}

export default Shoe;

import React, { Component } from "react";
import Award from "../Award/award";
import "./profileHeader.css";

class ProfileHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            hof: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            firstName: this.props.firstName,
            hof: this.props.hof,
        });
    }

    render() {
        return (
            <span>
                <div className="jumbotron jumbotron-fluid profileHeader">
                    <h1 className="display-4">
                        {this.state.firstName}

                        <div className="hof flex-wrap">
                            {this.state.hof && this.state.hof.length > 0 ? (
                                this.state.hof.map(hof => (
                                    <Award 
                                        key={hof[1]}
                                        hof={hof}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </h1>
                </div>
                
            </span>
        )
    }
}

export default ProfileHeader;

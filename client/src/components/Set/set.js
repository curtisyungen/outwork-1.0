import React, { Component } from "react";
import SetItem from "../SetItem/setItem";
import "./set.css";

class Set extends Component {

    constructor(props) {
        super(props);

        this.state = {
            set: null,
        }
    }

    componentDidMount = () => {
        console.log(this.props);
        this.setState({
            set: this.props.set,
        });
    }

    render() {
        return (
            <div className="set">
            {this.state.set && this.state.set.length > 0 ? (
                this.state.set.map(item => (
                    <SetItem 
                        key={Math.random() * 100000}
                        name={item.name}
                        reps={item.reps}
                        handleInputChange={this.props.handleInputChange}
                    />
                ))
            ) : (
                <></>
            )}
            </div>
        )
    }
}

export default Set;
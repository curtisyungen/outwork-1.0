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
                        id={item.id}
                        name={item.name}
                        reps={item.reps}
                        setWeight={this.props.setWeight}
                        setRest={this.props.setRest}
                        setNotes={this.props.setNotes}
                        source={this.props.source}
                        weight={item.weight}
                        rest={item.rest}
                        notes={item.notes}
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
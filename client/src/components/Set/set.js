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
            <div className={`set row diff${this.props.difficulty}`}>
            {this.state.set && this.state.set.length > 0 ? (
                this.state.set.map(item => (
                    <SetItem 
                        key={item.id}
                        id={item.id}
                        assignName={item.name}
                        assignReps={item.reps}
                        setActualReps={this.props.setActualReps}
                        setWeight={this.props.setWeight}
                        setRest={this.props.setRest}
                        setNotes={this.props.setNotes}
                        difficulty={this.props.difficulty}
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
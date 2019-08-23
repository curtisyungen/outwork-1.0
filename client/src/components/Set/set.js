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
                        key={`${item.name}${item.reps}`}
                        id={item.id}
                        name={item.name}
                        weight={item.weight}
                        reps={item.reps}
                        actualReps={item.actualReps}
                        rest={item.rest}
                        notes={item.notes}
                        assignName={item.name}
                        assignReps={item.reps}
                        setActualReps={this.props.setActualReps}
                        setWeight={this.props.setWeight}
                        setRest={this.props.setRest}
                        setNotes={this.props.setNotes}
                        difficulty={this.props.difficulty}
                        completeGoggins={this.props.completeGoggins}
                        saveSetsInSessionStorage={this.props.saveSetsInSessionStorage}
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
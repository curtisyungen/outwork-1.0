import React, { Component } from "react";
// import Modal from "react-responsive-modal";
import LiftDetailExercise from "../LiftDetailExercise/liftDetailExercise";
import "./liftDetailSet.css";

class LiftDetailSet extends Component {
    
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
            <table className="table table-striped table-bordered table-sm text-center align-middle liftDetails">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Reps or Time</th>
                        <th>Weight (lbs.)</th>
                        <th>Rest (min.)</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.set && this.state.set.length > 0 ? (
                        this.state.set.map(exercise => (
                            <LiftDetailExercise
                                key={Math.random() * 100000}
                                name={exercise.name}
                                reps={exercise.reps}
                                weight={exercise.weight}
                                rest={exercise.rest}
                                notes={exercise.notes}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </table>
        )
    }
}

export default LiftDetailSet;
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
            <table className="table table-striped table-bordered table-responsive table-sm text-center align-middle liftDetails liftDetailSet">
                <thead className="thead-dark">
                    <tr>
                        <th>Exercise</th>
                        <th>Lbs.</th>
                        <th>Superset ID</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Rest</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.set && this.state.set.length > 0 ? (
                        this.state.set.map(exercise => (
                            <LiftDetailExercise
                                key={Math.random() * 100000}
                                name={exercise.name}
                                weight={exercise.weight}
                                superset={exercise.superset}
                                sets={exercise.sets}
                                reps={exercise.reps}
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
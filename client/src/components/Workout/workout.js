import React, { Component } from "react";
import Set from "../Set/set";
import exerAPI from "../../utils/exerAPI";
import "./workout.css";

class Workout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userEquipment: null,
            difficulty: null,
            exercises: null,
            filtered: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userEquipment: this.props.userEquipment,
            difficulty: this.props.difficulty,
        }, () => {
            this.getExercises();
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.generate !== this.props.generate) {
            this.setState({
                userEquipment: this.props.userEquipment,
                difficulty: this.props.difficulty,
            }, () => {
                this.getExercises();
            });
        }
    }

    // Get all exercises from database
    // Call getWorkout
    getExercises = () => {

        exerAPI.getAllExercises()
            .then((res) => {
                this.setState({
                    exercises: res.data,
                }, () => {
                    this.filterExercises();
                });
            });
    }

    filterExercises = () => {

        let exercises = this.state.exercises;
        let filtered = [];

        // Look at equipment needed for each exercise in list
        for (var e in exercises) {

            // If no equipment needed, add exercise to filtered list
            if (exercises[e].equipment === "") {
                filtered.push(exercises[e]);
            }

            // If equipment is needed, check if user owns equipment
            else {
                let valid = this.checkUserEquipment(exercises[e].equipment);
                if (valid) {
                    filtered.push(exercises[e]);
                }
            }
        }

        this.setState({
            filtered: filtered,
        }, () => {
            this.getSets();
        });
    }

    checkUserEquipment = (equipment) => {
        let userEquipment = this.state.userEquipment;

        for (var ue in userEquipment) {
            if (equipment.indexOf(userEquipment[ue]) > -1) {
                return true;
            }
        }

        return false;
    }

    getSets = () => {
        let difficulty = this.state.difficulty;
        let filtered = this.state.filtered;

        let sets = [];

        for (var s=0; s<difficulty; s++) {

            let set = [];
            for (var ex=0; ex<5; ex++) {
                let randEx = Math.floor(Math.random() * filtered.length);
                let name = filtered[randEx].name;

                let exercise = {
                    name: name,
                    reps: this.getReps(filtered[randEx]),
                }

                set.push(exercise);
            }

            sets.push(set);
        }

        this.setState({
            sets: sets,
        });
    }

    getReps = (exercise) => {
        let repIdx = Math.floor(Math.random() * 4);
        let reps = 0;

        switch(repIdx) {
            case 0: reps = exercise.low; break;
            case 1: reps = exercise.med; break;
            case 2: reps = exercise.high; break;
            case 3: reps = exercise.extreme; break;
            default: reps = exercise.extreme;
        }

        return reps;
    }

    render() {
        return (
            <div>
                {this.props.difficulty}
                {this.props.userEquipment}
                {this.state.sets && this.state.sets.length > 0 ? (
                    this.state.sets.map(set => (
                        <Set 
                            key={Math.random() * 100000}
                            set={set}
                        />
                    ))
                ) : (
                        <></>
                    )}
            </div>
        )
    }
}

export default Workout;
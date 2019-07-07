import React, { Component } from "react";
import Set from "../Set/set";
import actAPI from "../../utils/actAPI";
import exerAPI from "../../utils/exerAPI";
import "./workout.css";

class Workout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userEquipment: null,
            difficulty: null,
            exercises: null,
            filtered: null,
            sets: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
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

    handleInputChange = (setId) => {
        
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

        for (var s = 0; s < difficulty; s++) {

            let set = [];
            for (var ex = 0; ex < 5; ex++) {

                // Data is the name and index of the random exercise chosen, returned from .getRand()
                // Name is the name of the randomly chosen exercise
                // randEx is used to generate the reps for this particular exercise
                let data = this.getRand(filtered, set);
                let name = data.name;
                let randEx = data.randEx;

                let exercise = {
                    id: s,
                    name: name,
                    weight: null,
                    reps: this.getReps(filtered[randEx]),
                    rest: null,
                }

                set.push(exercise);
            }

            sets.push(set);
        }

        this.setState({
            sets: sets,
        });
    }

    // This function takes in the filtered exercise list and the current set as arguments
    // It chooses a random exercise from the filtered list
    // Then it ensures that this exercise is not already in the set
    // It continues looping until it finds an exercise that isn't already in the current set
    // Once it finds one, it returns the chosen exercise name as well as its index in the filtered list
    getRand = (filtered, set) => {

        let validName = false;
        let randEx, name;
        let count;

        while (!validName) {
            randEx = Math.floor(Math.random() * filtered.length);
            name = filtered[randEx].name;
            count = 0;

            for (var ex in set) {
                if (set[ex].name === name) {
                    count += 1;
                }
            }

            if (count === 0) {
                validName = true;
            }
        }

        return { name, randEx };
    }

    getReps = (exercise) => {
        let repIdx = Math.floor(Math.random() * 4);
        let reps = 0;

        switch (repIdx) {
            case 0: reps = exercise.low; break;
            case 1: reps = exercise.med; break;
            case 2: reps = exercise.high; break;
            case 3: reps = exercise.extreme; break;
            default: reps = exercise.extreme;
        }

        return reps;
    }

    setWeight = (setId, exName, weight) => {
        let sets = this.state.sets;
        
        let idx;
        for (var ex in sets[setId]) {
            if (sets[setId][ex].name === exName) {
                idx = ex;
            }
        }

        sets[setId][idx].weight = weight;
    }

    setRest = (setId, exName, rest) => {
        let sets = this.state.sets;
        
        let idx;
        for (var ex in sets[setId]) {
            if (sets[setId][ex].name === exName) {
                idx = ex;
            }
        }

        sets[setId][idx].rest = rest;
    }

    setNotes = (setId, exName, notes) => {
        let sets = this.state.sets;
        
        let idx;
        for (var ex in sets[setId]) {
            if (sets[setId][ex].name === exName) {
                idx = ex;
            }
        }

        sets[setId][idx].notes = notes;
    }

    completeWorkout = () => {
        let confirm = window.confirm("Workout complete?");

        if (confirm) {
            localStorage.setItem("workout", JSON.stringify(this.state.sets));

            let liftData = {
                userId: this.props.userId,
                date: this.props.date,
                location: this.props.location,
                duration: this.props.duration,
                generator: this.props.difficulty,
                pushups: null,
                pullups: null,
                workout: JSON.stringify(this.state.sets),
                muscleGroups: null,
                notes: this.props.notes,
            }

            actAPI.createLift(liftData)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Workout logged!");
                    }
                    else {
                        alert("Error logging workout.");
                    }
                });
        }
    }

    render() {
        return (
            <div>
                {this.state.sets && this.state.sets.length > 0 ? (
                    this.state.sets.map(set => (
                        <Set
                            key={Math.random() * 100000}
                            set={set}
                            handleInputChange={this.handleInputChange}
                            setWeight={this.setWeight}
                            setRest={this.setRest}
                            setNotes={this.setNotes}
                        />
                    ))
                ) : (
                        <></>
                    )}

                {this.state.sets && this.state.sets.length > 0 ? (
                    <div>
                        <button className="btn btn-success" onClick={this.completeWorkout}>Complete</button>
                    </div>
                ) : (
                        <></>
                    )}
            </div>
        )
    }
}

export default Workout;
import React, { Component } from "react";
import Modal from "react-responsive-modal";
import Set from "../Set/set";
import Stopwatch from "../Stopwatch/stopwatch";
import workoutAPI from "../../utils/workoutAPI";
import exerAPI from "../../utils/exerAPI";
import "./workout.css";

class Workout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            userEquipment: null,
            date: null,
            location: null,
            duration: null,
            notes: null,
            difficulty: null,
            exercises: null,
            filtered: null,
            sets: null,
            complete: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            userEquipment: this.props.userEquipment,
            difficulty: this.props.difficulty,
        }, () => {
            if (sessionStorage.getItem("sets") && JSON.parse(sessionStorage.getItem("sets")).length > 0) {
                this.getSetsFromSessionStorage();
            }
            else {
                this.getExercises();
            } 
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

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
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

    getSetsFromSessionStorage = () => {
        let sets = JSON.parse(sessionStorage.getItem("sets"));
        let difficulty = sessionStorage.getItem("diff");
        
        this.setState({
            sets: sets,
            difficulty: difficulty,
        });
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
        }, () => {
            sessionStorage.setItem("sets", JSON.stringify(sets));
            sessionStorage.setItem("diff", difficulty);
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

    getPushUps = () => {
        let sets = this.state.sets;

        console.log(sets);

        let pushups = 0;
        let name;

        for (var i in sets) {
            name = sets[i].name.toLowerCase();
            if (name.indexOf("push") > -1) {
                pushups += parseInt(sets[i].reps);
            }
        }

        this.setState({
            pushups: pushups,
        });
    }

    getPullUps = () => {
        let sets = this.state.sets;
        let pullups = 0;
        let name;

        for (var i in sets) {
            name = sets[i].name.toLowerCase();
            if (name.indexOf("pull") > -1 && name.indexOf("up") > -1) {
                pullups += parseInt(sets[i].reps);
            }
        }

        this.setState({
            pullups: pullups,
        });
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
        this.setState({
            complete: true,
        }, () => {
            // this.getPushUps();
            // this.getPullUps();
        });
    }

    closeModal = () => {
        this.setState({
            complete: false,
        });
    }

    submitWorkout = () => {
        let generator = "Standard";
        switch (this.props.difficulty) {
            case "1": generator = "Baby"; break;
            case "2": generator = "Easy"; break;
            case "3": generator = "Average"; break;
            case "4": generator = "Superior"; break;
            case "5": generator = "Hero"; break;
            case "6": generator = "Superman"; break;
            case "7": generator = "Rogan"; break;
            case "8": generator = "Goggins"; break;
            default: generator = "Standard";
        }

        let liftData = {
                workoutType: "lift",
                userId: this.props.userId,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                date: this.state.date,
                location: this.state.location,
                distance: null,
                duration: this.state.duration,
                milePace: null,
                runType: null,
                laps: null,
                repeats: null,
                race: null,
                surface: null,
                weather: null,
                climb: null,
                grade: null,
                shoe: null,
                bike: null,
                generator: generator,
                pushups: this.state.pushups,
                pullups: this.state.pullups,
                workout: JSON.stringify(this.state.sets),
                muscleGroups: JSON.stringify(this.state.muscleGroups),
                notes: this.state.notes,
                map: null,
            };

            workoutAPI.createWorkout(liftData)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Workout submitted!");
                        sessionStorage.setItem("sets", null);
                        sessionStorage.setItem("diff", null);
                        window.location.reload();
                    }
                    else {
                        alert("Error submitting workout.");
                    }
                });
    }

    recordTime = (timeString) => {
        this.setState({
            timeString: timeString,
        });
    }

    render() {
        return (
            <div>
                {this.state.sets && this.state.sets.length > 0 ? (
                    <span>
                        {/* <Stopwatch 
                            recordTime={this.recordTime}
                        /> */}

                        {this.state.sets.map(set => (
                            <Set
                                key={Math.random() * 100000}
                                set={set}
                                handleInputChange={this.handleInputChange}
                                setWeight={this.setWeight}
                                setRest={this.setRest}
                                setNotes={this.setNotes}
                                difficulty={this.state.difficulty}
                            />
                        ))}
                    </span>
                ) : (
                        <></>
                    )}

                {this.state.sets && this.state.sets.length > 0 ? (
                    <div className="completeBtn">
                        <button className="btn btn-outline-dark" onClick={this.completeWorkout}>Complete</button>
                    </div>
                ) : (
                        <></>
                    )}

                {this.state.complete ? (
                    <Modal
                        open={this.state.complete}
                        onClose={this.closeModal}
                    >

                        {/* DATE */}
                        <div className="input-group input-group-sm mb-3 workoutModalForm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Date</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="date"
                                type="date"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                            />
                        </div>

                        {/* LOCATION */}
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Location</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="location"
                                type="text"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                            />
                        </div>

                        {/* DURATION */}
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Duration</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="duration"
                                type="text"
                                className="form-control"
                                placeholder="hh:mm:ss"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                                defaultValue={this.props.timeString}
                            />
                        </div>

                        {/* NOTES */}
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Notes</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="notes"
                                type="text"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button className="btn btn-success btn-sm submitWorkoutBtn" onClick={this.submitWorkout}>Submit</button>
                    </Modal>
                ) : (
                        <></>
                    )}
            </div>
        )
    }
}

export default Workout;
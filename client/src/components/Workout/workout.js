import React, { Component } from "react";
import Modal from "react-responsive-modal";
import Set from "../Set/set";
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
            time: null,
            location: null,
            duration: null,
            ttlMins: null,
            notes: null,
            difficulty: null,
            exercises: null,
            filtered: null,
            sets: null,
            workout: null,
            complete: false,
            today: null,
        }
    }

    componentDidMount = () => {
        this.getToday();

        this.setState({
            userId: this.props.userId,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            userEquipment: this.props.userEquipment,
            difficulty: this.props.difficulty,
        }, () => {
            if (sessionStorage.getItem("sets") !== null && sessionStorage.getItem("sets").length > 0) {
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
    
    validateLiftForm = () => {
        let date = this.state.date;
        let duration = this.state.duration;

        if (date === null || date === "" || date.length < 10) {
            alert("Inputted date is not valid.");
            return false;
        }

        if (duration === null || duration === "" || duration.length !== 8) {
            alert("Duration must be in hh:mm:ss format.");
            return false;
        }

        return true;
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
        let workout = JSON.parse(sessionStorage.getItem("sets"));
        let difficulty = sessionStorage.getItem("diff");
        
        this.setState({
            sets: sets,
            workout: workout,
            difficulty: difficulty,
        });
    }

    getSets = () => {
        let difficulty = this.state.difficulty;
        let filtered = this.state.filtered;
        let sets = [];
        let workout = [];

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
                    superset: s + 1,
                    sets: 1,
                    weight: null,
                    reps: this.getReps(filtered[randEx]),
                    actualReps: null,
                    rest: null,
                    primaryMG: filtered[randEx].primaryMG,
                }

                set.push(exercise);
            }

            sets.push(set);
            workout.push(set);
        }

        this.setState({
            sets: sets,
            workout: workout,
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

            // Prevents duplicate exercises in single set
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
        let workout = this.state.workout;
        let pushups = 0;
        let name;

        for (var s in workout) {
            for (var i=0; i<5; i++) {
                name = workout[s][i].name;
                if (name && name.toLowerCase().indexOf("push") > -1 && name.toLowerCase().indexOf("up") > -1) {
                    if (parseFloat(workout[s][i].actualReps) > 0) {
                        pushups += parseFloat(workout[s][i].actualReps);
                    }
                    else {
                        pushups += parseFloat(workout[s][i].reps);
                    }
                }
            }
        }

        this.setState({
            pushups: pushups,
        });
    }

    getPullUps = () => {
        let workout = this.state.workout;
        let pullups = 0;
        let name;

        for (var s in workout) {
            for (var i=0; i<5; i++) {
                name = workout[s][i].name;

                // Get Pull-Ups
                if (name && name.toLowerCase().indexOf("pull") > -1 && name.toLowerCase().indexOf("up") > -1) {
                    if (parseFloat(workout[s][i].actualReps) > 0) {
                        pullups += parseFloat(workout[s][i].actualReps);
                    }
                    else {
                        pullups += parseFloat(workout[s][i].reps);
                    }
                }

                // Get Chin-Ups
                if (name && name.toLowerCase().indexOf("chin") > -1 && name.toLowerCase().indexOf("up") > -1) {
                    if (parseFloat(workout[s][i].actualReps) > 0) {
                        pullups += parseFloat(workout[s][i].actualReps);
                    }
                    else {
                        pullups += parseFloat(workout[s][i].reps);
                    }
                }
            }
        }

        this.setState({
            pullups: pullups,
        });
    }

    getMuscleGroups = () => {
        let sets = this.state.sets;
        let muscleGroups = [];

        for (var s in sets) {
            for (var ex=0; ex<5; ex++) {
                let group = sets[s][ex].primaryMG;

                if (muscleGroups.indexOf(group) === -1) {
                    muscleGroups.push(group);
                }
            }
        }

        this.setState({
            muscleGroups: muscleGroups,
        });
    }

    setActualReps = (setId, exName, reps) => {
        let workout = this.state.workout;

        let idx;
        for (var ex in workout[setId]) {
            if (workout[setId][ex].name === exName) {
                idx = ex;
            }
        }

        workout[setId][idx].reps = reps;
    }

    setWeight = (setId, exName, weight) => {
        let workout = this.state.workout;

        let idx;
        for (var ex in workout[setId]) {
            if (workout[setId][ex].name === exName) {
                idx = ex;
            }
        }

        workout[setId][idx].weight = weight;
    }

    setRest = (setId, exName, rest) => {
        let workout = this.state.workout;

        let idx;
        for (var ex in workout[setId]) {
            if (workout[setId][ex].name === exName) {
                idx = ex;
            }
        }

        workout[setId][idx].rest = rest;
    }

    setNotes = (setId, exName, notes) => {
        let workout = this.state.workout;

        let idx;
        for (var ex in workout[setId]) {
            if (workout[setId][ex].name === exName) {
                idx = ex;
            }
        }

        workout[setId][idx].notes = notes;
    }

    completeWorkout = () => {
        this.setState({
            complete: true,
        }, () => {
            this.getPushUps();
            this.getPullUps();
            this.getMuscleGroups();
        });
    }

    closeModal = () => {
        this.setState({
            complete: false,
        });
    }

    getTtlMins = () => {
        let time = this.state.duration;
        let hours, mins, secs;

        if (time === null || time.length < 8) {
            alert("Invalid duration format. Must be hh:mm:ss.");
            return;
        }

        hours = parseFloat(time.split(":")[0]);
        mins = parseFloat(time.split(":")[1]);
        secs = parseFloat(time.split(":")[2]);

        let ttlMins = 0;

        ttlMins = Math.round(((hours * 60) + mins + (secs / 60)) * 100) / 100;

        this.setState({
            ttlMins: ttlMins,
        }, () => {
            this.submitWorkout();
        });
    }

    getToday = () => {
        let today = new Date();
        let month = today.getMonth() + 1;
        let date = today.getDate();

        let moZero = "";

        if (month < 10) {
            moZero = 0;
        }

        let dateZero = "";

        if (date < 10) {
            dateZero = 0;
        }

        let defaultDate = `2019-${moZero}${month}-${dateZero}${date}`

        this.setState({
            today: defaultDate,
        });
    }

    submitWorkout = () => {
        this.props.checkValidUser();

        if (this.validateLiftForm()) {

            let generator = "Standard";
            switch (this.state.difficulty) {
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
                    time: this.state.time,
                    location: this.state.location,
                    distance: null,
                    duration: this.state.duration,
                    ttlMins: this.state.ttlMins,
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
                    workout: JSON.stringify(this.state.workout),
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
    }

    render() {
        return (
            <div>
                {this.state.sets && this.state.sets.length > 0 ? (
                    <span>
                        {this.state.sets.map(set => (
                            <Set
                                key={Math.random() * 100000}
                                set={set}
                                setActualReps={this.setActualReps}
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
                        <h4>Details</h4>

                        {/* DATE */}
                        <div className="input-group input-group-sm mb-3 workoutModalForm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Date*</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="date"
                                type="date"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.today}
                            />
                        </div>

                        {/* TIME */}
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Time of Day</span>
                            </div>
                            <input
                                autoComplete="off"
                                name="time"
                                type="text"
                                className="form-control"
                                placeholder="3:00pm"
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
                                <span className="input-group-text" id="inputGroup-sizing-sm">Duration*</span>
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

                        {localStorage.getItem("userId") === "834292GU" ? (
                            <></>
                        ) : (
                            <button className="btn btn-success btn-sm submitWorkoutBtn" onClick={this.getTtlMins}>Submit</button>
                        )}
                    </Modal>
                ) : (
                        <></>
                    )}
            </div>
        )
    }
}

export default Workout;
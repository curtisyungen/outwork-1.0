import React, { Component } from "react";
// import Container from "../components/Container/container";
import Exercise from "../components/Exercise/exercise";
import MuscleGroup from "../components/MuscleGroup/muscleGroup";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import userAPI from "../utils/userAPI";
import workoutAPI from "../utils/workoutAPI";
import "./SubmitLift.css";

class SubmitLift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            date: null,
            time: null,
            location: null,
            duration: null,
            ttlMins: null,
            generator: null,
            pushups: null,
            pullups: null,
            exercises: [],
            muscleGroups: [],
            muscleGroupList: [],
            notes: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        // Get user info
        let userId = localStorage.getItem("userId");     

        userAPI.getUserById(userId)
            .then((res) => {
                // Get exercises 
                let exercises = [];   
                let exercise = {
                    id: 0,
                    name: "",
                    weight: "",
                    superset: "",
                    sets: "",
                    reps: "",
                    rest: "",
                    notes: "",
                }

                exercises.push(exercise);
                
                let muscleGroupList = [
                    "Chest", "Shoulders", 
                    "Back", "Biceps", 
                    "Triceps", "Forearms", 
                    "Quadriceps", "Hamstrings", 
                    "Calves", "Abdominals"];

                this.setState({
                    userId: userId,
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    exercises: exercises,
                    muscleGroupList: muscleGroupList,
                });
            });      
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    validateLiftForm = () => {
        let date = this.state.date;
        let exer = this.state.exercises;
        let time = this.state.duration;

        if (date === null || date === "" || date.length < 10) {
            alert("Inputted date is not valid.");
            return false;
        }

        if (exer === null || exer === "" || exer <= 0) {
            alert("Must input the list of exercises completed.");
            return false;
        }

        if (time === null || time === "" || time.length < 8) {
            alert("Duration must be in hh:mm:ss format.");
            return false;
        }

        return true;
    }

    // Counts exercises that contain "push-up" or "push up"
    getPushUps = () => {
        let exercises = this.state.exercises;
        let pushups = 0;

        for (var e in exercises) {
            let name = exercises[e].name.toLowerCase();
            let reps = parseFloat(exercises[e].reps);
            let sets = parseFloat(exercises[e].sets);

            if (name.indexOf("push-up") > -1) {
                pushups += reps * sets;
            }

            if (name.indexOf("push up") > -1) {
                pushups += reps * sets;
            }
        }

        return pushups;
    }

    // Counts exercises that contain "pull-up", "pull up", "chin-up", "chin up", AND
    // that do NOT contain "static", such as Pull-Up Static Hold
    getPullUps = () => {
        let exercises = this.state.exercises;
        let pullups = 0;

        for (var e in exercises) {
            let name = exercises[e].name.toLowerCase();
            let reps = parseFloat(exercises[e].reps);
            let sets = parseFloat(exercises[e].sets);

            if (name.indexOf("pull-up") > -1 && name.indexOf("static") === -1) {
                pullups += reps * sets;
            }

            if (name.indexOf("pull up") > -1 && name.indexOf("static") === -1) {
                pullups += reps * sets;
            }

            if (name.indexOf("chin-up") > -1 && name.indexOf("static") === -1) {
                pullups += reps * sets;
            }

            if (name.indexOf("chin up") > -1 && name.indexOf("static") === -1) {
                pullups += reps * sets;
            }
        }

        return pullups;
    }

    addExercise = () => {
        let exercises = this.state.exercises;

        let maxId = -1;
        for (var e in exercises) {
            if (exercises[e].id > maxId) {
                maxId = parseInt(exercises[e].id);
            }
        }

        let exercise = {
            id: maxId + 1,
            name: "",
            weight: "",
            reps: "",
            rest: "",
        }

        exercises.push(exercise);

        this.setState({
            exercises: exercises,
        });
    }

    getExercise = (exercise) => {
        let exercises = this.state.exercises;
        let idx = -1;

        for (var e in exercises) {
            if (exercises[e].id === exercise.id) {
                idx = e;
            }
        }

        if (idx > -1) {
            exercises[idx] = exercise;
        }
        else {
            exercises.push(exercise);
        }

        this.setState({
            exercises: exercises,
        });
    }

    deleteExercise = (exercise) => {
        let exercises = this.state.exercises;
        let idx;

        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === exercise) {
                idx = i;
            }
        }

        exercises.splice(idx, 1);

        this.setState({
            exercises: exercises,
        });
    }

    updateMuscleGroups = (muscleGroup) => {
        let muscleGroups = this.state.muscleGroups;
        let idx = muscleGroups.indexOf(muscleGroup);

        if (idx === -1) {
            muscleGroups.push(muscleGroup);
        }
        else {
            muscleGroups.splice(idx, 1);
        }

        this.setState({
            muscleGroups: muscleGroups,
        });
    }

    setName = (id, name) => {
        let exercises = this.state.exercises;

        for (var e in exercises) {
            if (exercises[e].id === id) {
                exercises[e].name = name;
            }
        }

        this.setState({
            exercises: exercises,
        });
    }

    setWeight = (id, weight) => {
        let exercises = this.state.exercises;

        for (var e in exercises) {
            if (exercises[e].id === id) {
                exercises[e].weight = weight;
            }
        }

        this.setState({
            exercises: exercises,
        });
    }

    setSuperset = (id, superset) => {
        let exercises = this.state.exercises;

        for (var e in exercises) {
            if (exercises[e].id === id) {
                exercises[e].superset = superset;
            }
        }

        this.setState({
            exercises: exercises,
        });
    }

    setSets = (id, sets) => {
        let exercises = this.state.exercises;

        for (var e in exercises) {
            if (exercises[e].id === id) {
                exercises[e].sets = sets;
            }
        }

        this.setState({
            exercises: exercises,
        });
    }

    setReps = (id, reps) => {
        let exercises = this.state.exercises;

        for (var e in exercises) {
            if (exercises[e].id === id) {
                exercises[e].reps = reps;
            }
        }

        this.setState({
            exercises: exercises,
        });
    }
    
    setRest = (id, rest) => {
        let exercises = this.state.exercises;

        for (var e in exercises) {
            if (exercises[e].id === id) {
                exercises[e].rest = rest;
            }
        }

        this.setState({
            exercises: exercises,
        });
    }

    setNotes = (id, notes) => {
        let exercises = this.state.exercises;

        for (var e in exercises) {
            if (exercises[e].id === id) {
                exercises[e].notes = notes;
            }
        }

        this.setState({
            exercises: exercises,
        });
    }

    getTtlMins = () => {
        let time = this.state.duration;
        let hours, mins, secs;

        hours = parseFloat(time.split(":")[0]);
        mins = parseFloat(time.split(":")[1]);
        secs = parseFloat(time.split(":")[2]);

        let ttlMins = 0;

        ttlMins = Math.round(((hours * 60) + mins + (secs / 60)) * 100) / 100;

        this.setState({
            ttlMins: ttlMins,
        }, () => {
            this.submitLift();
        });
    }

    submitLift = () => {
        this.props.checkValidUser();

        if (this.validateLiftForm()) {

            let generator = "Standard";
            switch (this.state.generator) {
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
                userId: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
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
                pushups: this.getPushUps(),
                pullups: this.getPullUps(),
                workout: JSON.stringify([this.state.exercises]),
                muscleGroups: JSON.stringify(this.state.muscleGroups),
                notes: this.state.notes,
                map: null,
            };

            workoutAPI.createWorkout(liftData)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Workout submitted!");
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
            <div className="container pageContainer submitContainer liftContainer">
                <div>

                    <div className="titleBar">
                        <h4>Lifting Workout</h4>

                        <ActivityIcons 
                            hidden="lift"
                        />
                    </div>

                    {/* DATE */}
                    <div className="input-group input-group-sm mb-3">
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
                        />
                    </div>

                    {/* GENERATOR */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Generator</span>
                        </div>
                        <select
                            className="browser-default custom-select"
                            autoComplete="off"
                            name="generator"
                            type="text"
                            onChange={this.handleInputChange}
                            defaultValue={null}
                        >
                            <option value=""></option>
                            <option value="1">Baby</option>
                            <option value="2">Easy</option>
                            <option value="3">Average</option>
                            <option value="4">Superior</option>
                            <option value="5">Hero</option>
                            <option value="6">Superman</option>
                            <option value="7">Rogan</option>
                            <option value="8">Goggins</option>
                        </select>
                    </div>

                    {/* WORKOUT */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend submitFormSectTitle">
                            Workout*
                        </div>
                    </div>

                    {this.state.exercises.map(exercise => (
                        <Exercise
                            key={exercise.id}
                            id={exercise.id}
                            setName={this.setName}
                            setWeight={this.setWeight}
                            setSuperset={this.setSuperset}
                            setSets={this.setSets}
                            setReps={this.setReps}
                            setRest={this.setRest}
                            setNotes={this.setNotes}
                            getExercise={this.getExercise}
                            deleteExercise={this.deleteExercise}
                        />
                    ))}

                    {/* ADD EXERCISE BUTTON */}
                    <div className="addExerciseDiv">
                        <button className="btn btn-dark btn-sm addExerciseBtn" onClick={this.addExercise}>
                            Add Exercise
                        </button>
                    </div>

                    {/* MUSCLE GROUPS */}
                    <div className="input-group input-group-sm mt-3 mb-3">
                        <div className="input-group-prepend submitFormSectTitle">
                            <div className="">Muscle Groups</div>
                        </div>
                    </div>

                    <div className="form-check">
                        {this.state.muscleGroupList && this.state.muscleGroupList.length > 0 ? (
                            this.state.muscleGroupList.map(group => (
                                <MuscleGroup
                                    key={Math.random() * 100000}
                                    muscleGroup={group}
                                    updateMuscleGroups={this.updateMuscleGroups}
                                    checked={this.state.muscleGroups.indexOf(group) > -1}
                                />
                            ))
                        ) : (
                            <></>
                        )}
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

                    {this.state.userId === "834292GU" ? (
                        <></>
                    ) : (
                        <button className="btn btn-primary" onClick={this.getTtlMins}>Submit</button>
                    )}
                </div>
            </div>
        )
    }
}

export default SubmitLift;
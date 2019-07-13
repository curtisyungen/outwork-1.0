import React, { Component } from "react";
// import Container from "../components/Container/container";
import Exercise from "../components/Exercise/exercise";
import MuscleGroup from "../components/MuscleGroup/muscleGroup";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import userAPI from "../utils/userAPI";
import actAPI from "../utils/actAPI";
import "./SubmitLift.css";

class SubmitLift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            location: null,
            duration: null,
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
                let exercise = {
                    id: 0,
                    name: "",
                    weight: "",
                    reps: "",
                    rest: "",
                }
        
                let exercises = [exercise];

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

    getPushUps = () => {
        let exercises = this.state.exercises;
        let pushups = 0;

        for (var e in exercises) {
            if (exercises[e].name.toLowerCase().indexOf("push-ups") > -1) {
                pushups += parseInt(exercises[e].reps);
            }

            if (exercises[e].name.toLowerCase().indexOf("push ups") > -1) {
                pushups += parseInt(exercises[e].reps);
            }
        }

        return pushups;
    }

    getPullUps = () => {
        let exercises = this.state.exercises;
        let pullups = 0;

        for (var e in exercises) {
            if (exercises[e].name.toLowerCase().indexOf("pull-ups") > -1) {
                pullups += parseInt(exercises[e].reps);
            }

            if (exercises[e].name.toLowerCase().indexOf("pull ups") > -1) {
                pullups += parseInt(exercises[e].reps);
            }
        }

        return pullups;
    }

    addExercise = () => {
        let exercises = this.state.exercises;
        let exercise = {
            id: exercises.length,
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

    setName = (id, name) => {
        let exercises = this.state.exercises;
        let idx;
        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].name = name;

        this.setState({
            exercises: exercises,
        });
    }

    setWeight = (id, weight) => {
        let exercises = this.state.exercises;
        let idx;
        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].weight = weight;

        this.setState({
            exercises: exercises,
        });
    }

    setSuperset = (id, superset) => {
        let exercises = this.state.exercises;
        let idx;
        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].superset = superset;

        this.setState({
            exercises: exercises,
        });
    }

    setSets = (id, sets) => {
        let exercises = this.state.exercises;
        let idx;
        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].sets = sets;

        this.setState({
            exercises: exercises,
        });
    }

    setReps = (id, reps) => {
        let exercises = this.state.exercises;
        let idx;
        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].reps = reps;

        this.setState({
            exercises: exercises,
        });
    }

    setRest = (id, rest) => {
        let exercises = this.state.exercises;
        let idx;
        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].rest = rest;

        this.setState({
            exercises: exercises,
        });
    }

    setNotes = (id, notes) => {
        let exercises = this.state.exercises;
        let idx;
        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].notes = notes;

        this.setState({
            exercises: exercises,
        });
    }

    submitLift = () => {

        if (this.props.checkValidUser()) {

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
                location: this.state.location,
                duration: this.state.duration,
                generator: generator,
                pushups: this.getPushUps(),
                pullups: this.getPullUps(),
                workout: JSON.stringify([this.state.exercises]),
                muscleGroups: JSON.stringify(this.state.muscleGroups),
                notes: this.state.notes,
            };

            actAPI.createLift(liftData)
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

    render() {
        return (
            <div className="container pageContainer">
                <div className={`${this.props.theme}`}>

                    <ActivityIcons 
                        hidden="lift"
                    />

                    <h4>Lifting Workout</h4>

                    {/* DATE */}
                    <div className="input-group input-group-sm mb-3">
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
                            Workout
                        </div>
                        <div>
                            <button className="btn btn-dark btn-sm addExerciseBtn" onClick={this.addExercise}>Add Exercise</button>
                        </div>
                    </div>

                    {this.state.exercises.map(exercise => (
                        <Exercise
                            key={Math.random() * 100000}
                            id={exercise.id}
                            name={exercise.name}
                            weight={exercise.weight}
                            superset={exercise.superset}
                            sets={exercise.sets}
                            reps={exercise.reps}
                            rest={exercise.rest}
                            notes={exercise.notes}
                            setName={this.setName}
                            setWeight={this.setWeight}
                            setSuperset={this.setSuperset}
                            setSets={this.setSets}
                            setReps={this.setReps}
                            setRest={this.setRest}
                            setNotes={this.setNotes}
                            deleteExercise={this.deleteExercise}
                        />
                    ))}

                    {/* MUSCLE GROUPS */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend submitFormSectTitle">
                            Muscle Groups
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

                    <button className="btn btn-primary" onClick={this.submitLift}>Submit</button>
                </div>
            </div>
        )
    }
}

export default SubmitLift;
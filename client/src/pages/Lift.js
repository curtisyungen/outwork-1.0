import React, { Component } from "react";
import Container from "../components/Container/container";
import Exercise from "../components/Exercise/exercise";
import actAPI from "../utils/actAPI";
// import "./Lift.css";

class Lift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            date: null,
            location: null,
            duration: null,
            pushups: null,
            pullups: null,
            exercises: [],
            muscleGroups: null,
            notes: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        let exercise = {
            id: 0,
            name: "",
            weight: "",
            reps: "",
            rest: "",
        }

        let exercises = [exercise];

        let userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
            exercises: exercises,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    getMuscleGroups = () => {

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

        this.setState({
            pushups: pushups,
        });
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

        this.setState({
            pullups: pullups,
        });
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

        for (var i=0; i<exercises.length; i++) {
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
        for (var i=0; i<exercises.length; i++) {
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
        for (var i=0; i<exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].weight = weight;

        this.setState({
            exercises: exercises,
        });
    }

    setReps = (id, reps) => {
        let exercises = this.state.exercises;
        let idx;
        for (var i=0; i<exercises.length; i++) {
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
        for (var i=0; i<exercises.length; i++) {
            if (exercises[i].id === id) {
                idx = i;
            }
        }

        exercises[idx].rest = rest;

        this.setState({
            exercises: exercises,
        });
    }


    submitLift = () => {

        if (this.props.checkValidUser()) {

            this.getPushUps();
            this.getPullUps();
            this.getMuscleGroups();

            let liftData = {
                userId: this.state.userId,
                date: this.state.date,
                location: this.state.location,
                duration: this.state.duration,
                pushups: this.state.pushups,
                pullups: this.state.pullups,
                workout: JSON.stringify(this.state.exercises),
                muscleGroups: JSON.stringify(this.state.muscleGroups),
                notes: this.state.notes,
            }

            actAPI.createLift(liftData)
                .then((res) => {
                    console.log(res);
                });
        }
    }

    render() {
        return (
            <Container>
                <div>

                    <a className="activity-sm col-md-2" href="/run">Run</a>
                    <a className="activity-sm col-md-2" href="/bike">Bike</a>
                    <a className="activity-sm col-md-2" href="/swim">Swim</a>

                    <h4>Lifting Workout</h4>

                    {/* DATE */}
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
                    <div className="col-md-4 input-group input-group-sm mb-3">
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

                    {/* WORKOUT */}
                    <div className="col-md-4 input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Workout</span>
                        </div>
                        <button className="btn btn-dark btn-sm addExerciseBtn" onClick={this.addExercise}>Add</button>
                    </div>
                    
                    {this.state.exercises.map(exercise => (
                            <Exercise 
                                key={Math.random() * 100000}
                                id={exercise.id}
                                name={exercise.name}
                                weight={exercise.weight}
                                reps={exercise.reps}
                                rest={exercise.rest}
                                setName={this.setName}
                                setWeight={this.setWeight}
                                setReps={this.setReps}
                                setRest={this.setRest}
                                deleteExercise={this.deleteExercise}
                            />
                        ))}

                    {/* NOTES */}
                    <div className="col-md-4 input-group input-group-sm mb-3">
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
            </Container>
        )
    }
}

export default Lift;
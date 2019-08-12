import React, { Component } from "react";
import Exercise from "../components/Exercise/exercise";
import MuscleGroup from "../components/MuscleGroup/muscleGroup";
import AddExerciseBtn from "../components/AddExerciseBtn/addExerciseBtn";
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
            exBtns: null,
            today: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
        this.getToday();

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

                //exercises.push(exercise);
                
                let muscleGroupList = [
                    "Chest", "Shoulders", 
                    "Back", "Biceps", 
                    "Triceps", "Forearms", 
                    "Quadriceps", "Hamstrings", 
                    "Calves", "Abdominals",
                ];

                let exBtns = [
                    "Push-Ups", "Pull-Ups", "Chin-Ups", 
                    "Pull-Up Weighted Negatives", 
                    "Chin-Up Weighted Negatives", "Pull-Up Static Hold", 
                    "Chin-Up Static Hold", "Kettle Bell Swings",
                    "Seated In and Outs", "Plank", "Plank Knee to Elbow", "Hanging Knee Raises",
                    "Twisting Crunches", "Weighted Calf Raises", "Bodyweight Squats",
                    "Wall Sit", "Clap Push-Ups", "Diamond Push-Ups", "Triangle Push-Ups", 
                    "Incline Push-Ups", "Decline Push-Ups"
                ];

                this.setState({
                    userId: userId,
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    exercises: exercises,
                    muscleGroupList: muscleGroupList,
                    exBtns: exBtns,
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

    // Adds exercise to Workout list
    addExercise = (name) => {
        let exercises = this.state.exercises;

        let maxId = -1;
        for (var e in exercises) {
            if (exercises[e].id > maxId) {
                maxId = parseInt(exercises[e].id);
            }
        }

        let exercise = {
            id: maxId + 1,
            name: name,
            weight: "",
            reps: "",
            rest: "",
        }

        exercises.push(exercise);

        this.setState({
            exercises: exercises,
        });
    }

    // Delete exercise from Workout list
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

    // Updates list of muscle groups targeted in this workout
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

    // User input: sets name of exercise
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

    // User input: sets weight used for exercise
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

    // User input: sets Superset ID for exercise
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

    // User input: sets number of sets for exercise
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

    // User input: sets reps for exercise
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
    
    // User input: sets rest for exercise
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

    // User input: sets notes for exercise
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

    // Converts workout duration into minutes
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

    // Gets today's date and formats as yyyy-mm-dd for defaultValue in Date field
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

    submitLift = () => {
        this.props.checkValidUser();

        if (this.validateLiftForm()) {

            let generator = "Non-generated";
            switch (this.state.generator) {
                case "1": generator = "Baby"; break;
                case "2": generator = "Easy"; break;
                case "3": generator = "Average"; break;
                case "4": generator = "Superior"; break;
                case "5": generator = "Hero"; break;
                case "6": generator = "Superman"; break;
                case "7": generator = "Rogan"; break;
                case "8": generator = "Goggins"; break;
                default: generator = "Non-generated";
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
                            //defaultValue={this.state.today}
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
                            <option value="">Non-generated</option>
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
                        <p className="infoMsg">
                            Only exercises containing "push-up", "pull-up", or "chin-up" count toward
                            overall push-up/pull-up totals. Static holds are not counted. 
                        </p>
                    </div>

                    {this.state.exercises.map(exercise => (
                        <Exercise
                            key={exercise.id}
                            id={exercise.id}
                            name={exercise.name}
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

                    {/* ADD EXERCISE BUTTONS */}
                    <div className="text-center">
                        <button 
                            className="btn btn-success btn-sm addExerciseBtn addExerciseBtn-main"
                            onClick={this.addExercise.bind(null, "")}
                        >
                            Add Exercise
                        </button>
                    </div>
                    <div className="addExerciseDiv">
                        {this.state.exBtns ? (
                            this.state.exBtns.map(btn => (
                                <AddExerciseBtn 
                                    key={btn}
                                    name={btn}
                                    addExercise={this.addExercise}
                                />
                            ))
                        ) : (
                            <></>
                        )}
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

                    {localStorage.getItem("userId") === "834292GU" ? (
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

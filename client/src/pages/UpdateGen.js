import React, { Component } from "react";
import Set from "../components/Set/set";
import workoutAPI from "../utils/workoutAPI";
import "./Generator.css";

class UpdateGen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liftId: null,
      userId: null,
      firstName: null,
      lastName: null
    };
  }

  componentDidMount = () => {
    this.props.checkValidUser();

    let liftId = sessionStorage.getItem("id");

    workoutAPI.getRunById(liftId).then(res => {
      let lift = res.data;

      this.setState({
        liftId: liftId,
        userId: lift.userId,
        firstName: lift.firstName,
        lastName: lift.lastName,
        date: lift.date,
        time: lift.time,
        location: lift.location,
        duration: lift.duration,
        ttlMins: lift.ttlMins,
        generator: lift.generator,
        pushups: lift.pushups,
        pullups: lift.pullups,
        workout: JSON.parse(lift.workout),
        muscleGroups: JSON.parse(lift.muscleGroups),
        notes: lift.notes
      });
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

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
  };

  // Loops through exercises in workout and adds up push-ups
  // Then calls getPullUps
  getPushUps = () => {
    let workout = this.state.workout;
    let pushups = 0;
    let name;

    for (var s in workout) {
      for (var i = 0; i < workout[s].length; i++) {
        name = workout[s][i].name;
        if (
          name &&
          name.toLowerCase().indexOf("push") > -1 &&
          name.toLowerCase().indexOf("up") > -1
        ) {
          if (parseFloat(workout[s][i].actualReps) > 0) {
            pushups += parseFloat(workout[s][i].actualReps);
          } else {
            if (!isNaN(parseFloat(workout[s][i].reps))) {
              pushups += parseFloat(workout[s][i].reps);
            }
          }
        }
      }
    }

    this.setState(
      {
        pushups: pushups
      },
      () => {
        this.getPullUps();
      }
    );
  };

  // Loops through exercises in workout and adds up pull-ups and chin-ups
  // Then calls updateGen
  getPullUps = () => {
    let workout = this.state.workout;
    let pullups = 0;
    let name;

    for (var s in workout) {
      for (var i = 0; i < workout[s].length; i++) {
        name = workout[s][i].name;

        // Get Pull-ups, exclude static holds
        if (
          name &&
          name.toLowerCase().indexOf("pull") > -1 &&
          name.toLowerCase().indexOf("up") > -1 &&
          name.toLowerCase().indexOf("static") === -1
        ) {
          if (parseFloat(workout[s][i].actualReps) > 0) {
            pullups += parseFloat(workout[s][i].actualReps);
          } else {
            if (!isNaN(parseFloat(workout[s][i].reps))) {
              pullups += parseFloat(workout[s][i].reps);
            }
          }
        }

        // Get Chin-ups, exclude static holds
        if (
          name &&
          name.toLowerCase().indexOf("chin") > -1 &&
          name.toLowerCase().indexOf("up") > -1 &&
          name.toLowerCase().indexOf("static") === -1
        ) {
          if (parseFloat(workout[s][i].actualReps > 0)) {
            pullups += parseFloat(workout[s][i].actualReps);
          } else {
            pullups += parseFloat(workout[s][i].reps);
          }
        }
      }
    }

    this.setState(
      {
        pullups: pullups
      },
      () => {
        this.updateGen();
      }
    );
  };

  // User input: sets actual reps for exercise, if different from assigned reps
  setActualReps = (setId, exName, reps) => {
    let workout = this.state.workout;

    let idx;
    for (var ex in workout[setId]) {
      if (workout[setId][ex].name === exName) {
        idx = ex;
      }
    }

    workout[setId][idx].actualReps = reps;

    this.setState({
      exercises: workout
    });
  };

  // User input: sets weight used for exercise
  setWeight = (setId, exName, weight) => {
    let workout = this.state.workout;

    let idx;
    for (var ex in workout[setId]) {
      if (workout[setId][ex].name === exName) {
        idx = ex;
      }
    }

    workout[setId][idx].weight = weight;

    this.setState({
      exercises: workout
    });
  };

  // User input: sets rest taken for exercise
  setRest = (setId, exName, rest) => {
    let workout = this.state.workout;

    let idx;
    for (var ex in workout[setId]) {
      if (workout[setId][ex].name === exName) {
        idx = ex;
      }
    }

    workout[setId][idx].rest = rest;

    this.setState({
      exercises: workout
    });
  };

  // User input: notes on exercise
  setNotes = (setId, exName, notes) => {
    let workout = this.state.workout;

    let idx;
    for (var ex in workout[setId]) {
      if (workout[setId][ex].name === exName) {
        idx = ex;
      }
    }

    workout[setId][idx].notes = notes;

    this.setState({
      exercises: workout
    });
  };

  updateGen = () => {
    return;
    this.props.checkValidUser();

    if (this.validateLiftForm()) {
      let liftData = {
        id: this.state.liftId,
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
        generator: this.state.generator,
        pushups: this.state.pushups,
        pullups: this.state.pullups,
        workout: JSON.stringify(this.state.workout),
        muscleGroups: JSON.stringify(this.state.muscleGroups),
        notes: this.state.notes,
        map: null
      };

      let liftId = this.state.liftId;

      workoutAPI.updateWorkout(liftId, liftData).then(res => {
        if (res.status === 200) {
          alert("Workout updated!");
          this.props.setRedirectToHome();
        } else {
          alert("Error updating workout.");
        }
      });
    }
  };

  render() {
    return (
      <div className="container pageContainer generatorPage">
        <div className={`difficultyBar`}>
          <h4>Update Lift</h4>

          {/* DATE */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Date*
              </span>
            </div>
            <input
              autoComplete="off"
              name="date"
              type="date"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
              defaultValue={this.state.date}
            />
          </div>

          {/* TIME */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Time of Day
              </span>
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
              defaultValue={this.state.time}
            />
          </div>

          {/* LOCATION */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Location
              </span>
            </div>
            <input
              autoComplete="off"
              name="location"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
              defaultValue={this.state.location}
            />
          </div>

          {/* DURATION */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Duration*
              </span>
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
              defaultValue={this.state.duration}
            />
          </div>

          {/* NOTES */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Notes
              </span>
            </div>
            <input
              autoComplete="off"
              name="notes"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
              defaultValue={this.state.notes}
            />
          </div>

          {this.state.workout && this.state.workout.length > 0 ? (
            this.state.workout.map(set => (
              <Set
                key={set[0].id}
                set={set}
                setActualReps={this.setActualReps}
                setWeight={this.setWeight}
                setRest={this.setRest}
                setNotes={this.setNotes}
                difficulty={this.state.difficulty}
                saveSetsInSessionStorage={() => null}
              />
            ))
          ) : (
            <></>
          )}

          {/* <button
            className="btn btn-success btn-sm updateGenBtn"
            onClick={this.getPushUps}
          >
            Update
          </button> */}
        </div>
      </div>
    );
  }
}

export default UpdateGen;

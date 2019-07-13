const db = require("../models/index.js");

class WorkoutController {

    getBikeById(req, res) {
        db.Bikes.findOne({
            where: {

            }
        })
        .then((bike) => {
            res.json(bike);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getAllWorkoutsByUserId(req, res) {
        db.Workouts.findAll({
            where: {
                userId: req.params.userId,
            }
        })
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getAllWorkouts(req, res) {
        db.Workouts.findAll({})
            .then((workouts) => {
                res.json(workouts);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    createWorkout(req, res) {
        db.Workouts.create(req.body.workoutData)
            .then((workout) => {
                res.json(workout);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteWorkoutById(req, res) {
        db.Workouts.destroy({
            where: {
                userId: req.query.userId,
                id: req.query.workoutId,
            }})
            .then((workout) => {
                res.json(workout);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = WorkoutController;
const db = require("../models/index.js");
const sequelize = require("sequelize");

class WorkoutController {

    setTtlMins(req, res) {
        db.Workouts.update(
            {ttlMins: req.body.ttlMins},
            {where: {
                id: req.body.workoutId,
            }}
        )
        .then((wrkt) => {
            res.json(wrkt);
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
            }
        })
            .then((workout) => {
                res.json(workout);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = WorkoutController;
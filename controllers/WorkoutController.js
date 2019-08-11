const db = require("../models/index.js");

class WorkoutController {

    getAllWorkoutsByUserId(req, res) {
        db.Workouts.findAll({
            where: {
                userId: req.params.userId,
            },
            order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
        })
            .then((workouts) => {
                res.json(workouts);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getAllWorkouts(req, res) {
        db.Workouts.findAll({
                order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
            })
            .then((workouts) => {
                res.json(workouts);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getRecentWorkouts(req, res) {
        db.Workouts.findAll({
                limit: 10,
                order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
            })
            .then((workouts) => {
                res.json(workouts);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getRecentWorkoutsByUserId(req, res) {
        db.Workouts.findAll({
            where: {
                userId: req.params.userId,
            },
            limit: 10,
            order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
            })
            .then((workouts) => {
                res.json(workouts);

            })
            .catch((err) => {
                console.log(err);
            });
    }

    getRunsByUserId(req, res) {
        db.Workouts.findAll({
            where: {
                userId: req.params.userId,
                workoutType: 'run',
            },
            order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
        })
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getRunById(req, res) {
        db.Workouts.findOne({
            where: {
                id: req.params.runId,
            },
            order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
        })
        .then((run) => {
            res.json(run);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getBikesByUserId(req, res) {
        db.Workouts.findAll({
            where: {
                userId: req.params.userId,
                workoutType: 'bike',
            },
            order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
        })
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getSwimsByUserId(req, res) {
        db.Workouts.findAll({
            where: {
                userId: req.params.userId,
                workoutType: 'swim',
            },
            order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
        })
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getLiftsByUserId(req, res) {
        db.Workouts.findAll({
            where: {
                userId: req.params.userId,
                workoutType: 'lift',
            },
            order: [[ 'date', 'DESC' ], [ 'id', 'DESC' ]],
        })
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

    updateWorkout(req, res) {
        db.Workouts.update(
            req.body.workout,
            { where: {
                id: req.body.id,
            }})
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
const db = require("../models/index.js");
const sequelize = require("sequelize");

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
            }
        })
            .then((workout) => {
                res.json(workout);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // HALL OF FAME QUERIES

    getMaxWorkouts(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS workouts, firstName FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(max => {
                res.json(max);
            });
    }

    getLongestRun(req, res) {
        db.sequelize.query("SELECT MAX(distance) AS distance, firstName FROM workouts WHERE workoutType = 'run'", { type: sequelize.QueryTypes.SELECT })
            .then(run => {
                res.json(run);
            });
    }

    getMaxClimb(req, res) {
        db.sequelize.query("SELECT MAX(climb) AS climb, firstName FROM workouts", { type: sequelize.QueryTypes.SELECT })
            .then(climb => {
                res.json(climb);
            });
    }

    getMaxPushups(req, res) {
        db.sequelize.query("SELECT MAX(pushups) AS pushups, firstName FROM workouts", { type: sequelize.QueryTypes.SELECT })
            .then(pushups => {
                res.json(pushups);
            });
    }

    getMaxPullups(req, res) {
        db.sequelize.query("SELECT MAX(pullups) AS pullups, firstName FROM workouts", { type: sequelize.QueryTypes.SELECT })
            .then(pullups => {
                res.json(pullups);
            });
    }

    getMaxGoggins(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS goggins, firstName FROM workouts WHERE generator = 'Goggins'", { type: sequelize.QueryTypes.SELECT })
            .then(goggins => {
                res.json(goggins);
            });
    }

    getMaxRaces(req, res) {
        db.sequelize.query("SELECT COUNT(race) AS race, firstName FROM workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(races => {
                res.json(races);
            });
    }

    getTotalTime(req, res) {
        db.sequelize.query("", { type: sequelize.QueryTypes.SELECT })
            .then(time => {
                res.json(time);
            });
    }
}

module.exports = WorkoutController;
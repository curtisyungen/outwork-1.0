const db = require("../models/index.js");
const sequelize = require("sequelize");

class HofController {

    getHof(req, res) {
        db.Hof.findAll({})
            .then((hof) => {
                res.json(hof);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getMaxWorkouts(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS workouts, firstName, userId FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(max => {
                res.json(max);
            });
    }

    getLongestRun(req, res) {
        db.sequelize.query("SELECT MAX(distance) AS distance, firstName, userId FROM Workouts WHERE workoutType = 'run'", { type: sequelize.QueryTypes.SELECT })
            .then(run => {
                res.json(run);
            });
    }

    getMaxClimb(req, res) {
        db.sequelize.query("SELECT MAX(climb) AS climb, firstName, userId FROM Workouts", { type: sequelize.QueryTypes.SELECT })
            .then(climb => {
                res.json(climb);
            });
    }

    getMaxPushups(req, res) {
        db.sequelize.query("SELECT MAX(pushups) AS pushups, firstName, userId FROM Workouts", { type: sequelize.QueryTypes.SELECT })
            .then(pushups => {
                res.json(pushups);
            });
    }

    getMaxPullups(req, res) {
        db.sequelize.query("SELECT MAX(pullups) AS pullups, firstName, userId FROM Workouts", { type: sequelize.QueryTypes.SELECT })
            .then(pullups => {
                res.json(pullups);
            });
    }

    getMaxGoggins(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS goggins, firstName, userId FROM Workouts WHERE generator = 'Goggins'", { type: sequelize.QueryTypes.SELECT })
            .then(goggins => {
                res.json(goggins);
            });
    }

    getMaxRaces(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS race, firstName, userId FROM Workouts WHERE runType = 'Race' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(races => {
                res.json(races);
            });
    }

    getTotalTime(req, res) {
        db.sequelize.query("SELECT id, firstName, duration, userId FROM Workouts", { type: sequelize.QueryTypes.SELECT })
            .then(time => {
                res.json(time);
            });
    }

    getRainyDays(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS days, firstName, userId FROM Workouts WHERE weather = 'Heavy Rain'", { type: sequelize.QueryTypes.SELECT })
            .then(days => {
                res.json(days);
            });
    }

    getSwims(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS swims, firstName, userId FROM Workouts WHERE workoutType = 'swim'", { type: sequelize.QueryTypes.SELECT })
            .then(swims => {
                res.json(swims);
            });
    }

    getHotdog(req, res) {
        db.sequelize.query("SELECT id AS days, firstName, milePace, userId FROM Workouts WHERE weather = 'Sunny'", { type: sequelize.QueryTypes.SELECT })
            .then(days => {
                res.json(days);
            });
    }

    updateHof(req, res) {
        db.Hof.update(
            {
                userName: req.body.userName,
                value: req.body.value
            },
            {where: {
                award: req.body.award
            }})
            .then((awards) => {
                res.json(awards);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = HofController;
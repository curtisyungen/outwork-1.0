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
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(max => {
                res.json(max);
            });
    }

    getLongestRun(req, res) {
        db.sequelize.query("SELECT distance AS value, firstName, userId FROM Workouts WHERE workoutType = 'run'", { type: sequelize.QueryTypes.SELECT })
            .then(run => {
                res.json(run);
            });
    }

    getMaxClimb(req, res) {
        db.sequelize.query("SELECT climb AS value, firstName, userId FROM Workouts", { type: sequelize.QueryTypes.SELECT })
            .then(climb => {
                res.json(climb);
            });
    }

    getMaxPushups(req, res) {
        db.sequelize.query("SELECT pushups AS value, firstName, userId FROM Workouts", { type: sequelize.QueryTypes.SELECT })
            .then(pushups => {
                res.json(pushups);
            });
    }

    getMaxPullups(req, res) {
        db.sequelize.query("SELECT pullups AS value, firstName, userId FROM Workouts", { type: sequelize.QueryTypes.SELECT })
            .then(pullups => {
                res.json(pullups);
            });
    }

    getMaxGoggins(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts WHERE generator = 'Goggins' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(goggins => {
                res.json(goggins);
            });
    }

    getMaxRaces(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts WHERE runType = 'Race' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(races => {
                res.json(races);
            });
    }

    getTotalTime(req, res) {
        db.sequelize.query("SELECT id AS value, firstName, duration, userId FROM Workouts", { type: sequelize.QueryTypes.SELECT })
            .then(time => {
                res.json(time);
            });
    }

    getRainyDays(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts WHERE weather = 'Heavy Rain' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(days => {
                res.json(days);
            });
    }

    getSwims(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts WHERE workoutType = 'swim'", { type: sequelize.QueryTypes.SELECT })
            .then(swims => {
                res.json(swims);
            });
    }

    getHotdog(req, res) {
        db.sequelize.query("SELECT id AS value, firstName, milePace, userId FROM Workouts WHERE weather = 'Sunny'", { type: sequelize.QueryTypes.SELECT })
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
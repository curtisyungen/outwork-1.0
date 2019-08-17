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

    getWeekWorkouts(req, res) {
        db.sequelize.query(`SELECT COUNT(id) AS value, firstName FROM Workouts WHERE date >= '${req.params.date}' GROUP BY firstName`, { type: sequelize.QueryTypes.SELECT })
            .then(workouts => {
                res.json(workouts);
            });
    }

    getWeekPushUps(req, res) {
        db.sequelize.query(`SELECT SUM(pushups) AS value, firstName FROM Workouts WHERE date >= '${req.params.date}' GROUP BY firstName`, { type: sequelize.QueryTypes.SELECT })
            .then(pushups => {
                res.json(pushups);
            });
    }

    getWeekPullUps(req, res) {
        db.sequelize.query(`SELECT SUM(pullups) AS value, firstName FROM Workouts WHERE date >= '${req.params.date}' GROUP BY firstName`, { type: sequelize.QueryTypes.SELECT })
            .then(pullups => {
                res.json(pullups);
            });
    }

    getWeekClimb(req, res) {
        db.sequelize.query(`SELECT SUM(climb) AS value, firstName FROM Workouts WHERE date >= '${req.params.date}' GROUP BY firstName`, { type: sequelize.QueryTypes.SELECT })
            .then(climb => {
                res.json(climb);
            });
    }

    getWeekTime(req, res) {
        db.sequelize.query(`SELECT SUM(ttlMins) AS value, firstName FROM Workouts WHERE date >= '${req.params.date}' GROUP BY firstName`, { type: sequelize.QueryTypes.SELECT })
            .then(time => {
                res.json(time);
            });
    }

    getMaxWorkouts(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(max => {
                res.json(max);
            });
    }

    getMaxRestDays(req, res) {
        db.sequelize.query("SELECT COUNT(DISTINCT date) as value, firstName FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(days => {
                res.json(days);
            });
    }

    getLongestRun(req, res) {
        db.sequelize.query("SELECT MAX(distance) AS value, firstName, userId FROM Workouts WHERE workoutType = 'run' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(run => {
                res.json(run);
            });
    }

    getMaxMiles(req, res) {
        db.sequelize.query("SELECT SUM(distance) AS value, firstName, userId FROM Workouts WHERE workoutType = 'run' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(miles => {
                res.json(miles);
            });
    }

    getMaxClimb(req, res) {
        db.sequelize.query("SELECT SUM(climb) AS value, firstName, userId FROM Workouts WHERE workoutType = 'run' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(climb => {
                res.json(climb);
            });
    }

    getMaxPushups(req, res) {
        db.sequelize.query("SELECT MAX(pushups) AS value, firstName, userId FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(pushups => {
                res.json(pushups);
            });
    }

    getMaxPullups(req, res) {
        db.sequelize.query("SELECT MAX(pullups) AS value, firstName, userId FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
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
        db.sequelize.query("SELECT SUM(ttlMins) AS value, firstName, userId FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(time => {
                res.json(time);
            });
    }

    getRainyDays(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts WHERE weather = 'Heavy Rain' OR weather = 'Light Rain' OR weather = 'Rainy' OR weather = 'Snowy' OR weather = 'Shitstorm' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(days => {
                res.json(days);
            });
    }

    getSwims(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts WHERE workoutType = 'swim' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(swims => {
                res.json(swims);
            });
    }

    getBikes(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName, userId FROM Workouts WHERE workoutType = 'bike' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(bikes => {
                res.json(bikes);
            });
    }

    getHotdog(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS value, firstName FROM Hofs WHERE award != 'hotdog' AND firstName != 'NULL' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(hofs => {
                res.json(hofs);
            });
    }

    updateHof(req, res) {
        db.Hof.update(
            {
                firstName: req.body.firstName,
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
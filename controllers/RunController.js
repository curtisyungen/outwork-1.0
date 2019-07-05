const db = require("../models/index.js");

class RunController {

    getRunById(req, res) {
        db.Runs.findOne({
            where: {
                id: req.body.id,
            }
        })
        .then((run) => {
            res.json(run);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getRunsByUser(req, res) {
        db.Runs.findAll({
            where: {
                userId: req.params.userId,
            }
        })
        .then((runs) => {
            res.json(runs);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    createRun(req, res) {
        db.Runs.create(req.body.runData)
        .then((run) => {
            res.json(run);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    updateRunById(req, res) {
        db.Runs.update(
            req.body,
            {where: {
                id: req.body.id,
                userId: req.body.userId,
            }}
        )
        .then((run) => {
            res.json(run);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteRunById(req, res) {
        db.Runs.destroy({
            where: {
                id: req.params.runId,
                userId: req.params.userId,
            }
        })
        .then((run) => {
            res.json(run);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = RunController;
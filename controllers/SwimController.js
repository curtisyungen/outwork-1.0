const db = require("../models/index.js");

class SwimController {

    getSwimById(req, res) {
        db.Swims.findOne({
            where: {

            }
        })
        .then((swim) => {
            res.json(swim);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getSwimsByUser(req, res) {
        db.Swims.findAll({
            where: {
                userId: req.body.userId,
            }
        })
        .then((swims) => {
            res.json(swims);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    createSwim(req, res) {
        db.Swims.create(req.body.swimData)
        .then((swim) => {
            res.json(swim);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    updateSwimById(req, res) {
        db.Swims.update(
            req.body,
            { where: {
                id: req.body.id,
                userId: req.body.userId,
            }}
        )
        .then((swim) => {
            res.json(swim);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteSwimById(req, res) {
        db.Swims.destroy({
            where: {
                id: req.body.id,
                userId: req.body.userId,
            }
        })
        .then((swim) => {
            res.json(swim);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = SwimController;
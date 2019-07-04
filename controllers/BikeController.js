const db = require("../models/index.js");

class BikeController {

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

    getBikesByUser(req, res) {
        db.Bikes.findAll({
            where: {
                userId: req.body.userId,
            }
        })
        .then((bikes) => {
            res.json(bikes);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    createBike(req, res) {
        db.Bikes.create(req.body.bikeData)
        .then((bike) => {
            res.json(bike);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    updateBikeById(req, res) {
        db.Bikes.update(
            req.body,
            { where: {
                id: req.body.id,
                userId: req.body.userId,
            }}
        )
        .then((bike) => {
            res.json(bike);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteBikeById(req, res) {
        db.Bikes.destroy({
            where: {
                id: req.body.id,
                userId: req.body.userId,
            }
        })
        .then((bike) => {
            res.json(bike);
        })
        .catch((err) => {
            console.log(err);
        });
    }

}

module.exports = BikeController;
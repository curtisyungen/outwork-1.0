const db = require("../models/index.js");
const sequelize = require("sequelize");

class ShoeController {

    getShoesByUserId(req, res) {
        db.Shoes.findAll({
            where: {
                userId: req.params.userId,
            }
        })
        .then((shoes) => {
            res.json(shoes);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getShoeMiles(req, res) {
        db.sequelize.query("SELECT SUM(miles), shoe, userId FROM Shoes GROUP BY userId", { type: sequelize.QueryTypes.SELECT })
            .then(shoe => {
                res.json(shoe);
            });
    }

    addShoe(req, res) {
        db.Shoes.create(req.body)
        .then((shoe) => {
            res.json(shoe);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteShoe(req, res) {
        db.Shoes.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then((shoes) => {
            res.json(shoes);
        })
        .catch((err) => {
            console.log(err);
        });
    }

}

module.exports = ShoeController;
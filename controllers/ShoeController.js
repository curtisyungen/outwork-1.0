const db = require("../models/index.js");

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

}

module.exports = ShoeController;
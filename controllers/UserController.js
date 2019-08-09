const db = require("../models/index.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");

class UserController {

    loginUser(req, res) {
        db.Users.findOne({
            where: {
                email: req.query.email,
            }
        })
        .then((user) => {
            bcrypt.compare(req.query.password, user.password, function(err, result) {
                if (result === true) {
                    res.json(user);
                }
                else {
                    res.json("Incorrect password.");
                }
            });
        });
    }

    getUser(req, res) {
        db.Users.findAll({
            where: {
                email: req.params.email,
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getUserById(req, res) {
        db.Users.findAll({
            where: {
                userId: req.params.userId,
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getAllUsers(req, res) {
        db.Users.findAll({})
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    searchForUser(req, res) {
        db.Users.findAll({
            where: {
                [Op.or]: [
                    {
                        firstName: {
                            [Op.like]: '%' + req.params.userName + '%'
                        }
                    },
                    {
                        lastName: {
                            [Op.like]: '%' + req.params.userName + '%'
                        }
                    },
                ]
            }
        })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    createUser(req, res) {
        bcrypt.genSalt(11, function (err, salt) {
            if (err) {
                return console.log(err);
            }

            bcrypt.hash(req.body.password, salt, function(err, hash) {
                db.Users.create({
                    userId: req.body.userId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                })
                .then((user) => {
                    res.json(user);
                })
                .catch((err) => {
                    console.log(err);
                });
            });
        });
    }

    updatePassword(req, res) {
        bcrypt.genSalt(11, function (err, salt) {
            if (err) {
                return console.log(err);
            }

            bcrypt.hash(req.body.password, salt, function(err, hash) {
                db.Users.update(
                    {password: hash},
                    {where: {
                        email: req.body.email,
                    }})
                    .then((user) => {
                        res.json(user);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        });
    }

    updateEquipment(req, res) {
        db.Users.update(
            {equipment: req.body.equipment},
            {where: {
                userId: req.body.userId,
            }})
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteUser(req, res) {
        db.Users.destroy({
            where: {
                userId: req.body.userId,
                email: req.body.email,
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = UserController;
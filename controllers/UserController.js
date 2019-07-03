const db = require("../models/index.js");
// const bcrypt = require("bcrypt");

class UserController {

    loginUser(req, res) {
        db.Users.findOne({
            where: {
                email: req.params.email,
                password: req.params.password,
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getUser(req, res) {
        db.Users.findOne({
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
        db.Users.findOne({
            where: {
                userId: req.body.userId,
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    createUser(req, res) {
        // bcrypt.genSalt(11, function (err, salt) {
        //     if (err) {
        //         return console.log(err);
        //     }

        //     bcrypt.hash(req.body.password, salt, function(err, hash) {
                db.Users.create({
                    userId: req.body.userId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    weight: req.body.weight,
                    privacy: req.body.privacy,
                })
                .then((user) => {
                    res.json(user);
                })
                .catch((err) => {
                    console.log(err);
                });
        //     });
        // });
    }

    updatePassword(req, res) {
        // bcrypt.genSalt(11, function (err, salt) {
        //     if (err) {
        //         return console.log(err);
        //     }

        //     bcrypt.hash(req.body.password, salt, function(err, hash) {
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
        //     });
        // });
    }

    updateWeight(req, res) {
        db.Users.update(
            {weight: req.body.weight},
            {where: {
                email: req.body.email,
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

    followUser(req, res) {
        db.Users.update(
            {following: req.body.following},
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
}

module.exports = UserController;
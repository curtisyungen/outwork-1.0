const db = require("../models/index.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class ExerciseController {

    getExercise(req, res) {
        db.Exercises.findOne({
            where: {
                id: req.body.id,
                name: req.body.name,
            }
        })
        .then((exercise) => {
            res.json(exercise);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getAllExercises(req, res) {
        db.Exercises.findAll({})
            .then((exercises) => {
                res.json(exercises);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getExerciseByPMG(req, res) {
        db.Exercises.findAll({
            where: {
                primaryMG: req.body.primaryMG,
            }
        })
            .then((exercises) => {
                res.json(exercises);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getExerciseByEquip(req, res) {
        db.Exercises.findAll({
            where: {
                [Op.or]: [
                    {
                        equipment: {
                            [Op.like]: '%' + req.body.equipment + '%'
                        }
                    }
                ]
            }
        })
        .then((exercises) => {
            res.json(exercises);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    createExercise(req, res) {
        db.Exercises.create({

        })
        .then((exercise) => {
            res.json(exercise);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    updateExerciseById(req, res) {
        db.Exercises.update(
            req.body,
            { where: {
                id: req.body.id,
                name: req.body.name,
            }}
        )
        .then((exercise) => {
            res.json(exercise);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteExerciseById(req, res) {
        db.Exercises.destroy({
            where: {
                id: req.body.id,
                name: req.body.name,
            }
        })
        .then((exercise) => {
            res.json(exercise);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = ExerciseController;
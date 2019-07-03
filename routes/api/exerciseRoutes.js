const router = require("express").Router();
const ExerciseController = require("../../controllers/ExerciseController");
const controller = new ExerciseController();

router.get("/getExercise", (req, res) => {
    controller.getExercise(req, res);
});

router.get("/getAllExercises", (req, res) => {
    controller.getExercise(req, res);
});

router.get("/getExerciseByPMG", (req, res) => {
    controller.getExerciseByPMG(req, res);
});

router.get("/getExerciseByEquip", (req, res) => {
    controller.getExerciseByEquip(req, res);
});

router.post("/createExercise", (req, res) => {
    controller.createExercise(req, res);
});

router.put("/updateExerciseById", (req, res) => {
    controller.updateExerciseById(req, res);
});

router.delete("/deleteExerciseById", (req, res) => {
    controller.deleteExerciseById(req, res);
});

module.exports = router;

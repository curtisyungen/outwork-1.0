const router = require("express").Router();
const ExerciseController = require("../../controllers/ExerciseController");
const controller = new ExerciseController();

router.get("/getExercise", (req, res) => {
    controller.getExercise(req, res);
});

router.post("/createExercise", (req, res) => {
    controller.createExercise(req, res);
});

router.put("/updateExercise", (req, res) => {
    controller.updateExercise(req, res);
});

router.delete("/deleteExercise", (req, res) => {
    controller.deleteExercise(req, res);
});

module.exports = router;

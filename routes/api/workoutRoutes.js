const router = require("express").Router();
const WorkoutController = require("../../controllers/WorkoutController");
const controller = new WorkoutController();

router.get("/getAllWorkoutsByUserId/:userId", (req, res) => {
    controller.getAllWorkoutsByUserId(req, res);
});

router.get("/getAllWorkouts", (req, res) => {
    controller.getAllWorkouts(req, res);
});

router.post("/createWorkout", (req, res) => {
    controller.createWorkout(req, res);
});

router.delete("/deleteWorkoutById", (req, res) => {
    controller.deleteWorkoutById(req, res);
});

router.put("/setTtlMins", (req, res) => {
    controller.setTtlMins(req, res);
});

module.exports = router;

const router = require("express").Router();
const WorkoutController = require("../../controllers/WorkoutController");
const controller = new WorkoutController();

router.get("/getAllWorkoutsByUserId/:userId", (req, res) => {
    controller.getAllWorkoutsByUserId(req, res);
});

router.get("/getAllWorkouts", (req, res) => {
    controller.getAllWorkouts(req, res);
});

router.get("/getRecentWorkouts", (req, res) => {
    controller.getRecentWorkouts(req, res);
});

router.get("/getRecentWorkoutsByUserId/:userId", (req, res) => {
    controller.getRecentWorkoutsByUserId(req, res);
});

router.post("/createWorkout", (req, res) => {
    controller.createWorkout(req, res);
});

router.put("/updateworkout", (req, res) => {
    controller.updateWorkout(req, res);
});

router.delete("/deleteWorkoutById", (req, res) => {
    controller.deleteWorkoutById(req, res);
});

module.exports = router;

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

// HALL OF FAME

router.get("/getMaxWorkouts", (req, res) => {
    controller.getMaxWorkouts(req, res);
});

router.get("/getMinWorkouts", (req, res) => {
    controller.getMinWorkouts(req, res);
});

router.get("/getLongestRun", (req, res) => {
    controller.getLongestRun(req, res);
});

router.get("/getMaxClimb", (req, res) => {
    controller.getMaxClimb(req, res);
});

router.get("/getMaxPushups", (req, res) => {
    controller.getMaxPushups(req, res);
});

router.get("/getMaxPullups", (req, res) => {
    controller.getMaxPullups(req, res);
});

router.get("/getMaxGoggins", (req, res) => {
    controller.getMaxGoggins(req, res);
});

router.get("/getMaxRaces", (req, res) => {
    controller.getMaxRaces(req, res);
});

router.get("/getTotalTime", (req, res) => {
    controller.getTotalTime(req, res);
});

module.exports = router;

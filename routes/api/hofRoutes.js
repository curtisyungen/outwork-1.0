const router = require("express").Router();
const HofController = require("../../controllers/HofController");
const controller = new HofController();

// HALL OF FAME

// GET ROUTES

router.get("/getHof", (req, res) => {
    controller.getHof(req, res);
});

router.get("/getMaxWorkouts", (req, res) => {
    controller.getMaxWorkouts(req, res);
});

router.get("/getMaxRestDays", (req, res) => {
    controller.getMaxRestDays(req, res);
});

router.get("/getLongestRun", (req, res) => {
    controller.getLongestRun(req, res);
});

router.get("/getMaxMiles", (req, res) => {
    controller.getMaxMiles(req, res);
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

router.get("/getRainyDays", (req, res) => {
    controller.getRainyDays(req, res);
});

router.get("/getSwims", (req, res) => {
    controller.getSwims(req, res);
});

router.get("/getBikes", (req, res) => {
    controller.getBikes(req, res);
});

router.get("/getHotdog", (req, res) => {
    controller.getHotdog(req, res);
});

// PUT ROUTES

router.put("/updateHof", (req, res) => {
    controller.updateHof(req, res);
});

module.exports = router;

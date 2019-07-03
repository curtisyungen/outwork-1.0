const router = require("express").Router();
const RunController = require("../../controllers/RunController");
const controller = new RunController();

router.get("/getRun", (req, res) => {
    controller.getRun(req, res);
});

router.post("/createRun", (req, res) => {
    controller.createRun(req, res);
});

router.put("/updateRun", (req, res) => {
    controller.updateRun(req, res);
});

router.delete("/deleteRun", (req, res) => {
    controller.deleteRun(req, res);
});

module.exports = router;

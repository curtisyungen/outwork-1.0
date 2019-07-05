const router = require("express").Router();
const RunController = require("../../controllers/RunController");
const controller = new RunController();

router.get("/getRunById", (req, res) => {
    controller.getRunById(req, res);
});

router.get("/getRunsByUser/:userId", (req, res) => {
    controller.getRunsByUser(req, res);
});

router.post("/createRun", (req, res) => {
    controller.createRun(req, res);
});

router.put("/updateRunById", (req, res) => {
    controller.updateRunById(req, res);
});

router.delete("/deleteRunById", (req, res) => {
    controller.deleteRunById(req, res);
});

module.exports = router;

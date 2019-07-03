const router = require("express").Router();
const ResetController = require("../../controllers/ResetController");
const controller = new ResetController();

router.post("/setResetCode", (req, res) => {
    controller.setResetCode(req, res);
});

router.post("/sendPasswordResetCode", (req, res) => {
    controller.sendPasswordResetCode(req, res);
});

router.get("/submitResetCode", (req, res) => {
    controller.submitResetCode(req, res);
});

router.delete("/clearResetCode/:email", (req, res) => {
    controller.clearResetCode(req, res);
});

module.exports = router;
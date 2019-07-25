const router = require("express").Router();
const ShoeController = require("../../controllers/ShoeController");
const controller = new ShoeController();

router.get("/getShoesByUserId/:userId", (req, res) => {
    controller.getShoesByUserId(req, res);
});

module.exports = router;
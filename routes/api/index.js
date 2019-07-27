const path = require("path");
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const exerciseRoutes = require("./exerciseRoutes");
const workoutRoutes = require("./workoutRoutes");
const shoeRoutes = require("./shoeRoutes");
const hofRoutes = require("./hofRoutes");
const resetRoutes = require("./resetRoutes");

// User routes
router.use("/users", userRoutes);

// Workout routes
router.use("/workouts", workoutRoutes);

// Exercise routes
router.use("/exercises", exerciseRoutes);

// Shoe routes
router.use("/shoes", shoeRoutes);

// Hall of Fame routes
router.use("/hof", hofRoutes);

// Reset routes
router.use("/reset", resetRoutes);

// For anything else, render the html page
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;

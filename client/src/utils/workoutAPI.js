import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Workout-related API calls

export default {

    getAllWorkoutsByUserId: function(userId) {
        return axios.get("/api/workouts/getAllWorkoutsByUserId/" + userId);
    },

    getAllWorkouts: function(userId) {
        return axios.get("/api/workouts/getAllWorkouts");
    },

    createWorkout: function(workoutData) {
        return axios.post("/api/workouts/createWorkout", {workoutData: workoutData});
    },

    deleteWorkoutById: function(userId, workoutId) {
        return axios.delete("/api/workouts/deleteWorkoutById", {params: {userId: userId, workoutId: workoutId}});
    },
}

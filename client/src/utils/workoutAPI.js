import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Workout-related API calls

export default {

    getAllWorkoutsByUserId: function(userId) {
        return axios.get("/api/workouts/getAllWorkoutsByUserId/" + userId);
    },

    getAllWorkouts: function() {
        return axios.get("/api/workouts/getAllWorkouts");
    },

    getRecentWorkouts: function() {
        return axios.get("/api/workouts/getRecentWorkouts");
    },

    getRecentWorkoutsByUserId: function(userId) {
        return axios.get("/api/workouts/getRecentWorkoutsByUserId/" + userId);
    },

    getRunsByUserId: function(userId) {
        return axios.get("/api/workouts/getRunsByUserId/" + userId);
    },

    getRunById: function(runId) {
        return axios.get("/api/workouts/getRunById/" + runId);
    },

    getBikesByUserId: function(userId) {
        return axios.get("/api/workouts/getBikesByUserId/" + userId);
    },

    getSwimsByUserId: function(userId) {
        return axios.get("/api/workouts/getSwimsByUserId/" + userId);
    },

    getLiftsByUserId: function(userId) {
        return axios.get("/api/workouts/getLiftsByUserId/" + userId);
    },

    createWorkout: function(workoutData) {
        return axios.post("/api/workouts/createWorkout", {workoutData: workoutData});
    },

    updateWorkout: function(id, workout) {
        return axios.put("/api/workouts/updateWorkout", { id: id, workout: workout });
    },

    deleteWorkoutById: function(userId, workoutId) {
        return axios.delete("/api/workouts/deleteWorkoutById", {params: {userId: userId, workoutId: workoutId}});
    },

    setTtlMins: function(workoutId, ttlMins) {
        return axios.put("/api/workouts/setTtlMins", {workoutId: workoutId, ttlMins: ttlMins });
    }
}

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

    getMaxWorkouts: function() {
        return axios.get("/api/workouts/getMaxWorkouts");
    },

    getMinWorkouts: function() {
        return axios.get("/api/workouts/getMinWorkouts");
    },

    getLongestRun: function() {
        return axios.get("/api/workouts/getLongestRun");
    },

    getMaxClimb: function() {
        return axios.get("/api/workouts/getMaxClimb");
    },

    getMaxPushups: function() {
        return axios.get("/api/workouts/getMaxPushups");
    },

    getMaxPullups: function() {
        return axios.get("/api/workouts/getMaxPullups");
    },

    getMaxGoggins: function() {
        return axios.get("/api/workouts/getMaxGoggins");
    },

    getMaxRaces: function() {
        return axios.get("/api/workouts/getMaxRaces");
    },

    getTotalTime: function() {
        return axios.get("/api/workouts/getTotalTime");
    },
}

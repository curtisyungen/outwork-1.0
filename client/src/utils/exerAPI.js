import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Exercise-related API calls

export default {

    getExercise: function(exerId, exerName) {
        return axios.get("/api/exercises/getExercise", {id: exerId, name: exerName});
    },

    getAllExercises: function() {
        return axios.get("/api/exercises/getAllExercises");
    },

    getEquipment: function() {
        return axios.get("/api/exercises/getEquipment");
    },

    getExerciseByPMG: function(primaryMG) {
        return axios.get("/api/exercises/getExercisesByPMG", {primaryMG: primaryMG});
    },

    getExerciseByEquip: function(equip) {
        return axios.get("/api/exercises/getExerciseByEquip", {equip: equip});
    },

    createExercise: function(exercise) {
        return axios.post("/api/exercises/createExercise", exercise);
    },

    updateExerciseById: function(exerId, exercise) {
        return axios.put("/api/exercises/updateExerciseById", {exerId: exerId, exercise: exercise});
    },

    deleteExerciseById: function(exerId, exerName) {
        return axios.delete("/api/exercises/deleteExerciseById", {exerId: exerId, exerName: exerName});
    },
}
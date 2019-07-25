import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Shoe-related API calls

export default {

    getShoesByUserId: function(userId) {
        return axios.get("/api/shoes/getShoesByUserId/" + userId);
    },
}

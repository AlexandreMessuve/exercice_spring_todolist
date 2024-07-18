import axios from 'axios';
import {API_URL} from "../../constant/urlBack.js";

const api =  axios.create({
    baseURL: API_URL,
})

export default api;
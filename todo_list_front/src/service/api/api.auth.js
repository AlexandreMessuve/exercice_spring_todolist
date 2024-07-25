import api from "./api";
import {URL_LOGIN, URL_REGISTER} from "../../constant/urlBack.js";

export function authenticate(values) {
    return api.post(URL_LOGIN, values);
}
export function register(values) {
    return api.post(URL_REGISTER, values);
}
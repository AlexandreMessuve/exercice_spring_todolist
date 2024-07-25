import * as YUP from 'yup';
import {REGEX_USER_PASSWORD, REGEX_USER_EMAIL} from "../../constant/regex.js";

export default YUP.object().shape({
    email: YUP.string().email('email is not valid example: exemple@exemple.com').matches(REGEX_USER_EMAIL, 'email is not valid example: exemple@exemple.com').required('Email is required'),
    password: YUP.string().matches(REGEX_USER_PASSWORD, 'Password must have at least 8 characters and must contain one lower case, one upper case & one numeric').required('Password is required')
})
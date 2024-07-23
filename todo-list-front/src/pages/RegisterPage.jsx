import {RegisterComponent} from "../components/auth/RegisterComponent.jsx";
import {useSelector} from "react-redux";
import {selectIsLogged} from "../redux-store/authenticationSlice.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {URL_HOME} from "../constant/urlFront.js";

const RegisterPage = () => {
    const isAuth = useSelector(selectIsLogged);
    const navigate = useNavigate();
    useEffect(()=> {
        if (isAuth){
            navigate(URL_HOME)
        }
    })
    return (
            <RegisterComponent />
    );
};

export default RegisterPage;
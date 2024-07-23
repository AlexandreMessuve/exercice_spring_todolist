import {LoginComponent} from "../components/auth/LoginComponent.jsx";
import {useSelector} from "react-redux";
import {selectIsLogged} from "../redux-store/authenticationSlice.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {URL_HOME} from "../constant/urlFront.js";

const LoginPage = () => {
    const isAuth = useSelector(selectIsLogged);
    const navigate = useNavigate();
    useEffect(()=> {
        if (isAuth){
            navigate(URL_HOME)
        }
    })
    return (
            <LoginComponent />
    );
};

export default LoginPage;
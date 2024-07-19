import {Outlet, useNavigate} from "react-router-dom";
import './index.css';
import {URL_LOGIN} from "./constant/urlFront.js";
import {selectHasRole, selectIsLogged, selectToken, signIn, signOut} from "./redux-store/authenticationSlice.js";
import {useEffect, useState} from "react";
import {getToken, isTokenValid} from "./service/jwtTokenService.js";
import {useDispatch, useSelector} from "react-redux";
import {ROLE_ADMIN} from "./constant/roles.js";
import NavBar from "./components/layout/NavBar.jsx";

function App() {
    const isLogged = useSelector(selectIsLogged);
    const token = useSelector(selectToken);
    const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const token = getToken();
        if (token) dispatch(signIn(token));
        setIsLogin(false);
    }, [])

    useEffect(() => {
        setInterval(() => {
            if (token){
                if (!isTokenValid(token)) {
                    handleLogout()
                }
            }
        }, 1000)
    }, [token])
    const handleLogout = () => {
        dispatch(signOut());
        navigate(URL_LOGIN);
    }

    if (isLogin) return null;

    return (
        <>
            {
                isLogged ? (
                    <>
                        <header>
                           <NavBar isAdmin={isAdmin} handleLogout={handleLogout} />
                        </header>
                    </>
                ) : (
                    <>
                    </>
                )
            }
            <Outlet/>
        </>
    )
}

export default App

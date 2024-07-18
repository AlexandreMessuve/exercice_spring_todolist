import {Link, Outlet, useNavigate} from "react-router-dom";
import './index.css';
import {URL_CREATE_TODO, URL_HOME, URL_LOGIN, URL_REGISTER, URL_TODO} from "./constant/urlFront.js";
import {selectHasRole, selectIsLogged, selectToken, signIn, signOut} from "./redux-store/authenticationSlice.js";
import {useEffect, useState} from "react";
import {getToken, isTokenValid} from "./service/jwtTokenService.js";
import {useDispatch, useSelector} from "react-redux";
import {ROLE_ADMIN} from "./constant/roles.js";
import {getTodos} from "./redux-store/todoSlice.js";

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
            <header>
                <nav className={'text-center'}>
                    {isLogged ? (
                        <>
                            <Link className={'mx-2'} to={URL_HOME}>Home</Link>
                            {isAdmin ? (
                                <>
                                    <Link className={'mx-2'} to={URL_CREATE_TODO}>Create todo</Link>
                                </>
                            ):(
                                <>
                                </>
                            )}


                            <Link className={'mx-2'} to={"#"} onClick={handleLogout}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link className={'mx-2'} to={URL_LOGIN}>Login</Link>
                            <Link className={'mx-2'} to={URL_REGISTER}>Register</Link>
                        </>
                    )}
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default App

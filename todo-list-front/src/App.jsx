import {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {URL_LOGIN} from "./constant/urlFront.js";
import {selectHasRole, selectIsLogged, selectToken, signIn, signOut} from "./redux-store/authenticationSlice.js";
import {getToken, isTokenValid} from "./service/jwtTokenService.js";
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
                console.log(token)
                console.log('oui')
                if (!isTokenValid(token)) {
                    handleLogout()
                }
            }
        }, 1000)
    }, [token])
    const handleLogout = () => {
        dispatch(signOut());
        toast.success('Bye bye !')
        navigate(URL_LOGIN);
    }

    if (isLogin) return null;

    return (
        <>
            <div className={"min-h-screen bg-gray-50 dark:bg-gray-900"}>
                {
                    isLogged ? (
                        <>
                            <header className={"border-b-2 border-b-gray-900 dark:border-b-gray-200"}>
                                <NavBar isAdmin={isAdmin} handleLogout={handleLogout} />
                            </header>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
                <Outlet/>
                <ToastContainer position={'bottom-right'}/>
            </div>

        </>
    )
}

export default App

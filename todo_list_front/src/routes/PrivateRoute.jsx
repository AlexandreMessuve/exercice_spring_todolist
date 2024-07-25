import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {URL_HOME, URL_LOGIN} from "../constant/urlFront.js";
import {selectHasRole, selectIsLogged} from "../redux-store/authenticationSlice.js";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children, roles }) => {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsLogged);
    const hasRole = useSelector((state) => selectHasRole(state, roles));
    if (!isAuthenticated)
        return <Navigate replace to={URL_LOGIN} state={{ from: location }} />
    if (roles && !hasRole) return <Navigate replace to={{ pathname: URL_HOME }} />;
    return children;
};
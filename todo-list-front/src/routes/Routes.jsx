import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import {URL_HOME, URL_LOGIN, URL_REGISTER, URL_TODO, URL_CREATE_TODO, URL_UPDATE_TODO} from "../constant/urlFront.js";
import {PrivateRoute} from "./PrivateRoute.jsx";
import {ROLE_ADMIN, ROLE_USER} from "../constant/roles.js";
import CreateTodoPage from "../pages/CreateTodoPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import UpdateTodoPage from "../pages/UpdateTodoPage.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children:  [
            {
                path: URL_HOME,
                element:
                    <PrivateRoute roles={[ROLE_ADMIN, ROLE_USER]}>
                        <HomePage />
                    </PrivateRoute>
            },
            {
              path: URL_CREATE_TODO,
              element:
                  <PrivateRoute roles={ROLE_ADMIN}>
                    <CreateTodoPage />
              </PrivateRoute>
            },
            {
                path: URL_UPDATE_TODO+'/:todoId',
                element:
                    <PrivateRoute roles={ROLE_ADMIN}>
                        <UpdateTodoPage />
                    </PrivateRoute>
            },
            {
                path: URL_LOGIN,
                element:
                    <LoginPage />
            },
            {
                path: URL_REGISTER,
                element:
                    <RegisterPage />
            },
        ],
    }
])

export default router;
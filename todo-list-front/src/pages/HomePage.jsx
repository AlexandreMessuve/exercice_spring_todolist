import {useDispatch, useSelector} from "react-redux";
import {getTodos, selectError, selectTodos, selectStatus} from "../redux-store/todoSlice.js";
import {useEffect} from "react";
import {selectHasRole, selectToken} from "../redux-store/authenticationSlice.js";
import {ROLE_ADMIN} from "../constant/roles.js";

const HomePage = () => {
    const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    const error = useSelector(selectError);
    const status = useSelector(selectStatus);
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);

    useEffect(() => {
        const payload = {
            isAdmin,
            token
        }
        dispatch(getTodos(payload));
    }, [dispatch, isAdmin, token]);

    useEffect(() => {
        console.log("Status", status);
        console.log("Error", error);
    }, [status, error])
    useEffect(() => {
        console.log(todos)
    }, [todos])
    return (
        <>
            <h1>Home</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
            {
                todos.length === 0 ? (
                    <>
                     <p>Vide</p>
                    </>
                ):(
                    <></>
                )
            }
        </>
    )
}

export default HomePage;
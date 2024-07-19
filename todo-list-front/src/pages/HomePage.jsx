import {useDispatch, useSelector} from "react-redux";
import {getTodos, selectError, selectTodos, selectStatus} from "../redux-store/todoSlice.js";
import {useEffect} from "react";
import {selectHasRole, selectToken} from "../redux-store/authenticationSlice.js";
import {ROLE_ADMIN} from "../constant/roles.js";
import TodoItem from "../components/todo/TodoItem.jsx";

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
            {
                todos.length === 0 ? (
                    <>
                     <p>Vide</p>
                    </>
                ):(
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>User</th>
                                    <th>Completed</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map((todo) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                ))}
                            </tbody>
                        </table>
                    </>
                )
            }
        </>
    )
}

export default HomePage;
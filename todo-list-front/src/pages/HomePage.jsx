import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getTodos, selectError, selectTodos, selectStatus} from "../redux-store/todoSlice.js";
import {selectHasRole, selectToken} from "../redux-store/authenticationSlice.js";
import {ROLE_ADMIN} from "../constant/roles.js";
import TodoItem from "../components/todo/TodoItem.jsx";
import {URL_CREATE_TODO} from "../constant/urlFront.js";
import { IoIosAddCircle } from "react-icons/io";

const HomePage = () => {
    const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    const [isLoading, setLoading] = useState(true);
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
        const fetchTodos = () => {
            dispatch(getTodos(payload));
        }
        fetchTodos()

        const interval = setInterval(() => fetchTodos(), 1000*60)
        return () => clearInterval(interval);
    }, [dispatch, isAdmin, token]);

    useEffect(() => {
        if (status === "succeeded" && error === null) {
            setLoading(false);
        }
    }, [status, error])

    useEffect(() => {
        console.log(todos)
    }, [todos])

    if (isLoading) return <p className={"text-center"}>Loading....</p>
    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className={"min-w-full divide-y bg-gray-50 dark:bg-neutral-800 text-center"}>
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Id
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Title
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Description
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">User
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Completed
                                    </th>
                                    {
                                        isAdmin ? (
                                            <>
                                                <th scope="col"
                                                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action
                                                    <Link to={URL_CREATE_TODO} className={"inline mx-2 text-end"}>
                                                        <IoIosAddCircle size={30} className={"text-gray-600 hover:text-gray-800 dark:text-neutral-50 dark:hover:text-neutral-400  inline"} />
                                                    </Link>

                                                </th>
                                            </>
                                        ) : null
                                    }

                                </tr>
                                </thead>
                                <tbody className={"divide-y bg-gray-50 dark:bg-neutral-800"}>
                                {
                                    todos.length === 0 ? (
                                        <>
                                            <tr>
                                                <td colSpan={isAdmin ? 6 : 5}>Empty</td>
                                            </tr>
                                        </>
                                    ) : (
                                        <>
                                            {todos.map((todo) => (
                                                <TodoItem key={todo.id} todo={todo}/>
                                            ))}
                                        </>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;
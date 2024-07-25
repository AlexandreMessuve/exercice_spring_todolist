import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectHasRole, selectToken} from "../../redux-store/authenticationSlice.js";
import {todoDelete, todoUpdate} from "../../redux-store/todoSlice.js";
import {ROLE_ADMIN} from "../../constant/roles.js";
import {URL_UPDATE_TODO} from "../../constant/urlFront.js";

const TodoItem = ({todo}) => {
    const [completed, setCompleted] = useState(todo.completed);
    const [isHandle, setHandle] = useState(false);
    const isAdmin = useSelector(state => selectHasRole(state, ROLE_ADMIN))
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const handleCompleted = () => {
        setCompleted(!completed);
        setHandle(true);
    }
    const handleDelete = () => {
        const payload = {
            isAdmin,
            todoId: todo.id,
            token
        }
        dispatch(todoDelete(payload))
    }
    useEffect(() => {
        if (isHandle){
            const todoUp = {
                title: todo.title,
                description: todo.description,
                completed: completed,
                userId: todo.user.id
            }
            const payload = {
                isAdmin,
                todoId: todo.id,
                todoUp,
                token

            }
            dispatch(todoUpdate(payload));
        }
    }, [isHandle, completed]);

    return(
    <>
        <tr className="hover:bg-gray-100 dark:hover:bg-neutral-900">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{todo.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{todo.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{todo.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{todo.user.email.split("@")[0]}</td>
                {isAdmin ? (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            <input type={"checkbox"} checked={completed} onClick={handleCompleted}/>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                                className="items-center text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                                to={URL_UPDATE_TODO + `/${todo.id}`}>Update</Link>
                            <Link
                                className="mx-2 items-center text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                                to={'#'} onClick={handleDelete}>Delete</Link>
                        </td>
                    </>
                ) : (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {completed ? "Yes":"No"}
                        </td>
                    </>
                )}

        </tr>

    </>
    )
}

export default TodoItem
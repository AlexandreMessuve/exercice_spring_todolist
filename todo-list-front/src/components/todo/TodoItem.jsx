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
        <tr>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.user.email.split("@")[0]}</td>
            <td>
                <input type={"checkbox"} checked={completed} disabled={!isAdmin} onClick={handleCompleted} />
            </td>
            <td>
                {isAdmin ? (
                    <>
                        <Link to={URL_UPDATE_TODO+ `/${todo.id}`}>Update</Link>
                        <Link to={'#'} onClick={handleDelete}>Delete</Link>
                    </>
                ):(<></>)}
            </td>
        </tr>

    </>
    )
}

export default TodoItem
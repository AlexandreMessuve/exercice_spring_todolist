import {TodoForm} from "../components/todo/TodoForm.jsx";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {selectTodos} from "../redux-store/todoSlice.js";

const UpdateTodoPage = () => {
    const {todoId} = useParams();
    const todos = useSelector(selectTodos)
    const todo = todos.find((t) => t.id == todoId)

    useEffect(() => {
        console.log(todo)
    }, [todo]);
    return (
        <>
            <h1>Update</h1>
            <TodoForm todo={todo} />
        </>
    )
}

export default UpdateTodoPage;
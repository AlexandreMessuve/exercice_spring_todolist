import {TodoForm} from "../components/todo/TodoForm.jsx";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {selectTodoById} from "../redux-store/todoSlice.js";

const UpdateTodoPage = () => {
    const {todoId} = useParams();
    const todo = useSelector(state => selectTodoById(state, todoId))

    useEffect(() => {
        console.log(todo)
    }, [todo]);
    return (
        <>
            <div className="flex flex-col items-center justify-center mx-auto my-4">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update todo
                        </h1>
                        <TodoForm todo={todo}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateTodoPage;
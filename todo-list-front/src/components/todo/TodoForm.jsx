import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {TodoInitialValues, TodoUpdateInitialValues} from "../../formik/initial-value/todo.js";
import {Field, Form, Formik} from "formik";
import {selectHasRole, selectToken, selectUser} from "../../redux-store/authenticationSlice.js";
import {ROLE_ADMIN} from "../../constant/roles.js";
import {URL_HOME} from "../../constant/urlFront.js";
import {createTodo, selectIsError, todoUpdate} from "../../redux-store/todoSlice.js";
import {useState} from "react";

export const  TodoForm = ({todo}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    const token = useSelector(selectToken);
    const isError = useSelector(selectIsError);
    const user = useSelector(selectUser);
    const [className] = useState(
        {
            label:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            input: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            submit: "w-full my-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        });
    const handleSubmit = (values) => {
        if (todo === null){
            const payload = {
                isAdmin,
                todo: values,
                token
            }
            dispatch(createTodo(payload));
        }else{
            const payload = {
                isAdmin,
                todoId: todo.id,
                todoUp: values,
                token
            }
            dispatch(todoUpdate(payload))
        }

        if (!isError){
            navigate(URL_HOME);
        }
    }

    return(
        <>
                <Formik initialValues={todo === null ? TodoInitialValues(user.userId) : TodoUpdateInitialValues(todo)}  onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {() => (
                        <Form>
                            {isError ?
                                (<>
                                    <h2 className={"text-red-600" }>Error</h2>
                                </>):null
                            }
                            <div className="mb-5">
                                <label className={className.label}  htmlFor="title">Title</label>
                                <Field className={className.input} type="text" name={"title"} id="title" required/>
                            </div>
                            <div className="mb-5">
                                <label className={className.label}  htmlFor="description">Description</label>
                                <Field className={className.input}   as={"textarea"} id="description" name={"description"} required/>
                            </div>
                            <div className={"flex justify-between"}>
                                <label className={"text-sm font-medium text-gray-900 dark:text-white"}  htmlFor={"completed"}>Completed</label>
                                <Field className={"form-checkbox text-end"}   type={"checkbox"} id={"completed"} name={"completed"} />
                            </div>
                                <Field type={"number"} hidden={true} name={"userId"}/>
                            <button className={className.submit}  type="submit">Submit
                            </button>
                        </Form>
                    )}
                </Formik>
        </>
    )
}
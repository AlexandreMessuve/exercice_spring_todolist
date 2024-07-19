import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {TodoInitialValues, TodoUpdateInitialValues} from "../../formik/initial-value/todo.js";
import {Field, Form, Formik} from "formik";
import {selectHasRole, selectToken, selectUser} from "../../redux-store/authenticationSlice.js";
import {ROLE_ADMIN} from "../../constant/roles.js";
import {URL_HOME} from "../../constant/urlFront.js";
import {createTodo, selectIsError, todoUpdate} from "../../redux-store/todoSlice.js";

export const  TodoForm = ({todo}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    const token = useSelector(selectToken);
    const isError = useSelector(selectIsError);
    const user = useSelector(selectUser);

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
                {isError ?
                    (<>
                        <h2 className={"text-red-600" }>Error</h2>
                    </>):
                    (<></>)
                }
                <Formik initialValues={todo === null ? TodoInitialValues(user.userId) : TodoUpdateInitialValues(todo)}  onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    {() => (
                        <Form>
                            <div className="mb-5">
                                <label htmlFor="title"
                                       className="">Title</label>
                                <Field type="text" name={"title"} id="title" required/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description">Description</label>
                                <Field as={"textarea"} id="description" name={"description"} required/>
                            </div>
                            <div>
                                <label htmlFor={"completed"}>Completed</label>
                                <Field type={"checkbox"} id={"completed"} name={"completed"} />
                            </div>
                                <Field type={"number"} hidden={true} name={"userId"}/>
                            <button type="submit">Submit
                            </button>
                        </Form>
                    )}

                </Formik>
        </>
    )
}
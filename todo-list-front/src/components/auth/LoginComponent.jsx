import {useDispatch} from "react-redux";
import {authenticate} from "../../service/api/api.auth.js";
import {Link, useNavigate} from "react-router-dom";
import {URL_HOME, URL_REGISTER} from "../../constant/urlFront.js";
import {signIn} from "../../redux-store/authenticationSlice.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {LoginInitialValues} from "../../formik/initial-value/user.js";
import LoginValidation from "../../formik/yup/LoginValidation.js";




export const  LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        authenticate(values).then(response => {
            console.log(response);
            if (response.status === 200){
                console.log("success auth" , response.data)
                const token = response.data.data.token;
                console.log(token)
                dispatch(signIn(token));
                navigate(URL_HOME)
            }
        }).catch(error => console.log(error));
    };
    return(
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <Formik initialValues={LoginInitialValues} validationSchema={LoginValidation} onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    {() => (
                        <Form>
                            <div className="mb-5">
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <Field type="email" name={"email"} id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@flowbite.com" required/>
                                <ErrorMessage name={"email"} component={"div"}/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    password</label>
                                <Field type="password" id="password" name={"password"}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                                <ErrorMessage name={"password"} component={"div"}/>
                            </div>
                            <button type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                            </button>
                        </Form>
                    )}

                </Formik>
            </section>
        </>
    )
}
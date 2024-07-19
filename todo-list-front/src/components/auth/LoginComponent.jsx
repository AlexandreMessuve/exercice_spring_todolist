import {useDispatch} from "react-redux";
import {authenticate} from "../../service/api/api.auth.js";
import {Link, useNavigate} from "react-router-dom";
import {URL_HOME, URL_LOGIN, URL_REGISTER} from "../../constant/urlFront.js";
import {signIn} from "../../redux-store/authenticationSlice.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {LoginInitialValues} from "../../formik/initial-value/user.js";
import LoginValidation from "../../formik/yup/LoginValidation.js";
import {useState} from "react";




export const  LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [className] = useState(
        {
            label:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            input: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            submit: "w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        });
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
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            <Formik initialValues={LoginInitialValues} validationSchema={LoginValidation}
                                    onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                {() => (
                                    <Form>
                                        <div>
                                            <label htmlFor="email"
                                                   className={className.label}>Your
                                                email</label>
                                            <Field type="email" name={"email"} id="email"
                                                   className={className.input}
                                                   placeholder="name@flowbite.com" required/>
                                            <ErrorMessage className={"text-red-600 dark:text-red-500"} name={"email"}
                                                          component={"div"}/>
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                   className={className.label}>Your
                                                password</label>
                                            <Field type="password" id="password" name={"password"}
                                                   className={className.input}
                                                   required/>
                                            <ErrorMessage className={"text-red-600 dark:text-red-500"} name={"password"}
                                                          component={"div"}/>
                                        </div>
                                        <button type="submit"
                                                className={className.submit}>Submit
                                        </button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already not have an account? <Link to={URL_REGISTER}
                                                                           className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register
                                            here</Link>
                                        </p>
                                    </Form>
                                )}

                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
import {RegisterComponent} from "../components/auth/RegisterComponent.jsx";

const RegisterPage = () => {
    return (
        <div className="mt-[30px] border-t-2 border-solid overflow-hidden">
            <h1 className="text-center text-green h-[80px] text-5xl font-bold leading-normal my-[20px]">Register</h1>
            <RegisterComponent />
        </div>
    );
};

export default RegisterPage;
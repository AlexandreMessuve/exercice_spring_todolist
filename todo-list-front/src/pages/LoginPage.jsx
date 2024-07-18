import {LoginComponent} from "../components/auth/LoginComponent.jsx";

const LoginPage = () => {
    return (
        <div className="mt-[30px] border-t-2 border-solid overflow-hidden">
            <h1 className="text-center text-green h-[80px] text-5xl font-bold leading-normal my-[20px]">Login</h1>
            <LoginComponent />
        </div>
    );
};

export default LoginPage;
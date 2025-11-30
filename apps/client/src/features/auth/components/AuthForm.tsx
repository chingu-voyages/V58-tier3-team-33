import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full">
      <div className="space-y-2 mb-4 md:mb-8 text-center md:text-left">
        {isLogin ? (
          <>
            <h2 className="text-white font-bold text-xl md:text-4xl">
              Welcome Back!
            </h2>

            <p className="text-gray-400 text-sm md:text-base">
              Login to access your account.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-white font-bold text-xl md:text-4xl">
              Join Worksy
            </h2>

            <p className="text-gray-400 text-sm md:text-base">
              Create your account to get started
            </p>
          </>
        )}
      </div>

      <div className="mt-4 w-full">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="mt-4 text-center text-sm md:text-base">
        {isLogin ? (
          <p className="text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={toggleForm}
              className="text-gold font-semibold hover:text-amber-600 transition-colors duration-200 cursor-pointer"
            >
              Register
            </span>
          </p>
        ) : (
          <p className="text-gray-400">
            Already have an account?{" "}
            <span
              onClick={toggleForm}
              className="text-gold font-semibold hover:text-amber-600 transition-colors duration-200 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

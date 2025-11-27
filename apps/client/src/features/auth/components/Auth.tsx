import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <div className="mt-4">{isLogin ? <LoginForm /> : <RegisterForm />}</div>
      <div className="mt-4 text-center text-lg">
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

export default Auth;

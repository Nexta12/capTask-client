import InputField from "@components/Input";
import Spinner from "@components/Spinner";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { paths } from "@routes/paths";
import useAuthStore, { getLoggedInUserPath } from "@store/authStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {
    login,
    error,
    isLoading,
    setError,
    user,
    isAuthenticated,
    validateAuth,
  } = useAuthStore();


  const [authLoading, setAuthLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: values.email,
      password: values.password,
    };
    await login(data, navigate);
  };

  useEffect(() => {
    const verifyAuth = async () => {
      setAuthLoading(true);
      try {
        await validateAuth(); 
     
      } finally {
        setAuthLoading(false);
      }
    };

    verifyAuth();
  }, [validateAuth]);

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate(getLoggedInUserPath(user));
    }
  }, [user, isAuthenticated, navigate]);

  if (authLoading) {
    return <Spinner />;
  }


  return (
    <section className="">
      <div className="bg-black h-screen relative flex justify-center items-center  ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}

        <div className=" z-20 w-[80%] lg:w-[40%] bg-sky-500 p-5 rounded-md shadow-2xl ">
       {error && <ErrorAlert message={error} />}

          <h3 className="h3 text-black flex items-center gap-x-2 justify-center">
            Login
          
          </h3>
          <form action="" method="post" onSubmit={handleSubmit}>
            <InputField
              placeholder="Email"
              name='email'
              value={values.email}
              onChange={handleChange}
              autoFocus
              required
            />
            <InputField
              placeholder="Password"
              name='password'
              type="password"
              value={values.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary w-full py-2 rounded-sm mb-4 ">
              {isLoading ? "Please Wait..." : "Submit"}
            </button>
            <p>
              
              <Link to={paths.ForgotPassword} className="text-black">
              Forgotten Password ?  click here
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

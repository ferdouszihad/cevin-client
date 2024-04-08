import Title from "../components/Title";
import { BiEnvelope, BiKey } from "react-icons/bi";
import Social from "../components/Social";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  //console.log(location);

  const navigate = useNavigate();
  //console.log(location);
  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signIn(email, pass)
      .then((res) => {
        if (res?.user?.email) {
          setError("");
          Swal.fire(
            "login SuccessFull",
            `Welcome ${res?.user?.displayName}`,
            "success"
          );
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((err) => {
        const errorMsg = err.code.split("/")[1];
        setError(errorMsg);
        //console.log({ ...err });
      });
  };
  return (
    <div className=" bg-[url(/bg.png)] bg-contain ">
      <div className=" bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 m-5 p-5  ">
          <div className="title mt-5">
            <Title>Login Now</Title>
          </div>

          <div className="flex flex-wrap-reverse  justify-between items-center gap-5 pt-8">
            <div className="login-for flex-1">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                <p>
                  Dont have an Account?{" "}
                  <Link
                    state={location?.state}
                    to="/registration"
                    className="link"
                  >
                    Register Now
                  </Link>{" "}
                </p>
                <div className="flex justify-start items-center">
                  <div className="">
                    <BiEnvelope className="text-3xl text-slate-500"></BiEnvelope>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="email"
                    name="email"
                    placeholder="enter email"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-start items-center">
                    <div className="">
                      <BiKey className="text-3xl text-slate-500"></BiKey>
                    </div>
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                      type="password"
                      name="pass"
                      placeholder="enter Password"
                    />
                  </div>
                  <p className="text-start ps-8 text-[13px] text-red-400">
                    {error}
                  </p>
                </div>

                <div className=" p-1 flex gap-3 -mt-4">
                  <input type="checkbox" name="remember me" className="" />
                  Remember Me
                </div>

                <input
                  type="submit"
                  value="Login Now"
                  className="btn cursor-pointer"
                />
              </form>
            </div>

            <div className="lottie  flex-1 mx-20">
              <Social></Social>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import Title from "../components/Title";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import Social from "../components/Social";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const goTo = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  //console.log(location);
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const pass = form.pass.value;

    //console.log(name, email, pass);

    createUser(email, pass)
      .then((res) => {
        const userInfo = res.user;
        updateUser({ displayName: name, photoURL: image }).then(() => {
          setUser({ ...userInfo, displayName: name, photoURL: image });
          Swal.fire("Great", "Regisrered Successfully", "success");
          goTo(location?.state ? location.state : "/");
        });
      })
      .catch((err) => {
        const errMsg = err?.code.split("/")[1];
        Swal.fire("Sorry", `${errMsg}`, "error");
        setError(errMsg);
        //console.log(err);
      });
  };

  return (
    <div className=" bg-[url(/bg.png)] bg-contain">
      <div className=" bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 m-5 p-5  ">
          <div className="title mt-5">
            <Title>Join with Us</Title>
          </div>

          <div className="flex flex-wrap-reverse justify-between items-center gap-5 pt-8">
            <div className="login-for flex-1">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                <p>
                  Already have an account?{" "}
                  <Link state={location?.state} to="/login" className="link">
                    Login Now
                  </Link>
                </p>
                <div className="flex justify-start items-center">
                  <div className="">
                    <BiUser className="text-3xl text-slate-500"></BiUser>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    required
                  />
                </div>

                <div className="flex justify-start items-center">
                  <div className="">
                    <BiImageAdd className="text-3xl text-slate-500"></BiImageAdd>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="text"
                    name="image"
                    placeholder="Enter Image Url (optional)"
                  />
                </div>
                <div className="flex justify-start items-center">
                  <div className="">
                    <BiEnvelope className="text-3xl text-slate-500"></BiEnvelope>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div className="flex justify-start items-center">
                  <div className="">
                    <BiKey className="text-3xl text-slate-500"></BiKey>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="password"
                    name="pass"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <p className="text-start ps-8 -mt-7 text-[13px] text-red-400">
                  {error}
                </p>
                {/* <div className="flex justify-start items-center">
                  <div className="">
                    <BiKey className="text-3xl text-slate-500"></BiKey>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="password"
                    name="pass-confirm"
                    placeholder="Confirm Password"
                  />
                </div> */}

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

export default Register;

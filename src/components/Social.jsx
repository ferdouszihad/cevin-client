import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Social = () => {
  const navigate = useNavigate();
  const { googleSignIn } = useContext(AuthContext);
  const handleGoogle = () => {
    googleSignIn().then((res) => {
      if (res?.user?.email) {
        Swal.fire(
          `Login Success`,
          `Welcome Mr. ${res?.user?.displayName}`,
          "success"
        );
        navigate("/");
      }
    });
  };
  return (
    <div
      onClick={handleGoogle}
      className=" bg-white cursor-pointer shadow-xl p-3 justify-center rounded-full flex my-5 items-center gap-5"
    >
      <div className=" rounded-full ">
        <img
          className="w-[32px]"
          src="https://img.icons8.com/?size=96&id=17949&format=png"
          alt=""
        />
      </div>
      <p>I Have Google</p>
    </div>
  );
};

export default Social;

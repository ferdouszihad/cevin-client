import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useContext } from "react";
import { toast } from "react-toastify";
import useAxiosForCookies from "../hooks/useAxiosForCookies";

const CanvasCard = (props = {}) => {
  const { user } = useContext(AuthContext);
  const { data, refetch } = props || {};
  const useAxiosSecure = useAxiosForCookies();
  //console.log(data);
  const handleReaction = () => {
    if (!user?.email) {
      Swal.fire("Sir Be a Memeber", " You need to Login first", "warning");
      return;
    }
    const updateData = {
      email: user?.email,
      imageId: data._id,
      likes: data?.likes,
    };
    useAxiosSecure.patch("/react", updateData).then((res) => {
      if (res.data?.modifiedCount > 0) {
        toast("Cevin Got This !!. Thank you 💘", {
          position: "bottom-left",
          theme: "dark",
        });
        refetch();
      } else {
        Swal.fire(
          "Feature is Not working",
          "Connect with your developer",
          "error"
        );
      }
    });
  };
  return (
    <div className="shadow-xl border-[24px] rounded-lg relative overflow-hidden transition duration-200 hover:-translate-y-2">
      <img
        className="w-full hover:-mt-2 transition-all z-10 hover:-z-10 object-cover  duration-300 "
        src={data?.data?.display_url}
        alt=""
      />
      <div className="w-full h-full bg-opacity-60 duration-75 absolute inset-0 opacity-0 hover:opacity-100 p-2 gap-5  bg-black flex  justify-center items-center flex-col">
        <p className="text-white text-sm text-center">
          {data?.data?.title.split("-").join(" ")}
        </p>
        <Link to={`/paintings/${data?._id}`}>
          <button className="text-white">See Details</button>
        </Link>
        <div className="gap-1 text-center text-white space-y-2">
          {data?.likes?.includes(user?.email) ? (
            <BsHeartFill
              onClick={handleReaction}
              className="text-2xl text-red-400 mx-auto cursor-pointer"
            ></BsHeartFill>
          ) : (
            <BsHeart
              onClick={handleReaction}
              className="text-2xl hover:animate-pulse cursor-pointer mx-auto hover:text-red-400"
            ></BsHeart>
          )}
          <div data-tip={data?.likes} className="tooltip-bottom">
            <p className="underline  text-sm">
              {data.likes?.length} user like this
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasCard;

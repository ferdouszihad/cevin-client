import Lottie from "lottie-react";
import anime from "../assets/BannerAI.json";
import { Link } from "react-router-dom";
const CreateBanner = () => {
  return (
    <div className="bg-orange-400  mx-auto p-10 text-white">
      <div className="w-11/12 mx-auto text-center">
        <h1 className="text-3xl font-bold ">Want a Unique & creative Paint?</h1>
        <div className="max-w-xs mx-auto">
          <Lottie animationData={anime}></Lottie>
        </div>
        <Link to="/generate">
          <button className="btn-error btn">Generate A Paint</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateBanner;

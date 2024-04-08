import loading from "../assets/BannerAI.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-6xl">L</h2>
      <div className="max-w-[250px]">
        <Lottie animationData={loading}></Lottie>
      </div>
      <h2 className="text-6xl">ADING</h2>
    </div>
  );
};

export default Loading;

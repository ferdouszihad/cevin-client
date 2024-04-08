import cevin from "../assets/Robo.json";
import { RiRobot2Line } from "react-icons/ri";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <section
      className="bg-contain bg-fixed"
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <div
        id="banner"
        className="flex min-h-screen bg-white bg-opacity-90 flex-col-reverse md:flex-row items-center justify-around "
      >
        <div className="text space-y-4  text-center md:text-start ">
          <h1 className="text-5xl font-bold">
            Hello I am <span className="text-orange-400"> Cevin.AI</span>
          </h1>
          <div className="flex items-center max-w-[520px] md:rounded-full p-2 bg-orange-400 text-white">
            <RiRobot2Line className=" text-orange-400 bg-white p-2 rounded-full w-10 h-10" />
            <marquee direction="left">
              Hello, I am Cevin.AI. Get ready to embark on a journey filled with
              whimsical paintings, quirky conversations, and a sprinkle of AI
              magic.
            </marquee>
          </div>

          <h2 className="text-3xl">Supercharge Creativity Meets AI!</h2>
          <div className="buttons flex gap-3 justify-center md:justify-start">
            <Link to="/generate" className="btn">
              Generate
            </Link>
            <Link to="/paintings" className="btn btn-warning">
              Watch Paintings
            </Link>
          </div>
        </div>
        <div className="max-w-[400px] ">
          <Lottie animationData={cevin} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Banner;

import { useContext, useRef, useState } from "react";
import painting from "../assets/image-loading.json";
import Lottie from "lottie-react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import useAxiosForCookies from "../hooks/useAxiosForCookies";

const Generate = () => {
  const painting_types = [
    "Oil Painting",
    "Watercolor Painting",
    "Acrylic Painting",
    "Pastel Painting",
    "Gouache Painting",
    "Encaustic Painting",
    "Fresco Painting",
    "Impasto Painting",
    "Miniature Painting",
    "Abstract Painting",
    "Realistic/Representational Painting",
  ];
  const painting_categories = [
    "Colorful ",
    "Black and White ",
    "Monochromatic ",
    "Landscape ",
    "Portrait ",
    "Still Life ",
    "Abstract ",
    "Impressionistic ",
    "Surrealistic ",
    "Realistic ",
  ];

  const [loading, setLoading] = useState(false);
  const promptRef = useRef();
  const imgRef = useRef();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const axiosSecure = useAxiosForCookies();

  const handlePropmt = () => {
    if (!activeCat) {
      Swal.fire("hey", "please choose a Category", "error");
      return;
    }
    if (!activeType) {
      Swal.fire("hey", "please choose a Type", "error");
      return;
    }
    const prompt = promptRef?.current?.value.trim();
    if (prompt.length < 10) {
      Swal.fire(
        "make a bigger prompt",
        "Please write more the 10 characters",
        "warning"
      );
      return;
    }
    setLoading(true);
    const data = {
      prompt,
      email: user?.email,
      activeCat,
      activeType,
    };
    console.log(data);

    axiosSecure
      .post("/generate-image", data)
      .then((res) => {
        //console.log(res.data);
        if (res?.data?.insertedId) {
          navigate(`/paintings/${res?.data?.insertedId}`);
          setLoading(false);
          Swal.fire("Done", " I painted your Data", "success");
        } else {
          setLoading(false);
          Swal.fire(
            "Got Error",
            "Something went wrong. contact your developer",
            "error"
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire("Sorry", "Please Try again.  getting some issues", "error");
        console.log(err);
      });
  };

  return (
    <div className=" bg-[url(/bg.png)] bg-contain ">
      <div className=" bg-white bg-opacity-90 min-h-screen">
        {loading && (
          <div className="flex flex-wrap-reverse justify-center items-center">
            <div className="flex max-w-lg justify-center items-center">
              <Lottie animationData={painting} loop={true} />
            </div>
            <div className="text-5xl">
              <Typewriter
                options={{
                  strings: [
                    "Hold Tight",
                    "We are Drawing Now",
                    "Almost Ready",
                    "Adding Some Color Now",
                    "A little more Brush",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              ></Typewriter>
            </div>
          </div>
        )}
        <div className="w-11/12 mx-auto py-10">
          <h2 className="text-2xl text-center font-bold">
            {" "}
            Lets Generate an Image
          </h2>

          <div className="flex  justify-center py-10 gap-2">
            <input
              ref={promptRef}
              type="text"
              className="input flex-1 input-bordered"
            />
            <button
              onClick={handlePropmt}
              className="btn btn-primary btn-outline justify-self-center"
            >
              Generate
            </button>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="">
              <h2 className="text-xl font-bold">Choose A Categoory</h2>
              <div className="space-x-5 space-y-3">
                {painting_categories.map((cat) => (
                  <button
                    className={`${activeCat == cat && "bg-orange-400"}`}
                    onClick={() => setActiveCat(cat)}
                    key={cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-x-5 space-y-3">
              <h2 className="text-xl font-bold">Choose A Color Type</h2>
              {painting_types.map((type) => (
                <button
                  className={`${activeType == type && "bg-orange-400"}`}
                  onClick={() => setActiveType(type)}
                  key={type}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="con grid grid-cols-2 gap-5 py-10" ref={imgRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Generate;

// import Title from "../components/Title";

// const GeneratePaint = () => {
//   return (
//     <div className="w-11/12 mx-auto py-10">
//       <Title className="text-2xl">Paint with AI</Title>

//       <div className="main py-10">
//         <h2 className="mb-3 font-bold">
//           I will create painting from your written data:
//         </h2>
//         <div className="items-center  flex">
//           <div className=" flex-1">
//             <div>
//               <input
//                 className="input w-full input-bordered rounded-e-none join-item"
//                 placeholder="Write what you need"
//               />
//             </div>
//           </div>
//           <select className="select select-bordered join-item">
//             <option disabled selected>
//               Select Size
//             </option>
//             <option value={"1200"}>Semi-Width</option>
//             <option>Drama</option>
//             <option>Action</option>
//           </select>
//           <div className="indicator">
//             <button className="rounded-none rounded-e-lg">
//               Generate Paint
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GeneratePaint;

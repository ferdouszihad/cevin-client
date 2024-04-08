import { useContext } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import { BsDownload, BsHeart, BsHeartFill } from "react-icons/bs";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Comments from "../components/Comments";
import useImageComments from "../hooks/useImageComments";
import useAxiosForCookies from "../hooks/useAxiosForCookies";

const PaintingSingle = () => {
  const { user, tokenStatus } = useContext(AuthContext);
  const { id } = useParams();
  const { refetch: refetchComment } = useImageComments();
  const axiosSecure = useAxiosForCookies();
  console.log(tokenStatus);
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["painting-single"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paintings/${id}`);
      console.log(res);
      return res?.data;
    },
    enabled: tokenStatus,
  });

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

    axiosSecure.patch("/react", updateData).then((res) => {
      if (res.data?.modifiedCount > 0) {
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

  const handleComment = (e) => {
    e.preventDefault();
    if (e.target.comment.value.trim().length < 10) {
      Swal.fire("Cevin Says", "write morre then 10 character", "warning");
      return;
    } // Prevent the default form submission behavior
    const commentdata = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
      comment: e.target.comment.value,
      context: data?.detail,
      imageId: data?._id,
      title: data?.title,
      paintingUrl: data?.data?.thumb.url,
    };
    axiosSecure.post("/comment", commentdata).then(() => {
      //console.log(res.data);

      Swal.fire("comment Added", "", "success");
      refetchComment();
      e.target.reset();
    });
  };

  //console.log(data);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        <div className="">
          <img
            className="border-[24px]  border-yellow-100  p-10 shadow-2xl"
            src={data?.data?.display_url}
            alt=""
          />
        </div>
        <div className=" space-y-5">
          <Title className="text-xl">{data?.data?.title}</Title>
          <h2>Sharing you the painting details</h2>
          <div className="p-5 bg-orange-100 rounded">{data?.detail}</div>
          <div className="flex items-center">
            <div
              data-tip={
                data?.likes?.includes(user?.email)
                  ? `You and ${data?.likes?.length - 1} other users like this`
                  : `${data?.likes?.length} users like this`
              }
              className="flex tooltip items-center text-2xl gap-5"
            >
              <button onClick={handleReaction}>
                {data?.likes?.includes(user?.email) ? (
                  <BsHeartFill className="text-red-400 cursor-pointer"></BsHeartFill>
                ) : (
                  <BsHeart className="hover:text-white cursor-pointer"></BsHeart>
                )}
              </button>
            </div>
            <div className="action flex items-center gap-3">
              <form onSubmit={handleComment} action="" className="card-body">
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">
                    <textarea
                      cols={100}
                      name="comment"
                      className="textarea w-full text-black textarea-warning"
                      placeholder="Share your philosophy"
                    ></textarea>
                  </div>
                </div>
                <button type="submit">Add a Comment</button>
              </form>
            </div>
            <div className="tooltip" data-tip="download">
              <button>
                <a
                  href={data?.data?.url}
                  target="_blank"
                  download={"image.jpg"}
                >
                  <BsDownload></BsDownload>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Comments></Comments>
    </div>
  );
};

export default PaintingSingle;
{
  /* <div className="space-y-6">
  <Title className="text-xl">{data?.data?.title.split("-").join(" ")}</Title>
  <div className="flex items-center gap-5">
    <h2 className="text-2xl font-bold">Price :${price}</h2>
  </div>

  <div className="flex items-center gap-5">
    <h2 className="text-2xl font-bold">Painting Type</h2>
    <p className=" badge badge-warning">Oil Paint</p>
  </div>
  <div className="chat chat-start">
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src={Robo} />
      </div>
    </div>
    <div className="chat-header">Cevin.AI</div>
    <div className="chat-bubble">
      {data?.detail
        ? data?.detail
        : "This painting stands as a testament to the extraordinary anembodiment of creativity woven into every stroke and hue. Each brush stroke tells a story, each color a whisper of inspiration."}
    </div>
    <div className="chat-footer opacity-50">Seen at 12:46</div>
  </div>

  <div className="action flex items-center gap-3">
   

    <form onSubmit={handleComment} action="" className="card-body">
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-bubble">
          <textarea
            cols={100}
            name="comment"
            className="textarea w-full text-black textarea-warning"
            placeholder="Share your philosophy"
          ></textarea>
        </div>
      </div>
      <button type="submit">Add a Comment</button>
    </form>
  </div>
</div>; */
}

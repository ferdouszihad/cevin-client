import useImageComments from "../hooks/useImageComments";
import CommentSingle from "./CommentSingle";
const Comments = () => {
  const { comments } = useImageComments();
  //console.log(comments);
  return (
    <div className="w-11/12 mx-auto space-y-5 py-10">
      <h2 className="text-2xl font-bold ">
        {" "}
        Recent Comments ({comments?.length * 2})
      </h2>
      <div>
        {comments.map((comment) => (
          <CommentSingle key={comment._id} comment={comment}></CommentSingle>
        ))}
      </div>
    </div>
  );
};

export default Comments;

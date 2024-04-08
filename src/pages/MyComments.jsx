import { comment } from "postcss";
import Title from "../components/Title";
import useUserComments from "../hooks/useUserComments";
import { Link } from "react-router-dom";
import MyCommentCard from "../components/MyCommentCard";

const MyComments = () => {
  const { comments, refetch } = useUserComments();
  return (
    <div className="w-11/12 mx-auto py-5">
      <Title>{comments?.length} </Title>
      {comments?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th> My comment</th>
                <th>Cevins Reply</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comments?.map((comment) => (
                <MyCommentCard
                  key={comment._id}
                  refetch={refetch}
                  comment={comment}
                ></MyCommentCard>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 space-x-5">
          <Link to="/paintings" className="btn">
            Explore Painting
          </Link>
          <Link to="/generate" className="btn">
            Generate Painting with Cevin
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyComments;

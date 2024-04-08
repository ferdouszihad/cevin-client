import Swal from "sweetalert2";
import useAxiosForCookies from "../hooks/useAxiosForCookies";

const UpdateModal = (props = {}) => {
  const axiosSecure = useAxiosForCookies();
  const { comment, refetch } = props || {};
  const handleUpdate = (e) => {
    e.preventDefault();
    const newComment = e.target.comment.value;
    axiosSecure
      .put(`/my-comments/${comment._id}`, {
        newComment,
        context: comment?.context,
      })
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          Swal.fire("wow, Comment Update", "success");
          refetch();
          document.getElementById(`close-${comment?._id}`).click();
        }
      })
      .catch(() => {
        //console.log(err);
        Swal.fire("sorry, something wrong", "error");
        document.getElementById(`close-${comment?._id}`).click();
      });
  };

  return (
    <dialog id={`modal-${comment?._id}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            id={`close-${comment?._id}`}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div role="alert" className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Updating comments will also update the reply</span>
        </div>
        <form onSubmit={handleUpdate} className="card-body space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Update Comment</span>
            </label>
            <textarea
              placeholder="update comment"
              className="input input-bordered p-3"
              defaultValue={comment?.comment}
              name="comment"
              required
            />
          </div>
          <button className="btn">Save</button>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateModal;

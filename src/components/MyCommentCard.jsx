import { BsTrash, BsUiRadiosGrid } from "react-icons/bs";
import Swal from "sweetalert2";
import UpdateModal from "./UpdateModal";
import { Link } from "react-router-dom";
import Loading from "../pages/Loading";
import useAxiosForCookies from "../hooks/useAxiosForCookies";

const MyCommentCard = (props = {}) => {
  const { comment, refetch, isLoading } = props || {};
  const axiosSecure = useAxiosForCookies();
  //console.log(comment);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Comments looks good",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete This Comment",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/comments/${comment?._id}`).then((res) => {
          if (res?.data) {
            Swal.fire({
              title: "Removed!",
              text: " Painting has been removed.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <Link
              to={`/paintings/${comment?.imageId}`}
              className="mask cursor-pointer mask-squircle w-24 h-24"
            >
              <img
                src={comment?.paintingUrl}
                alt="Avatar Tailwind CSS Component"
              />
            </Link>
          </div>
          <div></div>
        </div>
      </td>

      <td>{comment?.comment}</td>
      <td>{comment?.reply}</td>
      <th className="space-x-3 flex">
        <button
          onClick={handleDelete}
          data-tip="Delete"
          className="btn btn-ghost tooltip "
        >
          <BsTrash className="text-2xl"></BsTrash>
        </button>

        <button
          onClick={() => {
            //console.log(`modal-${comment._id}`);
            document.getElementById(`modal-${comment._id}`)?.showModal();
          }}
          data-tip="Update"
          className="btn btn-ghost tooltip "
        >
          <BsUiRadiosGrid className=" text-2xl" />
        </button>
      </th>
      <UpdateModal refetch={refetch} comment={comment}></UpdateModal>
    </tr>
  );
};

export default MyCommentCard;

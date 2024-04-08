import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosForCookies from "./useAxiosForCookies";

const useImageComments = () => {
  const { id } = useParams();
  //console.log(id);
  const axiosSecure = useAxiosForCookies();
  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-comments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${id}`);
      return res.data;
    },
  });

  return { comments, refetch, isLoading };
};

export default useImageComments;

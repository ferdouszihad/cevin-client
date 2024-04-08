import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosForCookies from "./useAxiosForCookies";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useImageComments = () => {
  const { id } = useParams();
  const { tokenStatus } = useContext(AuthContext);
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
    enabled: tokenStatus,
  });

  return { comments, refetch, isLoading };
};

export default useImageComments;

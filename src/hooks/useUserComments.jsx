import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosForCookies from "./useAxiosForCookies";

const useUserComments = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosForCookies();

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-comments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-comments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user,
  });

  return { comments, refetch, isLoading };
};

export default useUserComments;

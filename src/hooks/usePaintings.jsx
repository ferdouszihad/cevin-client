import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePaintings = () => {
  const {
    data: paintings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-paintings"],
    queryFn: async () => {
      const res = await axios.get("https://cevin-ai.vercel.app/paintings");
      return res.data;
    },
  });

  return { paintings, refetch, isLoading };
};

export default usePaintings;

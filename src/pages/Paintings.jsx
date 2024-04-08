import CreateBanner from "./CreateBanner";
import Loading from "./Loading";
import CanvasCard from "../components/CanvasCard";
import usePaintings from "../hooks/usePaintings";

const Paintings = () => {
  const { paintings, refetch, isLoading } = usePaintings();
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <CreateBanner></CreateBanner>
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
          {paintings?.map((item) => (
            <CanvasCard
              key={item._id}
              refetch={refetch}
              data={item}
            ></CanvasCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Paintings;

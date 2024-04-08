import { useRouteError } from "react-router-dom";
import Header from "../components/Header";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <Header></Header>
      <div className="flex min-h-screen items-center justify-center">
        {error?.statusText ? error.statusText : "Something Went Wrong"}
      </div>
    </div>
  );
};

export default Error;

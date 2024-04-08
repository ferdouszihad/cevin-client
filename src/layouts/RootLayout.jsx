import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../pages/Loading";

const RootLayout = () => {
  const navigation = useNavigation();
  //console.log(navigation.state);
  if (navigation.state == "loading") {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Header></Header>
      <main className="overflow-x-clip">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;

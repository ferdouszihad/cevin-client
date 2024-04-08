import { NavLink, Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  if (user?.email !== import.meta.env.VITE_ADMIN_EMAIL) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <div>
      <nav>
        <Header></Header>
      </nav>
      <main className="w-11/12 mx-auto ">
        <div className="grid py-5 gap-5 grid-cols-12 min-h-screen">
          {/* menus */}
          <div className="bg-red-100 col-span-3  h-full flex flex-col items-center">
            <NavLink
              to="/dashboard"
              className="p-2 my-3 border border-stone-400 w-full"
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard/add-product"
              className="p-2 my-3 border border-stone-400 w-full"
            >
              Add Product
            </NavLink>
            <NavLink
              to="/dashboard/manage-product"
              className="p-2 my-3 border border-stone-400 w-full"
            >
              Manage Product
            </NavLink>
            <NavLink
              to="/dashboard/addCategory"
              className="p-2 my-3 border border-stone-400 w-full"
            >
              Add Category
            </NavLink>
            <NavLink
              to="/dashboard/manage-category"
              className="p-2 my-3 border border-stone-400 w-full"
            >
              Manage Category
            </NavLink>
          </div>
          <div className=" col-span-9 h-full">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;

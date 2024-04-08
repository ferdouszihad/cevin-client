import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import GeneratePaint from "../pages/GeneratePaint";
import PaintingSingle from "../pages/PaintingSingle";
import Paintings from "../pages/Paintings";
import MyComments from "../pages/MyComments";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/paintings",
        element: <Paintings></Paintings>,
      },
      {
        path: "/paintings/:id",
        element: (
          <PrivateRoute>
            <PaintingSingle></PaintingSingle>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-comments",
        element: (
          <PrivateRoute>
            <MyComments></MyComments>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },

      {
        path: "registration",
        element: <Register></Register>,
      },
      {
        path: "generate",
        element: (
          <PrivateRoute>
            <GeneratePaint></GeneratePaint>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default mainRoutes;

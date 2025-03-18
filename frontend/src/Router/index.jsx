import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import About from "../pages/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "signin/", element: <Signin /> },
      { path: "signup/", element: <Signup /> },
      { path: "about/", element: <About /> },
    ],
  },
]);

export default router;

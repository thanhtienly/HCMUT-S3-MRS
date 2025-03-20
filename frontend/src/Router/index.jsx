import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Management from "../pages/Management";
import Menu from "../pages/Menu";
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
      { path: "contact/", element: <Contact /> },
      { path: "history/", element: <Management /> },
      { path: "menu/", element: <Menu /> },
    ],
  },
]);

export default router;

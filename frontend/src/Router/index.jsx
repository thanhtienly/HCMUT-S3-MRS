import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Management from "../pages/BookingHistory";
import Menu from "../pages/Menu";
import RoomDetail from "../Component/RoomDetail";
import Success from "../pages/Message/Success";
import Report from "../layout/MessageReport/Report";
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
      { path: "menu/roomDetail/:id", element: <RoomDetail /> },
      { path: "register/successful", element: <Success /> },
      { path: "contact/report/successful", element: <Report /> },
    ],
  },
]);

export default router;

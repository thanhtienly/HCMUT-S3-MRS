import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1" style={{}}>
        {/* {children} */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;

import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingBag, User } from "lucide-react";

import logoBK from "../../assets/HCMUT_official_logo.png";
import tel from "../../assets/dhqg_BK.png";

// import { CartContext } from "../../context/CartContext";
// import BellNotification from "../../components/BellNotification";
import "./styles.css";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Header = () => {
  const navigate = useNavigate();
  // const { cartItems } = useContext(CartContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "TRANG CHỦ" },
    { path: "/about", label: "VỀ HCMUT" },
    { path: "/menu", label: "ĐẶT CHỖ HỌC" },
    { path: "/history", label: "QUẢN LÝ ĐẶT CHỖ" },
    { path: "/contact", label: "PHẢN HỒI" },
    // { path: "/careers", label: "TUYỂN DỤNG" },
  ];

  const userData = localStorage.getItem("userdata");
  const username = userData ? JSON.parse(userData).username : "---";

  return (
    <>
      {/* Top Bar */}
      <div
        className="d-none d-lg-block"
        style={{ background: "var(--primaryDeep_background)" }}
      >
        <div className="container d-flex justify-content-end py-2 gap-4">
          <div className="d-flex gap-3 align-items-center">
            <button
              className={cx("wrapper_language", "btn", "btn-link", "p-0")}
            >
              VN
            </button>
            <span className={cx("wrapper_language")}>|</span>
            <button
              className={cx("wrapper_language", "btn", "btn-link", "p-0")}
            >
              EN
            </button>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <i className="bi bi-geo-alt-fill text-danger"></i>
            <span className={cx("wrapper_located")}>HỒ CHÍ MINH</span>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <i className="bi bi-person-fill text-danger"></i>
            {localStorage.getItem("login") !== "success" ? (
              <span className="text-danger">
                <a
                  onClick={() => navigate("signup")}
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  ĐĂNG KÝ
                </a>
                /
                <a
                  onClick={() => navigate("signin")}
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  ĐĂNG NHẬP
                </a>
              </span>
            ) : (
              <div className="d-flex gap-3">
                <Link to="/profile">
                  <User />
                </Link>
                <Link to="/cart">
                  <div className="nav-bag">
                    <ShoppingBag className="bi bi-handbag-fill" size={24} />
                    <span className="badge bg-danger rounded-pill bag-quantity">
                      {/* <span>{cartItems.length}</span> */}
                    </span>
                  </div>
                </Link>
                {/* <BellNotification /> */}
                <span className="text-danger">
                  <a
                    onClick={() => navigate("/profile")}
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    {localStorage.getItem("name")}
                  </a>
                  /
                  <a
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    Đăng xuất
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className="main-nav navbar navbar-expand-lg"
        style={{
          background: "var(--primary_background)",
        }}
      >
        <div className="container-fluid">
          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler border-0 d-lg-none"
            type="button"
            onClick={handleNavCollapse}
            aria-label="Toggle navigation"
          >
            <Menu color="white" />
          </button>

          {/* Logo - Centered on mobile */}
          <Link className={cx("navbar-brand mx-auto mx-lg-0")} to="/">
            <img
              className={cx("wrapper_logo")}
              src={logoBK}
              alt="logoBK"
              height="80"
            />
          </Link>

          {/* Desktop Navigation */}
          {/* <div className={cx("wrapper_navBar navbar-collapse")}> */}
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          >
            <ul className="nav-list navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map(({ path, label }) => (
                <li key={path} className="nav-item">
                  <Link
                    to={path}
                    className={`nav-link ${
                      location.pathname === path ? "active" : ""
                    }`}
                  >
                    <span className="fw-bold fs-6">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* </div> */}

          {/* Right Side Buttons */}
          <div className="d-flex gap-3 align-items-center">
            {/* <button className="btn btn-warning rounded-pill fw-bold px-4">
              PICK UP
            </button> */}
            <div className="d-none d-lg-flex align-items-center text-white">
              <img src={tel} alt="BK-HCMUT" height="40" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

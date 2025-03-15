import React from "react";
import bk1 from "../../assets/bkCs1.png";

import bk2 from "../../assets/bku05.png";
import bk3 from "../../assets/bkcs2h6.jpg";

import "./styles.scss";

const Home = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={bk1} className="d-block w-100" alt="Slide 1" />
          <div className="carousel-caption">
            {/* <h2>Welcome to Our Restaurant</h2>
            <p>Enjoy the best food in town</p> */}
          </div>
        </div>
        <div className="carousel-item">
          <img src={bk2} className="d-block w-100" alt="Slide 2" />
          <div className="carousel-caption">
            {/* <h2>Delicious Burgers</h2>
            <p>Try our special burgers</p> */}
          </div>
        </div>
        <div className="carousel-item">
          <img src={bk3} className="d-block w-100" alt="Slide 3" />
          <div className="carousel-caption">
            {/* <h2>Fresh Ingredients</h2>
            <p>We use only the freshest ingredients</p> */}
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Home;

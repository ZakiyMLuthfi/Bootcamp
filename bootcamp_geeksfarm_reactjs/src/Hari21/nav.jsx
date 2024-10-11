import React from "react";
import { Link } from "react-router-dom"; // Import Link dari react-router-dom
import UseEffectClock from "./useEffectClock";

const Nav = () => {
  return (
    <>
      <header>
        <h1 className="text-center my-4">Website with react</h1>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a>
            <UseEffectClock />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/youtube">
                  Youtube
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/image-search">
                  Image
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-form">
                  MyForm
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <style>
          {`
            .nav-link {
              transition: all 0.3s ease; /* Transisi halus untuk semua properti */
            }

            .nav-link:hover {
              transform: scale(1.1); /* Membesarkan link saat hover */
              color: #007bff; /* Mengubah warna saat hover */
            }
          `}
        </style>
      </header>
    </>
  );
};

export default Nav;

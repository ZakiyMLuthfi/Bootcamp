import React from "react";
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/youtube">
                  Youtube
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/image-search">
                  Image
                </a>
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

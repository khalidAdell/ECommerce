import React, { useEffect } from "react";
import "./Admin.css";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  let [activeDash, setActiveDash] = useState(false);
  const toggleActiveLink = () => {
    document.querySelectorAll(".sidebar a").forEach(link => {
      link.addEventListener("click", () => {
        document.querySelectorAll(".sidebar a").forEach(links => {
          links.classList.remove("active-dash");
        });
        link.classList.add("active-dash");
      });
    });
  };

  useEffect(() => {
    toggleActiveLink();
  });

  return (
    <div>
      <div className={activeDash ? "sidebar active" : "sidebar"}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">Admin</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="dashboard" className="active-dash">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="products">
              <i className="bx bx-box"></i>
              <span className="links_name">Products</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="bx bx-list-ul"></i>
              <span className="links_name">Order list</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="bx bx-coin-stack"></i>
              <span className="links_name">Stock</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="bx bx-book-alt"></i>
              <span className="links_name">Total order</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="bx bx-message"></i>
              <span className="links_name">Messages</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="bx bx-heart"></i>
              <span className="links_name">Favrorites</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </Link>
          </li>
          <li className="log_out">
            <Link to="">
              <i className="bx bx-log-out"></i>
              <span className="links_name">Log out</span>
            </Link>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <nav>
          <div
            className="sidebar-button"
            onClick={() => setActiveDash(prev => !prev)}
          >
            <i className="bx bx-menu sidebarBtn"></i>
            <span className="dashboard">Dashboard</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="bx bx-search"></i>
          </div>
          <div className="profile-details">
            <img src="images/profile.jpg" alt="admin" />
            <span className="admin_name">Khalid Adel</span>
            <i className="bx bx-chevron-down"></i>
          </div>
        </nav>
        <div className="home-content">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Admin;

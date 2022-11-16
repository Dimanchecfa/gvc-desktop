import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ menuElements }) => {
  const url = window.location.pathname;
  console.log(url);
  const [selected , setSelected] = React.useState(null);
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          {/* <img
            src={"/public/dist/img/AdminLTELogo.png"}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          /> */}
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {menuElements.map((menuElement, index) => {
                return (
                  <>
                    <li className="nav-header">---{" "}{menuElement?.header}</li>
                    {menuElement.navItems.map((navItem) => {
                      return (
                        <li className="nav-item active">
                          <Link  className={`nav-link ${selected === navItem.id || url === navItem.link ? 'active' : ''}`} onClick={() => setSelected(navItem.id)} to={navItem.link}>
                            <i className="nav-icon fas fa-circle" />
                            <p>
                              {navItem.title}
                            </p>
                          </Link>
                        </li>
                      );
                    })}
                  </>
                );
              })}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Sidebar;

import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { menuAdmin } from "./menu";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Sidebar menuElements={menuAdmin} />
        <div className="content-wrapper">
          <section className="content px-4">
            
            {children}
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

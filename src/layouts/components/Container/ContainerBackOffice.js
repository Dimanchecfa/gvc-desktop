import React from "react";
import { Sidebar } from "react-feather";
import Header from "../../../Header";

const ContainerBackOffice = ({ children }) => {
  return (
    <>
     
        <Header />
        <Sidebar />
        {children}
      
    </>
  );
};

export default ContainerBackOffice;

import React from 'react'
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const DepositPage = () => {
  
  return (
    <div>
      <div className="flex w-screen h-screen">
        <Sidebar />
        <div className="w-screen ">
          <Header />
        </div>
      </div>
    </div>
  );
};
export default DepositPage;

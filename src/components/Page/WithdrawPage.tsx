import React from 'react'
import Container from "../partials/Container";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const WithdrawPage = () => {
  
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
export default WithdrawPage;

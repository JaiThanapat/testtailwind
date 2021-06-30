import React from 'react'
import Container from "../partials/Container";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const MainPage = () => {
  
  return (
    <div>
      <div className="flex w-screen h-screen">
        <Sidebar />
        <div className="w-screen ">
          <Header />
          <Container />
        </div>
      </div>
    </div>
  );
};
export default MainPage;

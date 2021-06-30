import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { Staff, User } from "../../Model/interfaces";
import LargeTextInput from "../../Model/largeTextInput";
import TextInput from "../../Model/textInput";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import * as Yup from "yup";
import UserService from "../../../services/UserService";

const SearchUserPage = () => {
  const [searchAccountID, setSearchAccountID] = useState("");
  const history = useHistory();
  const handleEditUser = () => {
    history.push({
      pathname: `/EditUserPage/${searchAccountID}`,
      state: { searchAccountID: searchAccountID },
    });
  };
const handleinput = (e: any) => {
    setSearchAccountID(e.target.value);
};
  useEffect(() => {
    //fetchUser();
  }, []);
  console.log(searchAccountID);
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen ">
        <Header />
        <div className="container h-full px-10 py-5 mx-auto bg-gray-200 border-black md:py-16">
          <div className="flex flex-col space-y-6 md:flex-row md:items-center md:space-x-6">
            <div className="m-auto text-xl text-center md:space-y-6 ">
              ใส่เลขบัญชีผู้ใช้งาน เพื่อแก้ไขข้อมูล
              <input
                className="relative block px-4 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none p px3/4-3 w- rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-3xl"
                type="transactionCode"
                name="transactionCode"
                placeholder="เลขบัญชี"
                maxLength={10}
                defaultValue={searchAccountID}
                value={searchAccountID}
                onChange={handleinput}
              />
              <button
                className="relative flex justify-center w-full px-4 py-2 text-xl font-medium text-white bg-blue-600 border border-transparent rounded-md space group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleEditUser}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUserPage;

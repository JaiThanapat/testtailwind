import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { User } from "../../Model/interfaces";
import TextInput from "../../Model/textInput";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import * as Yup from "yup";
import UserService from "../../../services/UserService";

const EditUserPage = () => {
  const [updateUser, setUpdateUser] = useState<User>();
  const history = useHistory();
  const location = useLocation<{ searchAccountID: string }>();
  const fetchUser = () => {
    UserService.fetchUserbyAccountID(location.state.searchAccountID).then(
      (userinfo) => {
        setUpdateUser(userinfo);
      }
    );
  };
  const handlecancel = () => {
    history.push("/Mainpage");
  };
  useEffect(() => {
    fetchUser();
  }, []);
  console.log(updateUser);
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen ">
        <Header />
        <div>
          <Formik
            validationSchema={Yup.object({
              UpdateName: Yup.string().required("กรุณากรอกชื่อจริง"),
            })}
            enableReinitialize={true}
            initialValues={{
              UpdateName: updateUser?.name! || "",
            }}
            onSubmit={(values, actions) => {
              const UpdateUser = {
                accountId: updateUser?.accountId,
                name: values.UpdateName,
                username: AuthService.getUsername(),
              };

              // return fetch(
              //   `${baseUrl}/staff/update/${location.state.staffID}`,
              //   {
              //     method: "Put",
              //     headers: {
              //       "Content-Type": "application/json",
              //     },
              //     body: JSON.stringify(Updatestaff),
              //   }
              // )
              //   .then((response) => response.json())
              //   .then((data) => console.log(data))
              //   .catch((error) => console.log(error));
              UserService.UpdateUser(
                UpdateUser,
                AuthService.getAccessToken()
              ).then((savedUser) => {
                history.push("/Mainpage");
                window.location.reload();
              });
            }}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <div className="px-8 py-2 mt-10 sm:mt-0 bg-gray-50 ">
                <div className="md:grid md:grid-cols- md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-3xl font-extrabold leading-6 text-gray-900 ">
                        ข้อมูลส่วนบุคคล
                      </h3>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit}>
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="col-span-6 px-5 space-y-5 sm:col-span-3">
                            <img
                              id="showImage"
                              className="items-start w-48 h-48 max-w-xs border"
                              src={`${updateUser?.pictureUrl}`}
                              alt=""
                            />
                            <label
                              htmlFor="first_name"
                              className="block text-xl font-medium text-black-700"
                            >
                              เลขบัญชื่อ : {location.state.searchAccountID}
                            </label>

                            <label
                              htmlFor="first_name"
                              className="block text-xl font-medium text-black-700"
                            >
                              ชื่อจริง
                            </label>
                            <TextInput
                              className="relative block w-2/6 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="UpdateName"
                              name="UpdateName"
                              placeholder="ชื่อจริง"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.UpdateName}
                              defaultValue={updateUser?.name!}
                              error={
                                errors.UpdateName &&
                                touched.UpdateName &&
                                errors.UpdateName
                              }
                              success={
                                !errors.UpdateName && touched.UpdateName
                                  ? "Valid"
                                  : ""
                              }
                            />
                            <ErrorMessage name="newStaffName">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                            <br></br>
                          </div>
                        </div>
                        <div className="px-4 py-3 space-x-3 text-right bg-gray-50 sm:px-6">
                          <button
                            onClick={() => handlecancel()}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            ยกเลิก
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            บันทึก
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;

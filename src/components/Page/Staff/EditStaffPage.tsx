import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { Staff } from "../../Model/interfaces";
import LargeTextInput from "../../Model/largeTextInput";
import TextInput from "../../Model/textInput";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import staffService from "../../../services/StaffService";
import * as Yup from "yup";

const EditStaffForm = () => {
  const [updatestaff, setUpdateStaff] = useState<Staff>();
  const [ImageURL, setImageURLState] = useState<string>();
  const history = useHistory();
  const location = useLocation<{ staffID: string }>();
  async function fetchStaff() {
    staffService.fetchStaff(location.state.staffID).then((fetchupdatestaff) => {
      setUpdateStaff(fetchupdatestaff);
      setImageURLState(fetchupdatestaff["imageUrl"]);
    });
  }
  const handlecancel = () => {
    history.push("/Staffs");
  };
  useEffect(() => {
    fetchStaff();
  }, []);
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen ">
        <Header />
        <div>
          <Formik
            validationSchema={Yup.object({
              newStaffName: Yup.string().required("กรุณากรอกชื่อจริง"),
              newStaffSurname: Yup.string().required("กรุณากรอกนามสกุล"),
              newStaffAddress: Yup.string().required("กรุณากรอกที่อยู่"),
              newStaffPhone: Yup.string().required("กรุณากรอกเบอร์โทรศัพท์"),
              newStaffUsername: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
              newStaffPassword: Yup.string().required("กรุณากรอกรหัสผ่าน"),
              newStaffEmail: Yup.string()
                .email("กรุณากรอกอีเมล")
                .required("กรุณากรอกอีเมล"),
              newStaffDepartment: Yup.string().required(
                "กรุณาเลือกสาขาที่สังกัด"
              ),
            })}
            enableReinitialize={true}
            initialValues={{
              newStaffName: updatestaff?.name! || "",
              newStaffSurname: updatestaff?.surname! || "",
              newStaffAddress: updatestaff?.address_detail! || "",
              newStaffPhone: updatestaff?.phone! || "",
              newStaffUsername: updatestaff?.username! || "",
              newStaffPassword: "",
              newStaffImage: "",
              newStaffEmail: updatestaff?.email! || "",
              newStaffDepartment: updatestaff?.department || "",
              newStaffUrl: updatestaff?.imageUrl! || "",
            }}
            onSubmit={(values, actions) => {
              if (values.newStaffImage === "") {
                const Updatestaff = {
                  name: values.newStaffName,
                  surname: values.newStaffSurname,
                  address_detail: values.newStaffAddress,
                  phone: values.newStaffPhone,
                  username: values.newStaffUsername,
                  password: values.newStaffPassword,
                  email: values.newStaffEmail,
                  department: values.newStaffDepartment,
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
                staffService
                  .UpdateStaff(
                    Updatestaff,
                    AuthService.getAccessToken(),
                    updatestaff?.staff_id as string
                  )
                  .then((savedNewStaff) => {
                    history.push("/Staffs");
                    window.location.reload();
                  });
              } else {
                const UpdateStaff = new FormData();
                UpdateStaff.append("name", values.newStaffName);
                UpdateStaff.append("surname", values.newStaffSurname);
                UpdateStaff.append("address_detail", values.newStaffAddress);
                UpdateStaff.append("phone", values.newStaffPhone);
                UpdateStaff.append("username", values.newStaffUsername);
                UpdateStaff.append("password", values.newStaffPassword);
                UpdateStaff.append("email", values.newStaffEmail);
                UpdateStaff.append("imageUrl", values.newStaffUrl);
                UpdateStaff.append("department", values.newStaffDepartment);
                UpdateStaff.append("file", values.newStaffImage);
                staffService
                  .UpdateStaffWithPhoto(
                    UpdateStaff,
                    AuthService.getAccessToken(),
                    updatestaff?.staff_id as string
                  )
                  .then((savedNewStaff) => {
                    history.push("/Staffs");
                  });
              }
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
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first_name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              ชื่อจริง
                            </label>
                            <TextInput
                              className="relative block w-2/6 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="newStaffName"
                              name="newStaffName"
                              placeholder="ชื่อจริง"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.newStaffName}
                              defaultValue={updatestaff?.name!}
                              error={
                                errors.newStaffName &&
                                touched.newStaffName &&
                                errors.newStaffName
                              }
                              success={
                                !errors.newStaffName && touched.newStaffName
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

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="last_name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              นามสกุล
                            </label>
                            <TextInput
                              className="relative block w-2/6 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="newStaffSurname"
                              name="newStaffSurname"
                              placeholder="นามสกุล"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.newStaffSurname}
                              error={
                                errors.newStaffSurname &&
                                touched.newStaffSurname &&
                                errors.newStaffSurname
                              }
                              success={
                                !errors.newStaffSurname &&
                                touched.newStaffSurname
                                  ? "Valid"
                                  : ""
                              }
                            />
                            <ErrorMessage name="newStaffSurname">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                            <br></br>
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email_address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              อีเมล
                            </label>
                            <TextInput
                              className="relative block w-2/6 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="email"
                              name="newStaffEmail"
                              placeholder="อีเมล"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.newStaffEmail}
                              error={
                                errors.newStaffEmail &&
                                touched.newStaffEmail &&
                                errors.newStaffEmail
                              }
                              success={
                                !errors.newStaffEmail && touched.newStaffEmail
                                  ? "Valid"
                                  : ""
                              }
                            />
                            <ErrorMessage name="newStaffEmail">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                            <br></br>
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email_address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              ชื่อผู้ใช้งาน
                            </label>
                            <TextInput
                              className="relative block w-2/6 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="newStaffUsername"
                              name="newStaffUsername"
                              placeholder="ชื่อผู้ใช้งาน"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.newStaffUsername}
                              error={
                                errors.newStaffUsername &&
                                touched.newStaffUsername &&
                                errors.newStaffUsername
                              }
                              success={
                                !errors.newStaffUsername &&
                                touched.newStaffUsername
                                  ? "Valid"
                                  : ""
                              }
                            />
                            <ErrorMessage name="newStaffUsername">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                            <br></br>
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email_address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              รหัสผ่าน
                            </label>
                            <TextInput
                              className="relative block w-2/6 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="password"
                              name="newStaffPassword"
                              placeholder="รหัสผ่าน"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.newStaffPassword}
                              error={
                                errors.newStaffPassword &&
                                touched.newStaffPassword &&
                                errors.newStaffPassword
                              }
                              success={
                                !errors.newStaffPassword &&
                                touched.newStaffPassword
                                  ? "Valid"
                                  : ""
                              }
                            />
                            <ErrorMessage name="newStaffPassword">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                            <br></br>
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email_address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              เบอร์โทร
                            </label>
                            <TextInput
                              className="relative block w-2/6 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="newStaffPhone"
                              name="newStaffPhone"
                              placeholder="เบอร์โทร"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.newStaffPhone}
                              error={
                                errors.newStaffPhone &&
                                touched.newStaffPhone &&
                                errors.newStaffPhone
                              }
                              success={
                                !errors.newStaffPhone && touched.newStaffPhone
                                  ? "Valid"
                                  : ""
                              }
                            />
                            <ErrorMessage name="newStaffPhone">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                            <br></br>
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email_address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              ที่อยู่
                            </label>
                            <LargeTextInput
                              multiline={true}
                              className="relative block w-2/6 h-20 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="newStaffAddress"
                              name="newStaffAddress"
                              placeholder="ที่อยู่"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.newStaffAddress}
                              error={
                                errors.newStaffAddress &&
                                touched.newStaffAddress &&
                                errors.newStaffAddress
                              }
                              success={
                                !errors.newStaffAddress &&
                                touched.newStaffAddress
                                  ? "Valid"
                                  : ""
                              }
                            />
                            <ErrorMessage name="newStaffAddress">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                            <br></br>
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="department"
                              className="block text-sm font-medium text-gray-700"
                            >
                              สาขา
                            </label>
                            <TextInput
                              className="relative block w-2/6 px-3 py-2 text-black placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              type="newStaffDepartment"
                              name="newStaffDepartment"
                              placeholder="สาขา"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.newStaffDepartment}
                              error={
                                errors.newStaffDepartment &&
                                touched.newStaffDepartment &&
                                errors.newStaffDepartment
                              }
                              success={
                                !errors.newStaffDepartment &&
                                touched.newStaffDepartment
                                  ? "Valid"
                                  : ""
                              }
                            />
                            <ErrorMessage name="newStaffDepartment">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                            <br></br>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              รูปภาพ
                            </label>
                            <div className="flex items-center mt-5 space-x-10">
                              <img
                                src={`${ImageURL}`}
                                className="w-32 h-32 overflow-hidden bg-gray-100 rounded-sm "
                              />
                              <label className="cursor-pointer ">
                                <span className="px-4 py-3 text-sm text-white bg-green-400 rounded-full focus:outline-none hover:bg-green-500 hover:shadow-lg">
                                  เลือกรูปภาพ
                                </span>
                                <input
                                  id="newStaffImage"
                                  name="newStaffImage"
                                  type="file"
                                  className="hidden"
                                  accept="accept"
                                  onChange={(event) => {
                                    if (!event.target.files)
                                      return "no image found";
                                    setFieldValue(
                                      "newStaffImage",
                                      event.target!.files[0]!
                                    );
                                    setImageURLState(
                                      URL.createObjectURL(event.target.files[0])
                                    );
                                  }}
                                />
                              </label>
                            </div>
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

export default EditStaffForm;

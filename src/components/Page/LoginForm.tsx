import React, { useState } from "react";
import { useHistory } from "react-router";
import { Formik,ErrorMessage } from "formik";
import { LockClosedIcon } from "@heroicons/react/solid";
import * as Yup from "yup";
import TextInput from "../Model/textInput";
import AuthService from "../../services/AuthService";

type LoginFormProps = {
  loginCallback?: () => void;
};
const LoginForm = (props: LoginFormProps) => {
  const [LoginErrorMessage, setLoginErrorMessage] = useState("");
  const history = useHistory();
  
  return (
    <div className="LoginForm">
      <Formik
        initialValues={{ username: "", password: "",}}
        validationSchema={Yup.object({
          username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
          // password: Yup.string()
          //   .required("กรอกรหัสผ่าน")
          //   .min(8, "Password is too short - should be 8 chars minimum.")
          //   .matches(
          //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          //     "Include at least one Uppercase, Lowercase, Number and a special character"
          //   )
        })}
        onSubmit={async (values, actions) => {
          const result = await AuthService.LoginUser(
            values.username,
            values.password
          );
          if (!result) {
            setLoginErrorMessage(
              "เข้าสู่ระบบไม่สำเร็จเนื่องจากกรอกชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"
            );
          } else {
            setLoginErrorMessage("");
            if (props.loginCallback) {
              props.loginCallback();
            }
            history.push("/Mainpage");
          }
          actions.setSubmitting(false);
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
        }) => (
          <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="w-auto h-12 mx-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                  เข้าสู่ระบบ
                </h2>
              </div>
              {LoginErrorMessage && (
                <div className="error" style={{ color: "red" }}>
                  {LoginErrorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <div>
                    <TextInput
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      type="username"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      error={
                        errors.username && touched.username && errors.username
                      }
                      success={
                        !errors.username && touched.username ? "Valid" : ""
                      }
                    />
                  </div>
                  <ErrorMessage name="username">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>

                  <div>
                    <TextInput
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={
                        errors.password && touched.password && errors.password
                      }
                      success={
                        !errors.password && touched.password ? "Valid" : ""
                      }
                    />
                  </div>
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;

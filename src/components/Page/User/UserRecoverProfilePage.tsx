import react, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import UserService from "../../../services/UserService";

const UserRecoverProfile = () => {
  const [user, setUser] = useState<any>();
  const history = useHistory();
  const location = useLocation<{ UserID: string }>();
  const fetchUser = () => {
    UserService.fetchUser(location.state.UserID).then((userinfo) => {
      setUser(userinfo);
    });
  };
  const handleback = () => {
    history.push("/RecoverUser");
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen ">
        <Header />
        {/* This is an example component */}
        <div className="h-full bg-gradient-to-r from-gray-100 to-gray-50">
          <div className="flex flex-col">
            <div className="px-8 py-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                  <div className="block border-b-2 md:flex">
                    <div className="w-full p-4 bg-white shadow-md md:w-2/5 sm:p-6 lg:p-8">
                      <div className="flex justify-between">
                        <span className="block text-xl font-semibold">
                          ข้อมูลผู้ใช้งาน
                        </span>
                        <a
                          className="px-5 py-2 -mt-2 font-bold text-white bg-gray-700 rounded-full cursor-pointer text-md hover:bg-gray-800"
                          onClick={() => handleback()}
                        >
                          ย้อนกลับ
                        </a>
                      </div>
                      <span className="text-gray-600">
                        ข้อมูลนี้เป็นข้อมูลส่วนบุคคล
                      </span>

                      <div className="flex w-full grid-cols-3 gap-4 p-8 mx-2 justify-items-start">
                        <img
                          id="showImage"
                          className="items-start w-48 h-48 max-w-xs border"
                          src={`${user?.pictureUrl}`}
                          alt=""
                        />
                        <div className="grid grid-rows-3 pb-6 ">
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              ชื่อ-นามสกุล
                            </label>
                            <div className="grid-cols-2 px-5">
                              <input
                                disabled
                                id="fullname"
                                className="block w-full px-5 pb-5 bg-white rounded-r border-1 "
                                type="text"
                                defaultValue={user?.name}
                              />
                            </div>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              อีเมล
                            </label>
                            <div className="grid-cols-2 px-5">
                              <input
                                disabled
                                id="email"
                                className="block w-full px-5 pb-5 bg-white rounded-r border-1 "
                                type="text"
                                defaultValue={user?.email}
                              />
                            </div>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              เบอร์โทรศัพท์
                            </label>
                            <div className="grid-cols-2 px-5">
                              <input
                                disabled
                                multiple={true}
                                id="phone"
                                className="block w-full px-5 pb-5 bg-white rounded-r border-1 "
                                type="text"
                                defaultValue={user?.phone}
                              />
                            </div>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              เลขบัญชีผู้ใช้งาน
                            </label>
                            <div className="grid-cols-2 px-5">
                              <input
                                disabled
                                id="address"
                                className="block w-full px-5 pb-5 bg-white rounded-r border-1 "
                                type="text"
                                defaultValue={user?.accountId}
                              />
                            </div>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              ประเภทผู้ใช้งาน
                            </label>
                            <div className="grid-cols-2 px-5">
                              <div className="block w-full px-5 pb-5 bg-white rounded-r border-1 ">
                                {user?.loginType}
                              </div>
                            </div>
                            <div className="col-auto">
                              <label
                                htmlFor="name"
                                className="block px-5 pb-5 text-lg font-bold text-black"
                              >
                                เงินในบัญชี
                              </label>
                              <div className="grid-cols-2 px-5">
                                <input
                                  disabled
                                  id="department"
                                  className="block w-full px-5 pb-5 bg-white rounded-r border-1 "
                                  type="text"
                                  defaultValue={user?.balance + " บาท"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRecoverProfile;

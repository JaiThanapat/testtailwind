import react, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Staff } from "../../Model/interfaces";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import staffService from "../../../services/StaffService";

const ProfileStaff = () => {
  const [staff, setStaff] = useState<Staff>();
  const history = useHistory();
  const location = useLocation<{ staffID: string }>();
  const fetchStaff = () => {
    staffService.fetchStaff(location.state.staffID).then((fetchupdatestaff) => {
      setStaff(fetchupdatestaff);
    });
  };
  const checkUserIsAdmin = (isadmin: any) => {
    if (isadmin === true) {
      return "ผู้ดูแลระบบ";
    } else {
      return "พนักงาน";
    }
  };
  const handleback = () => {
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
                          ข้อมูลพนักงาน
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
                          src={`${staff?.imageUrl}`}
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
                                defaultValue={staff?.name}
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
                                defaultValue={staff?.email}
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
                                defaultValue={staff?.phone}
                              />
                            </div>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              ที่อยู่
                            </label>
                            <div className="grid-cols-2 px-5">
                              <input
                                disabled
                                id="address"
                                className="block w-full px-5 pb-5 bg-white rounded-r border-1 "
                                type="text"
                                defaultValue={staff?.address_detail}
                              />
                            </div>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              ตำแหน่ง
                            </label>
                            <div className="grid-cols-2 px-5">
                              <div className="block w-full px-5 pb-5 bg-white rounded-r border-1 ">
                                {checkUserIsAdmin(staff?.Isadmin)}
                              </div>
                            </div>
                            <div className="col-auto">
                              <label
                                htmlFor="name"
                                className="block px-5 pb-5 text-lg font-bold text-black"
                              >
                                สาขา
                              </label>
                              <div className="grid-cols-2 px-5">
                                <input
                                  disabled
                                  id="department"
                                  className="block w-full px-5 pb-5 bg-white rounded-r border-1 "
                                  type="text"
                                  defaultValue={staff?.department}
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

export default ProfileStaff;

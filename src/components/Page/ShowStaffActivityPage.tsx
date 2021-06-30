import react, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import LogStaffService from "../../services/LogStaffService";


const ShowStaffActivityPage = () => {
  const [logStaff, setLogStaff] = useState<any>();
  const [logBody, setLogBody] = useState<any>();
  const history = useHistory();
  const location = useLocation<{ LogID: string }>();
  const [loading, setLoading] = useState(false);

  async function fetchStaff() {
    await LogStaffService.fetchLogStaff(location.state.LogID).then(
      (fetchLogstaff) => {
        setLogStaff(fetchLogstaff);
        if (logStaff !== undefined) {
          setLogBody(logStaff.bodyDetail);
        }
      }
    );
  }
  const handleback = () => {
    history.push("/StaffActivityPage");
  };
  const checkUserIsAdmin = (isadmin: boolean) => {
    if (isadmin === true) {
      return "ผู้ดูแลระบบ";
    } else {
      return "พนักงาน";
    }
  };
  const handlekind = (kind: string) => {
    if (kind === "POST") {
      return "สร้าง";
    } else if (kind === "PUT") {
      return "อัพเดท";
    } else if (kind === "DELETE") {
      return "ลบ";
    } else if (kind === "GET") {
      return "เข้าถึงข้อมูล";
    } else {
      return "ไม่ระบุประเภท";
    }
  };
  const handlestatus = (status: string) => {
    if (status === "Done") {
      return "สำเร็จ";
    } else {
      return "ไม่สำเร็จ";
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [loading]);
  console.log(logStaff);
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen ">
        <Header />

        <div className="h-full bg-gradient-to-r from-gray-100 to-gray-50">
          <div className="flex flex-col h-full">
            <div className="px-8 py-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                  <div className="block border-b-2 md:flex">
                    <div className="w-full p-4 bg-white shadow-md md:w-2/5 sm:p-6 lg:p-8">
                      <div className="flex justify-between">
                        <span className="block text-xl font-semibold">
                          ข้อมูลการทำงาน
                        </span>
                        <a
                          className="px-5 py-2 -mt-2 font-bold text-white bg-gray-700 rounded-full cursor-pointer text-md hover:bg-gray-800"
                          onClick={() => handleback()}
                        >
                          ย้อนกลับ
                        </a>
                      </div>
                      <span className="text-gray-600">
                        ข้อมูลนี้เป็นข้อมูลที่เป็นความลับ
                      </span>

                      <div className="flex w-full grid-cols-3 gap-4 p-8 mx-2 justify-items-start">
                        <div className="grid grid-rows-3 pb-6 ">
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              รหัสบันทึก : {logStaff?.log_id}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              วันเวลา : {logStaff?.createLogDateTime}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              พนักงานที่เกี่ยวข้อง : {logStaff?.staffInvoked}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              ประเภท : {handlekind(logStaff?.type)}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              สถานะ : {handlestatus(logStaff?.status)}
                            </label>

                            <div className="grid-cols-2 px-5"></div>
                            <div className="col-auto">
                              <label
                                htmlFor="name"
                                className="block px-5 pb-5 text-lg font-bold text-black"
                              >
                                ข้อมูล :
                              </label>
                              <div className="block w-full px-5 pb-5 bg-white rounded-r border-1 ">
                                <div className="grid-flow-row px-8 py-2 space-y-2">
                                  <p>
                                    วันที่สร้าง :{" "}
                                    {logStaff?.bodyDetail?.createDateTime}{" "}
                                  </p>
                                  <p>
                                    วันที่แก้ไขล่าสุด :{" "}
                                    {logStaff?.bodyDetail?.lastChangedDateTime}{" "}
                                  </p>
                                  <p>
                                    เลขประจำตัวพนักงาน :{" "}
                                    {logStaff?.bodyDetail?.staff_id}{" "}
                                  </p>
                                  <p>
                                    ชื่อ-นามสกุล : {logStaff?.bodyDetail?.name}{" "}
                                    {logStaff?.bodyDetail?.surname}{" "}
                                  </p>
                                  <p>
                                    ชื่อผู้ใช้งาน :{" "}
                                    {logStaff?.bodyDetail?.username}{" "}
                                  </p>
                                  <p>
                                    เบอร์โทรศัพท์ :{" "}
                                    {logStaff?.bodyDetail?.phone}{" "}
                                  </p>
                                  <p>อีเมล : {logStaff?.bodyDetail?.phone} </p>
                                  <p>
                                    ที่อยู่ :{" "}
                                    {logStaff?.bodyDetail?.address_detail}{" "}
                                  </p>
                                  <p>
                                    สาขา : {logStaff?.bodyDetail?.department}{" "}
                                  </p>
                                  <p>
                                    ตำแหน่ง :{" "}
                                    {checkUserIsAdmin(
                                      logStaff?.bodyDetail?.address_detail
                                    )}{" "}
                                  </p>
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
    </div>
  );
};

export default ShowStaffActivityPage;

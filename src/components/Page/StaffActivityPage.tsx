import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Staff } from "../Model/interfaces";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import LogStaffService from "../../services/LogStaffService";

const StaffActivityPage = () => {
  const [logStaffs, setLogStaff] = useState<any[]>([]);
  const [logStaffsID, setLogStaffID] = useState<string>();
  const [search, setSearch] = useState("");
  const [fillterdLogStaff, setFillterdLogStaff] = useState<any[]>([]);
   const history = useHistory();
  const fetchLogStaffs = () => {
    LogStaffService.fetchLogStaffs().then((logStaffs) => {
      setLogStaff(logStaffs);
    });
  };
  const handleViewInfoLogStaff = (LogID: any) => {
    history.push({
      pathname: `/ShowStaffActivityPage/${LogID}`,
      state: { LogID: LogID },
    });
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
    fetchLogStaffs();
  }, []);
  useEffect(() => {
    setFillterdLogStaff(
      logStaffs.filter((logstaff) => {
        return (
          logstaff.ThaiDatetime.toLowerCase().includes(search.toLowerCase()) ||
          logstaff.staffInvoked.toLowerCase().includes(search.toLowerCase()) ||
          handlekind(logstaff.type)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          handlestatus(logstaff.status)
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      })
    );
  }, [search, logStaffs]);
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen ">
        <Header />
        <div className=" bg-gradient-to-r from-gray-100 to-gray-50">
          <div className="flex flex-col h-full">
            <div className="h-full px-8 py-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="h-full overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                  <div className="flex flex-row-reverse ">
                    <div className="space-x-4">
                      <input
                        className="px-6 py-4 leading-tight text-black rounded-l-full focus:outline-none"
                        id="search"
                        type="text"
                        placeholder="ค้นหา"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <table className="min-w-full overflow-y-scroll divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          รหัสบันทึกการทำงาน
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          วันเวลา
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          พนักงานที่เกี่ยวข้อง
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          ประเภท
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          สถานะ
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          การจัดการ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fillterdLogStaff
                        .sort(
                          ({ log_id: previousID }, { log_id: currentID }) =>
                            previousID - currentID
                        )
                        .map((logStaff) => (
                          <tr key={logStaff.log_id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {logStaff.log_id}
                              </div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {logStaff.ThaiDatetime}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {logStaff.staffInvoked}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <div className="ml-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {handlekind(logStaff.type)}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ml-6">
                                <div className="text-sm font-medium text-gray-900">
                                  {handlestatus(logStaff.status)}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <div className="flex items-start space-x-3">
                                <button
                                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  onClick={() => {
                                    handleViewInfoLogStaff(logStaff.log_id);
                                  }}
                                >
                                  ดูข้อมูล
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"></td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffActivityPage;

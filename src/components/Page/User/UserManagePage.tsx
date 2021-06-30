import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../Model/interfaces";
import CloseIcon from "@material-ui/icons/Close";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import Button from "@material-ui/core/Button";
import AuthService from "../../../services/AuthService";
import UserService from "../../../services/UserService";

const UserManage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersID, setUserID] = useState<string>();
  const [showModal, setShowModal] = React.useState(false);
  const [search, setSearch] = useState("");
  const [fillterdUser, setFillterdUser] = useState<any[]>([]);
  const fetchUsers = () => {
    UserService.fetchUsers().then((users) => {
      setUsers(users);
    });
  };

  const handleRecoverStaff = () => {
    history.push("/RecoverUser");
  };
  const handleViewInfoStaff = (UserID: any) => {
    history.push({
      pathname: `/UserProfile/${UserID}`,
      state: { UserID: UserID },
    });
  };

  const handleDeteleUser = (accountId: any) => {
    const jsonAccountID = {
      accountId: accountId,
    };
    UserService.DeletedUser(jsonAccountID, AuthService.getAccessToken());
    window.location.reload();
    history.push("/UserManage");
  };
  const handleEditUser = (UserID: any) => {
    history.push({
      pathname: `/EditUserPage/${UserID}`,
      state: { UserID: UserID },
    });
  };
  const history = useHistory();
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFillterdUser(
      users.filter((user) => {
        return (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.accountId.toLowerCase().includes(search.toLowerCase()) ||
          user.loginType.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, users]);
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen ">
        <Header />
        <div className=" bg-gradient-to-r from-gray-100 to-gray-50">
          <div className="flex flex-col">
            <div className="px-8 py-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                  <div className="flex flex-row-reverse ">
                    <div className="space-x-5">
                      <input
                        className="px-6 py-4 leading-tight text-black rounded-l-full focus:outline-none"
                        id="search"
                        type="text"
                        placeholder="ค้นหา"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Button
                        onClick={() => handleRecoverStaff()}
                        variant="contained"
                        color="primary"
                      >
                        คืนสิทธิผู้ใช้งาน
                      </Button>
                    </div>
                  </div>
                  <table className="min-w-full overflow-y-scroll divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          เลขบัญชีผู้ใช้งาน
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          ชื่อผู้ใช้งาน
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          ประเภทผู้ใช้งาน
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
                      {fillterdUser
                        .sort((one, two) => (one > two ? -1 : 1))
                        .map((person) => (
                          <tr key={person.accountId}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {person.accountId}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-10 h-10 rounded-full"
                                    src={`${person.pictureUrl}`}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {person.name} {person.surname}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {person.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {person.loginType}
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <div className="flex items-start space-x-3">
                                <button
                                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  onClick={() => {
                                    handleViewInfoStaff(person.accountId);
                                  }}
                                >
                                  ดูข้อมูล
                                </button>
                                <button
                                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  onClick={() => {
                                    {
                                      handleEditUser(person.accountId);
                                    }
                                  }}
                                >
                                  แก้ไข
                                </button>

                                <button
                                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  onClick={() => {
                                    setUserID(person.accountId);
                                    setShowModal(true);
                                  }}
                                >
                                  ลบ
                                </button>
                                {showModal ? (
                                  <>
                                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                      <div className="relative w-auto max-w-3xl mx-auto my-6">
                                        {/*content*/}
                                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                          {/*header*/}
                                          <div className="flex items-start justify-between p-3 border-b border-solid rounded-t border-blueGray-200">
                                            <h3 className="text-2xl font-semibold text-black">
                                              ยืนยันการลบพนักงาน
                                            </h3>
                                            <button
                                              className="top-0 right-0 float-right p-1 ml-auto text-xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                              onClick={() =>
                                                setShowModal(false)
                                              }
                                            >
                                              <CloseIcon className="block w-6 h-6 text-black outline-none focus:outline-none" />
                                            </button>
                                          </div>
                                          {/*body*/}
                                          <div className="relative flex-auto p-6">
                                            <p className="my-4 text-lg leading-relaxed text-black ">
                                              คุณต้องการลบพนักงานคนนี้ออกใช่หรือไม่
                                            </p>
                                          </div>
                                          {/*footer*/}
                                          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                            <button
                                              className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                              type="button"
                                              onClick={() =>
                                                setShowModal(false)
                                              }
                                            >
                                              ยกเลิก
                                            </button>
                                            <button
                                              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                              type="button"
                                              onClick={() =>
                                                handleDeteleUser(usersID)
                                              }
                                            >
                                              ยืนยัน
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                  </>
                                ) : null}
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

export default UserManage;

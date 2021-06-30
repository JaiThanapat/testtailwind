import React from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import LockIcon from "@material-ui/icons/Lock";
import EcoIcon from "@material-ui/icons/Eco";
import { useHistory } from "react-router-dom";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import EditIcon from "@material-ui/icons/Edit";
const Sidebar = () => {
  const history = useHistory();

  function nextPage(pagename: any) {
    history.push(pagename);
  }
  return (
    <div className="w-6/12 h-screen md:w-3/12 ">
      <div className="flex justify-around py-3 mt-1 border-b ">
        <p className="text-xl font-semibold">PayRich</p>
        <p>|</p>
        <p className="text-lg text-gray-400">
          Wallet <AccountBalanceWalletIcon />
        </p>
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-4">
          <h1 className="text-gray-400">การบริการ</h1>
          <div className="">
            <div
              className="flex p-3 space-x-4 text-gray-700 cursor-pointer 0 hover:bg-gray-50 hover:text-blue-600 "
              onClick={() => nextPage("/Mainpage")}
            >
              <DonutLargeIcon className="text-gray-300 " />
              <p className="">หน้าสรุปรายการ</p>
            </div>
          </div>
          <div className="">
            <div
              className="flex p-3 space-x-4 text-gray-700 cursor-pointer 0 hover:bg-gray-50 hover:text-blue-600 "
              onClick={() => nextPage("/CheckTransaction")}
            >
              <ClearAllIcon className="text-gray-300" />
              <p className="text-gray-600">ธุรกรรม</p>
            </div>
          </div>
          <div className="">
            <div
              className="flex p-3 space-x-4 text-gray-700 cursor-pointer 0 hover:bg-gray-50 hover:text-blue-600 "
              onClick={() => nextPage("/DepositandWithdraw")}
            >
              <TransferWithinAStationIcon className="text-gray-300" />
              <p className="text-gray-600 ">ฝากเงิน - ถอนเงิน</p>
            </div>
          </div>
          <div className="">
            <div
              className="flex p-3 space-x-4 text-gray-700 cursor-pointer 0 hover:bg-gray-50 hover:text-blue-600 "
              onClick={() => nextPage("/SearchUserPage")}
            >
              <EditIcon className="text-gray-300" />
              <p className="text-gray-600 ">แก้ไขผู้ใช้งาน</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-gray-400">การจัดการ</h1>

          <div className="">
            <div
              className="flex p-3 space-x-4 text-gray-700 cursor-pointer 0 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => nextPage("/UserManage")}
            >
              <PersonIcon className="text-gray-300" />
              <p className="text-gray-600 ">ผู้ใช้งาน</p>
            </div>
          </div>

          <div className="">
            <div
              className="flex p-3 space-x-4 text-gray-700 cursor-pointer 0 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => nextPage("/Staffs")}
            >
              <LockIcon className="text-gray-300" />
              <p className="text-gray-600 ">หนักงาน</p>
            </div>
          </div>
          <div className="space-y-6">
            <div
              className="flex p-3 space-x-4 text-gray-700 cursor-pointer 0 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => nextPage("/StaffActivityPage")}
            >
              <EcoIcon className="text-gray-300" />
              <p className="text-gray-600 ">ดูรายการพนักงาน</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import react, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import LogStaffService from "../../services/LogStaffService";
import TransactionService from "../../services/TransactionService";

const ViewTransaction = () => {
  const [transactionData, setLogStafftransactionData] = useState<any>();
  const history = useHistory();
  const location = useLocation<{ TransactionID: string }>();

  async function fetchStaff() {
    await TransactionService.getTransactionInfo(
      location.state.TransactionID
    ).then((transaction) => {
      setLogStafftransactionData(transaction);
    });
  }
  const handleback = () => {
    history.push("/CheckTransaction");
  };
  const handleTransactionType = (type: any) => {
    if (type === "Deposit") {
      return "ฝากเงิน";
    } else {
      return "ถอนเงิน";
    }
  };
  const handleTransactionStatus = (status: any) => {
    if (status === "Done") {
      return "สำเร็จ";
    } else {
      return "ไม่สำเร็จ";
    }
  };
  console.log(transactionData);
  useEffect(() => {
    fetchStaff();
  }, []);
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
                              รหัสบันทึก : {transactionData?.transactionId}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              วันเวลา : {transactionData?.ThaiDate}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              พนักงานที่เกี่ยวข้อง :{" "}
                              {transactionData?.StaffInvoked}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              พนักงานที่เกี่ยวข้อง :{" "}
                              {transactionData?.transactionSender}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              ประเภท :{" "}
                              {handleTransactionType(
                                transactionData?.transactionType
                              )}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              สถานะ :{" "}
                              {handleTransactionStatus(
                                transactionData?.transactionStatus
                              )}
                            </label>
                          </div>
                          <div className="col-auto">
                            <label
                              htmlFor="name"
                              className="block px-5 pb-5 text-lg font-bold text-black"
                            >
                              จำนวนเงิน : {transactionData?.transactionBalance}
                            </label>
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

export default ViewTransaction;

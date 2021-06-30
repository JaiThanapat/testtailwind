import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Staff } from "../Model/interfaces";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import LogStaffService from "../../services/LogStaffService";
import TransactionService from "../../services/TransactionService";
type StaffListProps = {
  staff: Staff;
};

const CheckTransactionPage = () => {
  const [transactionData, settransactionData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [fillterdtransaction, setFillterdtransaction] = useState<any[]>([]);
  const fetchTransactionData = () => {
    TransactionService.getAllTransactionbyDepartment().then((logStaffs) => {
      settransactionData(logStaffs);
    });
  };

  const handleViewInfoTransaction = (TransactionID: any) => {
    history.push({
      pathname: `/ViewTransaction/${TransactionID}`,
      state: { TransactionID: TransactionID },
    });
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
  const history = useHistory();
  useEffect(() => {
    fetchTransactionData();
  }, []);
  useEffect(() => {
    setFillterdtransaction(
      transactionData.filter((transaction) => {
        return (
          transaction.ThaiDatetime.toLowerCase().includes(
            search.toLowerCase()
          ) ||
          transaction.transactionId
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.transactionPair
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          handleTransactionStatus(transaction.transactionStatus)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.transactionSender
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          handleTransactionType(transaction.transactionType)
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      })
    );
  }, [search, transactionData]);
  console.log(transactionData);
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
                    </div>
                  </div>
                  <table className="min-w-full overflow-y-scroll divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          เลขอ้างอิงใบเสร็จ
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          เวลา
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
                          เลขบัญชีของผู้ใช้งาน
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
                      {fillterdtransaction.map((transactions) => (
                        <tr key={transactions.transactionId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {transactions.transactionId}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {transactions.ThaiDatetime}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {transactions.transactionPair}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {transactions.transactionSender}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {handleTransactionType(
                                  transactions.transactionType
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {handleTransactionStatus(
                                  transactions.transactionStatus
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <div className="flex items-start space-x-3">
                              <button
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                onClick={() => {
                                  handleViewInfoTransaction(
                                    transactions.transactionId
                                  );
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

export default CheckTransactionPage;

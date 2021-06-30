import React, { useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import QrReader from "react-qr-reader";
import {
  getTransaction,
  acceptDepositTransaction,
  acceptWithdrawTransaction,
} from "../../services/TransactionService";
import { TransactionData } from "../Model/interfaces";

const DepositAndWithdrawPage = () => {
  const [Code, setCode] = useState("");
  const [transactionData, setTransactionData] = useState<TransactionData>();
  const [ErrorMessage, setErrorMessage] = useState("");

  const handleTransactionCode = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setCode(e.target.value);
    }
  };

  const handleTransactionType = (type: any) => {
    if (type === "Deposit") {
      return "ฝากเงิน";
    } else if (type == "Withdraw") {
      return "ถอนเงิน";
    } else {
      return "";
    }
  };
  const handleError = (error: Error) => {
    console.log(error);
  };
  const handleScan = async (result: any) => {
    if (result) {
      setCode(result);
      const transaction = await getTransaction(result);
      setTransactionData(await transaction);
    }
  };
  const handClickSubmitCode = async () => {
    try {
      const gettransaction = await getTransaction(Code);
      setTransactionData(gettransaction);
    } catch (error) {
      console.log(error);
      setErrorMessage("Code or Datatransaction invalid!");
      cancelTransactionData();
    }
  };

  const acceptTransactionData = async () => {
    try {
      if (transactionData?.transactionType === "Deposit") {
        acceptDepositTransaction(Code, sessionStorage.username);
        cancelTransactionData();
      } else if (transactionData?.transactionType === "Withdraw") {
        acceptWithdrawTransaction(Code, sessionStorage.username);
        cancelTransactionData();
      } else {
        cancelTransactionData();
      }
      alert("transaction success!");
    } catch (error) {
      setErrorMessage("Code or Datatransaction invalid!");
      cancelTransactionData();
    }
  };
  const cancelTransactionData = () => {
    setCode("");
    setTransactionData(undefined);
  };

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen ">
        <Header />
        <div className="h-full bg-gradient-to-r from-gray-100 to-gray-50">
          <div className="px-5 py-2 ">
            <div className="container px-10 py-5 mx-auto bg-white border-black md:py-16">
              <div className="flex flex-col space-y-6 md:flex-row md:items-center md:space-x-6">
                <div className="justify-center w-9/12 ">
                  <div className="justify-center text-xl text-center">
                    สแกน QRCODE เพื่อเติมเงินหรือถอนเงิน
                  </div>
                  <QrReader
                    delay={300}
                    style={{ wide: "100%" }}
                    onError={handleError}
                    onScan={handleScan}
                  />
                  <div className="m-6 space-y-5 text-xl text-center ">
                    ใส่รหัส 6 ตัว เพื่อเติมเงินหรือถอนเงิน
                    <input
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-3xl"
                      type="transactionCode"
                      name="transactionCode"
                      placeholder="รหัส 6 ตัว"
                      value={Code}
                      onChange={handleTransactionCode}
                      maxLength={6}
                      pattern="[0-9]*"
                    />
                    {ErrorMessage}
                    <button
                      className="relative flex justify-center w-full px-4 py-2 text-xl font-medium text-white bg-blue-600 border border-transparent rounded-md space group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handClickSubmitCode}
                    >
                      ยืนยัน
                    </button>
                  </div>
                </div>
                <div className="w-full m-6 space-y-5 bg-white">
                  <div className="max-w-md mx-auto border-4 border-black border-dashed">
                    <h1 className="my-3 text-2xl font-medium tracking-wide text-center text-black-800 md:text-4xl">
                      ข้อมูลการโอนเงิน
                    </h1>
                    <p className="mx-5 mt-5 text-lg leading-7 text-black-600">
                      รายละเอียด
                      <div className="my-3 text-lg justify-items-center">
                        <p className="my-2">
                          เลขอ้างอิง: {transactionData?.transactionId}
                        </p>
                        <p className="my-2">
                          รหัสอ้างอิง: {transactionData?.transactionCode}
                        </p>
                        <p className="my-2">
                          ชื่อผู้ทำธุรกรรม: {transactionData?.username}
                        </p>
                        <p className="my-2">
                          ประเภทธุรกรรม:{" "}
                          {handleTransactionType(
                            transactionData?.transactionType
                          )}
                        </p>
                        <p className="my-2">
                          จำนวนเงิน: {transactionData?.transactionBalance}
                        </p>
                      </div>
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="p-5">
                      <button
                        className="w-40 px-4 py-2 font-bold text-center text-white bg-blue-700 rounded-full order-blue-700 bg-blue- bg-blue hover:bg-blue-400"
                        onClick={acceptTransactionData}
                      >
                        ยืนยัน
                      </button>
                    </div>
                    <div className="p-5">
                      <button
                        className="w-40 px-4 py-2 font-bold text-center text-white bg-red-500 border border-red-700 rounded-full hover:bg-red-400"
                        onClick={cancelTransactionData}
                      >
                        ยกเลิก
                      </button>
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
export default DepositAndWithdrawPage;

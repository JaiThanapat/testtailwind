import { baseUrl } from "../config/const";
import AuthService from "./AuthService";
import StaffService from "./StaffService";

export async function acceptDepositTransaction(
  code: string,
  staffname: string
) {
  await fetch(`${baseUrl}/staff/deposit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transactionCode: code,
      username: staffname,
    }),
  });
}
export async function acceptWithdrawTransaction(
  code: string,
  staffname: string
) {
  await fetch(`${baseUrl}/staff/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transactionCode: code,
      username: staffname,
    }),
  });
}
//ลิ้งและ return transaction
export async function getTransaction(
  transactionCode: string
): Promise<any | null> {
  const res = await fetch(`${baseUrl}/staff/transaction/${transactionCode}`, {
    method: "GET",
  });
  const result = await res.json();
  return result;
}
export async function getTransactionInfo(
  transactionID: string
): Promise<any | null> {
  const res = await fetch(`${baseUrl}/transaction/${transactionID}`, {
    method: "GET",
  });
  const result = await res.json();
  return result;
}

async function getAllTransactionbyDepartment(): Promise<any | null> {
  const staff_id = await StaffService.fetchStaffbyUsername(
    AuthService.getUsername()
  );
  const staffUsername = staff_id["staff_id"];
  const res = await fetch(
    `${baseUrl}/staff/transaction/staffid/${staffUsername}`,
    {
      method: "GET",
    }
  );
  const result = await res.json();
  return result;
}

export default {
  acceptDepositTransaction,
  acceptWithdrawTransaction,
  getTransaction,
  getAllTransactionbyDepartment,
  getTransactionInfo,
};

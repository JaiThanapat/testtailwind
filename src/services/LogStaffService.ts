import {  LogStaff } from '../components/Model/interfaces';
import { baseUrl } from "../config/const";

export async function fetchLogStaffs(): Promise<LogStaff[]> {
  const res = await fetch(`${baseUrl}/log-manage-staff`);
  const Logstaffs = await res.json();
  return Logstaffs;
}
export async function fetchLogStaff(logid: string): Promise<LogStaff> {
  const res = await fetch(`${baseUrl}/log-manage-staff/${logid}`);
  const Logstaff = await res.json();
  return Logstaff;
}

export default {
  fetchLogStaffs,
  fetchLogStaff,
};

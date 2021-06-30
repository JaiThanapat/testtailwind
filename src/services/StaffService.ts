import { Staff } from "../components/Model/interfaces";
import { baseUrl } from "../config/const";

export async function fetchStaffs(): Promise<Staff[]> {
  const res = await fetch(`${baseUrl}/staff`);
  const staffs = await res.json();
  return staffs;
}
export async function fetchDisableStaffs(): Promise<Staff[]> {
  const res = await fetch(`${baseUrl}/staff/disable`);
  const staffs = await res.json();
  return staffs;
}
export async function fetchStaff(staffid: string): Promise<Staff> {
  const res = await fetch(`${baseUrl}/staff/${staffid}`);
  const staff = await res.json();
  return staff;
}

export async function fetchStaffbyUsername(Username: any): Promise<any> {
  const res = await fetch(`${baseUrl}/staff/staff/${Username}`);
  const staff = await res.json();
  return staff;
}

async function CreateStaff(
  newStaff: any,
  accessToken: string
): Promise<Staff | null> {
  const res = fetch(`${baseUrl}/staff`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: newStaff,
  });
  const savedNewStaff: Staff = await (await res).json();
  if (savedNewStaff.staff_id !== undefined) {
    return savedNewStaff;
  } else {
    return null;
  }
}
async function UpdateStaffWithPhoto(
  newStaff: any,
  accessToken: string,
  staffid: string
): Promise<Staff | null> {
  const res = await fetch(`${baseUrl}/staff/photo/${staffid}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: newStaff,
  });
  const savedUpdateStaff: Staff = await res.json();
  if (savedUpdateStaff.staff_id !== undefined) {
    return savedUpdateStaff;
  } else {
    return null;
  }
}

async function UpdateStaff(
  newStaff: any,
  accessToken: string,
  staffid: string
): Promise<Staff | null> {
  const res = await fetch(`${baseUrl}/staff/update/${staffid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newStaff),
  });
  const savedUpdateStaff: Staff = await res.json();
  if (savedUpdateStaff.staff_id !== undefined) {
    return savedUpdateStaff;
  } else {
    return null;
  }
}
async function DeletedStaff(
  staff_id: string,
  accessToken: string
): Promise<any> {
  const res = await fetch(`${baseUrl}/staff/${staff_id}`, {
    method: "Delete",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const DeletedStaff: Staff = await res.json();
  if (DeletedStaff.staff_id !== undefined) {
    return DeletedStaff;
  } else {
    return null;
  }
}
async function activateStaff(
  staff_id: string,
  accessToken: string
): Promise<any> {
  await fetch(`${baseUrl}/staff/disable/${staff_id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
export default {
  fetchStaffs,
  CreateStaff,
  DeletedStaff,
  UpdateStaff,
  fetchStaff,
  fetchDisableStaffs,
  activateStaff,
  UpdateStaffWithPhoto,
  fetchStaffbyUsername,
};

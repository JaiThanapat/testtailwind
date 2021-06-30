import { User } from "../components/Model/interfaces";
import { baseUrl } from "../config/const";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${baseUrl}/user`);
  const users = await res.json();
  return users;
}
export async function fetchUser(userID: string): Promise<User> {
  const res = await fetch(`${baseUrl}/user/info/${userID}`);
  const user = await res.json();
  return user;
}
export async function fetchUserbyAccountID(accountID: string): Promise<User> {
  const res = await fetch(`${baseUrl}/user/infouser/${accountID}`);
  const user = await res.json();
  return user;
}

export async function fetchDisableUsers(): Promise<User[]> {
  const res = await fetch(`${baseUrl}/user/disable`);
  const users = await res.json();
  return users;
}
async function DeletedUser(
  accountUser: any,
  accessToken: string
): Promise<any> {
  const res = await fetch(`${baseUrl}/user/remove`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(accountUser),
  });
  const DeletedUser: User = await res.json();
  if (DeletedUser.accountId !== undefined) {
    return DeletedUser;
  } else {
    return null;
  }
}

async function activateUser(
  accountUser: any,
  accessToken: string
): Promise<any> {
  const res = await fetch(`${baseUrl}/user/recover`, {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(accountUser),
  });
  const activateUser: User = await res.json();
  if (activateUser.accountId !== undefined) {
    return activateUser;
  } else {
    return null;
  }
}
async function UpdateUser(
  updateUser: any,
  accessToken: string
): Promise<User | null> {
  const res = await fetch(`${baseUrl}/staff/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updateUser),
  });
  const savedUpdateUser: User = await res.json();
  if (savedUpdateUser.accountId !== undefined) {
    return savedUpdateUser;
  } else {
    return null;
  }
}

export default {
  fetchUsers,
  fetchUser,
  fetchUserbyAccountID,
  DeletedUser,
  fetchDisableUsers,
  activateUser,
  UpdateUser,
};

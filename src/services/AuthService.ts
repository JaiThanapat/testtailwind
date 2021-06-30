import { baseUrl } from "../config/const";

async function LoginUser(
  username: string,
  password: string
): Promise<any | null> {
  const res = await fetch(`${baseUrl}/staff/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const result = await res.json();
  if (result.accessToken) {
    sessionStorage.setItem("accessToken", result.accessToken);
    sessionStorage.setItem("username", result.username);
    return result;
  } else {
    return null;
  }
}
function isUserLoggedIn(): boolean {
  return sessionStorage.accessToken !== undefined;
}

async function CheckUserTokenExpire(): Promise<boolean> {
  const seesionToken = getAccessToken();
  if (seesionToken === undefined) {
    return false;
  } else {
    const res = await fetch(`${baseUrl}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${seesionToken}`,
      },
    });
    const user = res.json
    if(user === undefined){
        return false
    }
    return true
  }
}

function getUsername(): string | null {
  if (isUserLoggedIn()) {
    return sessionStorage.username;
  } else {
    return null;
  }
}
function logoutUser(): void {
  if (isUserLoggedIn()) {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
  }
}
function getAccessToken(): string {
  return sessionStorage.accessToken;
}

export default {
  LoginUser,
  isUserLoggedIn,
  getUsername,
  logoutUser,
  getAccessToken,
};

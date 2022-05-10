import Cookies from "js-cookie";
export function getToken(): string | undefined {
  return Cookies.get("token");
}

export function removeToken() {
  return Cookies.remove("token");
}

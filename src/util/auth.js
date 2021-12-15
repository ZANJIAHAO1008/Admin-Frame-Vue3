import Cookies from "js-cookie";
export function getToken() {
    return Cookies.get("token")
}
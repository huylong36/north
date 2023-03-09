import { UserInfo } from "../../../models/user";
import { ApiConfig } from "./config";
export const apiCreateUser = async (payload: { userInfo: UserInfo }) => {
    return ApiConfig('/register-user', payload);
}
export const apiLogin = async (payload: { userInfo: UserInfo }) => {
    return ApiConfig('/login', payload);
}
export const apiGetUserFromToken = async () => {
    return ApiConfig('/get-user-from-token', {}, 'GET')
}
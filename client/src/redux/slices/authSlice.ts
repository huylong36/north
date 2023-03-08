import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../../../models/user"
import { apiCreateUser, apiGetUserFromToken, apiLogin } from "../../api/auth";
import { RootState } from "../store";
import { useAppDispatch } from "./hook";
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

export interface UserState {
    userInfo: UserInfo | null;
    loading: boolean;
}
const initialState: UserState = {
    userInfo: null,
    loading: false
};
export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestRegister.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestRegister.fulfilled, (state, action: PayloadAction<UserInfo>) => {
            state.loading = false;
            state.userInfo = action.payload;
        })
        builder.addCase(requestLogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestLogin.fulfilled, (state, action: PayloadAction<UserInfo>) => {
            state.loading = false;
            state.userInfo = action.payload;
        })
    }
})


export const requestRegister = createAsyncThunk('auth/register', async (props: { userInfo: UserInfo }) => {
    const res = await apiCreateUser(props);
    Cookies.set('token', res.data.accessToken);
    return res.data;
})
export const requestLogin = createAsyncThunk('auth/login', async (props: { userInfo: UserInfo }) => {
    try {
        const res = await apiLogin(props);
        return res.data
    } catch (error) {
        console.log(error.response.data.message);
    }
    return;
})
export const requestGetUserFromToken = createAsyncThunk('auth/getUserFromToken', async (props: string) => {
    try {
        const res = await apiGetUserFromToken(props);
        return res.data.accessToken
    } catch (error) {
        console.log(error)
    }
    return;
})

export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;
export const { loadUserInfo } = authSlice.actions;
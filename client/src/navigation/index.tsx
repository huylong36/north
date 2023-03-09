import { LayoutAdmin } from '../layout/admin';
import { LayoutHome } from '../layout/home';
import { authState, requestGetUserFromToken } from '../redux/slices/authSlice';
import { useAppSelector, useAppDispatch } from '../redux/slices/hook';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { LoadingComponent } from '../component/LoadingComponent';
export const AppNavigation = () => {
    const token = Cookies.get("token")
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const authReducer = useAppSelector(authState)
    useEffect(() => {
        if (token) {
            dispatch(requestGetUserFromToken())
        }
    }, []);
    const renderHome = () => {
        return (
            <LayoutHome />
        )
    }
    const renderHomeAdmin = () => {

        return (
            <LayoutAdmin />
        )
    }
    return <>
        {authReducer.userInfo?.userRole == 0 ? renderHomeAdmin() : renderHome()}
    </>
}
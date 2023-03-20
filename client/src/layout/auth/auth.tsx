import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { DialogComponent } from "../../component/DialogComponent";
import { FCTextField } from "../../component/TextFieldComponent";
import { authState, requestLogin, requestRegister } from "../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/slices/hook";
import './style.scss';
interface ICreateUser {
    open: boolean;
    onClose: () => void;
}
export const showErrForm = (data: any) => {
    return (
        <p className='text_error'>{data}</p>
    )
}
const AuthSchema = yup
    .object()
    .shape({
        username: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
        password: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
        phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ"),
        email: yup.string().email("Email không đúng định dạng"),
    })
    .required();
export const Auth = ({ open, onClose }: ICreateUser) => {

    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm({
        resolver: yupResolver(AuthSchema)
    });
    const [isChangeAuth, setChangeAuth] = useState(false)

    const dispatch = useAppDispatch();
    const history = useNavigate();
    const authReducer = useAppSelector(authState)
    const hanldeLogin = (data: any) => {
        console.log('xxxx');
        try {
            enqueueSnackbar("Đăng nhập thành công", {
                variant: "success"
            })
            dispatch(requestLogin(data))
            onClose();
        } catch (error) {
            console.log('error.response.message', error.response.message);
            console.log(error.response.message);
        }
    }
    const hanldeRegister = (data: any) => {
        if (data.password !== data.passwordSecond) {
            enqueueSnackbar("Mật khẩu không trùng khớp", {
                variant: "error"
            })
        } else {
            enqueueSnackbar("Đăng ký thành công !", { variant: "success" })
            dispatch(requestRegister(data));
            onClose();
        }
    }
    const changeAuth = () => {
        setChangeAuth(!isChangeAuth)
    }
    const renderLogin = () => {
        return (
            <>
                <form onSubmit={handleSubmit(hanldeLogin)}>
                    <Grid container spacing={2} className="form-create-product">
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Họ và tên</span>
                                <span className="text_error">*</span>
                                <FCTextField name="username" register={register} size="small" placeholder="Họ và tên" />
                                {errors.username && showErrForm(errors.username.message)}
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Mật khẩu</span>
                                <span className="text_error">*</span>
                                <FCTextField name="password" register={register} size="small" type="password" placeholder="Mật khẩu" />
                                {errors.password && showErrForm(errors.password.message)}
                            </div>
                        </Grid>
                    </Grid>
                    <div className="btn-auth">
                        <Button type="submit" variant="contained" color="success"> {isSubmitting ? "loading..." : "Đăng nhập"}</Button>
                    </div>
                </form>
                <div className="change-auth">
                    Bạn chưa có tài khoản ? <Button onClick={changeAuth}>Đăng ký</Button>
                </div>
            </>
        )
    }
    const renderRegister = () => {
        return (
            <>
                <form onSubmit={handleSubmit(hanldeRegister)}>
                    <Grid container spacing={2} className="form-create-product">
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Họ và tên</span>
                                <span className="text_error">*</span>
                                <FCTextField name="username" register={register} size="small" placeholder="Họ và tên" />
                                {errors.name && showErrForm(errors.name.message)}
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Mật khẩu</span>
                                <span className="text_error">*</span>
                                <FCTextField name="password" register={register} size="small" type="password" placeholder="Mật khẩu" />
                                {errors.password && showErrForm(errors.password.message)}
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Xác nhận mật khẩu</span>
                                <span className="text_error">*</span>
                                <FCTextField name="passwordSecond" register={register} size="small" type="password" placeholder="Mật khẩu" />
                                {errors.passwordSecond && showErrForm(errors.passwordSecond.message)}
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Số điện thoại</span>
                                <span className="text_error">*</span>
                                <FCTextField name="phone" register={register} size="small" type="text" placeholder="Số điện thoại" />
                                {errors.phone && showErrForm(errors.phone.message)}
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Email</span>
                                <span className="text_error">*</span>
                                <FCTextField name="email" register={register} size="small" type="email" placeholder="Email" />
                                {errors.email && showErrForm(errors.email.message)}
                            </div>
                        </Grid>
                    </Grid>
                    <div className="btn-auth">
                        <Button type="submit" variant="contained" color="success">Đăng ký</Button>
                    </div>
                </form>
                <div className="change-auth">
                    Bạn đã có tài khoản ? <Button onClick={changeAuth}>Đăng Nhập</Button>
                </div>
            </>
        )
    }
    return (

        <DialogComponent
            open={open}
            title={isChangeAuth ? "Đăng ký" : "Đăng nhập"}
            size="sm"
            className="dialog-component"
            handleClose={() => onClose()}
            content={isChangeAuth ? renderRegister() : renderLogin()}
        />
    )
}
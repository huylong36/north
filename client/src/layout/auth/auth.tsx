import { Button, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { DialogComponent } from "../../component/DialogComponent";
import { showErrForm } from "../../screens/admin/product/create";
import { FCTextField } from "../../component/TextFieldComponent";
import { requestLogin, requestRegister } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/slices/hook";
import { useNavigate } from 'react-router-dom';
import './style.scss';
interface ICreateUser {
    open: boolean;
    onClose: () => void;
}
export const Auth = ({ open, onClose }: ICreateUser) => {

    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isChangeAuth, setChangeAuth] = useState(false)
    const dispatch = useAppDispatch();
    const history = useNavigate();


    const hanldeLogin = (data: any) => {
        try {
            dispatch(requestLogin(data))
            onClose();
        } catch (error) {
            console.log(1111, error.message);
        }
    }
    const hanldeRegister = (data: any) => {
        try {
            enqueueSnackbar("Đăng ký thành công !", { variant: "success" })
            dispatch(requestRegister(data));
            onClose();
        } catch (error) {
            enqueueSnackbar("Đăng ký thất bại !", { variant: "error" })
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
                                {errors.name && showErrForm(errors.name.message)}
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Mật khẩu</span>
                                <span className="text_error">*</span>
                                <FCTextField name="password" register={register} size="small" type="password" placeholder="Mật khẩu" />
                                {errors.price && showErrForm(errors.price.message)}
                            </div>
                        </Grid>
                    </Grid>
                    <div className="btn-auth">
                        <Button type="submit" variant="contained" color="success">Đăng nhập</Button>
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
                                {errors.price && showErrForm(errors.price.message)}
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Số điện thoại</span>
                                <span className="text_error">*</span>
                                <FCTextField name="phone" register={register} size="small" type="text" placeholder="Số điện thoại" />
                                {errors.price && showErrForm(errors.price.message)}
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ margin: "0.7rem 0" }}>
                                <span>Email</span>
                                <span className="text_error">*</span>
                                <FCTextField name="email" register={register} size="small" type="email" placeholder="Email" />
                                {errors.price && showErrForm(errors.price.message)}
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
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { FCTextField } from "../../../component/TextFieldComponent";
import { useAppDispatch } from "../../../redux/slices/hook";
import { requestCreateProduct } from "../../../redux/slices/productSlice";
import './style.scss';
import Axios from "axios";
interface ICreateProduct {
    open: boolean;
    onClose: () => void;
}
export const showErrForm = (data: any) => {
    return (
        <p className='text_error'>{data}</p>
    )
}
export const CreateProduct = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    const [images, setImages] = useState<string>();
    const submitProduct = (data: any) => {
        dispatch(requestCreateProduct({ ...data, images }))
    }
    const onChangeImage = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "m4jso0bw");
        Axios.post(
            "https://api.cloudinary.com/v1_1/dwn6likgj/image/upload",
            formData
        )
            .then((res) => {
                setImages(res.data.url);
            })
            .catch((error) => { });
    };

    return <>
        <form onSubmit={handleSubmit(submitProduct)}>
            <Grid container spacing={2} className="form-create-product">
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Tên sản phẩm</span>
                        <span className="text_error">*</span>
                        <FCTextField name="name" register={register} size="small" placeholder="Tên" />
                        {errors.name && showErrForm(errors.name.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Giá sản phẩm</span>
                        <span className="text_error">*</span>
                        <FCTextField name="price" register={register} size="small" placeholder="Giá sản phẩm" />
                        {errors.price && showErrForm(errors.price.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Mã sản phẩm</span>
                        <span className="text_error">*</span>
                        <FCTextField name="code" register={register} size="small" placeholder="Mã sản phẩm" />
                        {errors.code && showErrForm(errors.code.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Số thứ tự</span>
                        <span className="text_error">*</span>
                        <FCTextField name="stt" register={register} size="small" placeholder="Số thứ tự" />
                        {errors.stt && showErrForm(errors.stt.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Mô tả</span>
                        <span className="text_error">*</span>
                        <FCTextField name="description" register={register} size="small" placeholder="Mô tả" />
                        {errors.description && showErrForm(errors.description.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Ảnh sản phẩm</span>
                        <span className="text_error">*</span>
                        <FCTextField name="images" type="file" register={register} size="small" placeholder="Mô tả"
                            onChange={(event) => {
                                onChangeImage(event.target.files);
                            }}

                        />
                        <div className="image-review">
                            <img src={images} />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Button type="submit">Tạo</Button>
        </form>
    </>

}
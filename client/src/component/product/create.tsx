import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/productSlice";
import { DialogComponent } from "../DialogComponent";
import { FCTextField } from "../TextFieldComponent";
import './style.scss';
interface ICreateProduct {
    open: boolean;
    onClose: () => void;
}
export const showErrForm = (data: any) => {
    return (
        <p className='text_error'>{data}</p>
    )
}
export const CreateProduct = ({ open, onClose }: ICreateProduct) => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const submitProduct = (data: any) => {
        console.log(data);
        dispatch(createProduct({ ...data, images }))
    }
    const onChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const renderContentCreateProduct = () => {
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
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={5}
                                dataURLKey="data_url"
                            >
                                {({ onImageUpload, onImageRemoveAll }) => (
                                    <div className="upload-and-show">
                                        <button className="upload-image" onClick={onImageUpload}>Upload</button>
                                        <button onClick={onImageRemoveAll}>Remove Image</button>
                                        <div className="list-image-upload">
                                            {images.map((image, index) => (
                                                <div key={index} >
                                                    <img src={image['data_url']} alt="" width="100" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </Grid>
                </Grid>
                <Button type="submit">Tạo</Button>
            </form>
        </>
    }


    return <>
        <DialogComponent
            open={open}
            title="Create Product"
            size="md"
            handleClose={() => onClose()}
            content={renderContentCreateProduct()}
        />
    </>

}
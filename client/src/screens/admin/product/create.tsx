import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import Axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { Product } from "../../../../../models/product";
import { FCEditor } from "../../../component/CKEditorComponent";
import { FCTextField } from "../../../component/TextFieldComponent";
import { categoryState, requestLoadCategory } from "../../../redux/slices/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/slices/hook";
import { productState, requestCreateProduct, requestGetDetailProduct, requestUpdateProduct } from "../../../redux/slices/productSlice";
import './style.scss';
export const showErrForm = (data: any) => {
    return (
        <p className='text_error'>{data}</p>
    )
}
const ProductSchema = yup
    .object()
    .shape({
        name: yup.string().required('Vui lòng điền tên sản phẩm'),
        price: yup.string().required('Vui lòng điền giá sản phẩm'),
        code: yup.string().required('Vui lòng điền mã sản phẩm'),
        stt: yup.string().required('Vui lòng điền số thứ tự'),
    })
    .required();
export const CreateProduct = () => {
    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(ProductSchema)
    });
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [image, setImage] = useState<string>();
    const [imagesPreview, setImagesPreview] = useState([]);
    const [description, setDescription] = useState('');
    const [subbject, setSubject] = useState('');
    const productSelector = useAppSelector(productState);
    const categorySelector = useAppSelector(categoryState);
    useEffect(() => {
        dispatch(requestLoadCategory())
    }, [])
    const item = productSelector.productInfo;
    useEffect(() => {
        setValue("name", item?.name);
        setValue("price", item?.price);
        setValue("code", item?.code);
        setValue("stt", item?.stt);
        setValue("image", item?.image);
        setValue("imagesPreview", item?.imagesPreview);
    }, [item])

    useEffect(() => {
        const handleLoadDetail = async () => {
            try {
                if (id) {
                    const res = await dispatch(
                        requestGetDetailProduct({ id })
                    )
                    unwrapResult(res)
                }
            } catch (err) {
                enqueueSnackbar("Không thể tải danh sách sản phẩm", {
                    variant: "error"
                })
            }
        }
        handleLoadDetail()
    }, [])
    const handleChangeSubject = (event) => {
        setSubject(event.target.value)
    }
    const submitProduct = async (data: any) => {
        const productInfo: Product = {
            _id: data._id,
            name: data.name,
            price: data.price,
            code: data.code,
            stt: data.stt,
            image: image,
            imagesPreview: imagesPreview,
            description: description,
            category: subbject
        }
        try {
            if (!id) {
                const actionResult = await dispatch(requestCreateProduct(productInfo))
                unwrapResult(actionResult);
                enqueueSnackbar("Tạo sản phẩm thành công !", {
                    variant: "success"
                })
                reset();
            } else {
                const actionResult = await dispatch(requestUpdateProduct(productInfo))
                unwrapResult(actionResult);
                enqueueSnackbar("Cập nhật sản phẩm thành công", { variant: "success" })
            }
        } catch (error) {
            enqueueSnackbar("Tạo danh sách thất bại, vui lòng thử lại", {
                variant: "error"
            })
        }

    }
    const { id } = useParams<{ id: any }>();



    const onChangeImage = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "m4jso0bw");
        Axios.post(
            "https://api.cloudinary.com/v1_1/dwn6likgj/image/upload",
            formData
        )
            .then((res) => {
                console.log(res);
                setImage(res.data.url);
            })
            .catch((error) => { });
    };


    const onChangListImage = (files) => {
        const formData = new FormData();
        for (let index = 0; index < files.length; index++) {
            formData.append("file", files[index]);
            formData.append("upload_preset", "m4jso0bw");
        }
        Axios.post(
            "https://api.cloudinary.com/v1_1/dwn6likgj/image/upload",
            formData
        )
            .then((res) => {
                const newList = [...imagesPreview];
                newList.push(res.data.url);
                setImagesPreview(newList);
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
                        <FCTextField defaultValue={id ? item?.name : ""}
                            name="name" register={register}
                            size="small" placeholder="Tên" />

                        {errors.name && showErrForm(errors.name.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Giá sản phẩm</span>
                        <span className="text_error">*</span>
                        <FCTextField name="price" defaultValue={id ? item?.price : 0}
                            register={register} size="small" type="number"
                            placeholder="Giá sản phẩm" />
                        {errors.price && showErrForm(errors.price.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Mã sản phẩm</span>
                        <span className="text_error">*</span>
                        <FCTextField name="code" defaultValue={id ? item?.code : ""} register={register} size="small" placeholder="Mã sản phẩm" inputProps={{
                            step: "0.01"
                        }} />
                        {errors.code && showErrForm(errors.code.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Số thứ tự</span>
                        <span className="text_error">*</span>
                        <FCTextField name="stt" defaultValue={id ? item?.stt : 0} register={register} size="small" type="number" placeholder="Số thứ tự" />
                        {errors.stt && showErrForm(errors.stt.message)}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Ảnh sản phẩm</span>
                        <span className="text_error">*</span>
                        <FCTextField name="image" type="file" register={register} size="small"
                            onChange={(event) => {
                                onChangeImage(event.target.files);
                            }}

                        />
                        {item && <div className="image-review">
                            <img src={id ? item?.image : ''} />
                        </div>}
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div style={{ margin: "0.7rem 0" }}>
                        <span>Ảnh preview</span>
                        <span className="text_error">*</span>
                        <FCTextField name="imagesPreview" type="file" register={register} size="small"
                            onChange={(event) => {
                                onChangListImage(event.target.files);
                            }}

                        />

                        <div className="list-preview-image">
                            {item?.imagesPreview?.map((imagePreview: string) => (
                                <div className="image-review" >
                                    <img src={id ? imagePreview : ""} />
                                </div>
                            ))}
                        </div>

                    </div>
                </Grid>
                <Grid item sm={6}>
                    <FormControl style={{ marginTop: "30px", width: "100%" }}>
                        <InputLabel htmlFor="demo-simple-select-label" className="custom-select-label"> Danh mục</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subbject}
                            onChange={handleChangeSubject}
                            defaultValue="Choose subject"
                            variant="outlined"
                            label="outlined"
                        >
                            {categorySelector?.categories?.map((item) => (
                                <MenuItem key={item._id} value={item._id}>{item?.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <FCEditor handleChangeContent={(content: string) => setDescription(content)} defaultValue={id ? item?.description : ""} height={300} />
            </Grid>
            <Button type="submit">{id ? "Sửa" : "Tạo"}</Button>
        </form>
    </>

}
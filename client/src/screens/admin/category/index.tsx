import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid } from "@material-ui/core"
import { unwrapResult } from "@reduxjs/toolkit"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { DialogComponent } from "../../../component/DialogComponent"
import { FCConfirmDelete } from "../../../component/FCConfirmDelete"
import { FCTextField } from "../../../component/TextFieldComponent"
import { categoryState, requestCreateCategory, requestDeleteCategory, requestEditCategory, requestLoadCategory } from "../../../redux/slices/categorySlice"
import { useAppDispatch, useAppSelector } from "../../../redux/slices/hook"
import './style.scss'
const CategorySchema = yup
    .object()
    .shape({
        name: yup.string().required('Vui lòng nhập tên danh mục'),
    })
    .required();
export const showErrForm = (data: any) => {
    return (
        <p className='text_error'>{data}</p>
    )
}
export const CategoryPanel = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [isEdit, setEdit] = useState<boolean>(true)
    const [item, setItem] = useState<any>()
    const [itemDelete, setItemDelete] = useState<any>()
    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(CategorySchema)
    });
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const categorySelector = useAppSelector(categoryState)
    const createCategory = () => {
        setOpen(!open)
        setEdit(false)
        reset();
    }
    useEffect(() => {
        dispatch(requestLoadCategory())
    }, [])
    const submitCategory = async (data: any) => {
        const categoryInfo: any = {
            _id: item._id,
            name: data.name,
            status: data.status
        }
        try {
            if (isEdit) {
                setOpen(false)
                await dispatch(requestEditCategory(categoryInfo))
                enqueueSnackbar("Sửa danh mục thành công !", {
                    variant: "success"
                })
                reset();
                dispatch(requestLoadCategory())
            } else {
                setOpen(false)
                await dispatch(requestCreateCategory(data))
                reset();
                enqueueSnackbar("Tạo danh mục thành công !", {
                    variant: "success"
                })
                dispatch(requestLoadCategory())
            }
        } catch (error) {
            enqueueSnackbar("Tạo danh mục thất bại !", {
                variant: "error"
            })
        }
    }
    const editCategory = (category) => {
        setOpen(!open)
        setItem(category)
        setEdit(true)
        setValue("name", category?.name)
    }
    const hanleDeleteCategory = (itemDelete) => {
        setOpenDelete(true)
        setItemDelete(itemDelete)
    }
    const handleDeleteCategory = async (category) => {
        try {
            const actionResult = await dispatch(requestDeleteCategory(category))
            const res = unwrapResult(actionResult)
            enqueueSnackbar(`Xoá danh mục ${res?.name} thành công`, {
                variant: "success"
            })
            dispatch(requestLoadCategory())
        } catch (error) {
            enqueueSnackbar("Xoá danh mục thất bại", { variant: "error" })
        }
        setOpenDelete(!openDelete);

    }
    const renderCategory = () => {
        return (
            <form onSubmit={handleSubmit(submitCategory)}>
                <Grid container spacing={2} className="form-create-product">
                    <Grid item sm={12}>
                        <div style={{ margin: "0.7rem 0" }}>
                            <span>Tên danh mục</span>
                            <span className="text_error">*</span>
                            <FCTextField
                                name="name" register={register}
                                size="small" placeholder="Tên" />

                            {errors.name && showErrForm(errors.name.message)}
                        </div>
                    </Grid>
                </Grid>
                <Button type="submit">{isEdit ? "Sửa" : "Tạo"}</Button>
            </form>
        )
    }
    return <>
        <div>
            <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={createCategory}>Tạo danh mục</Button>
        </div>

        <DialogComponent
            open={open}
            title={isEdit ? "Sửa danh mục" : "Tạo danh mục"}
            size="sm"
            className="dialog-component"
            handleClose={() => setOpen(!open)}
            content={renderCategory()}
            key={Math.random()}
        />
        <Grid container className="wrapper-container">
            {categorySelector.categories.length > 0 &&
                categorySelector.categories?.map((category) => (
                    <Grid key={category.name} item md={12} className="item-category">
                        <div> {category?.name}  </div>
                        <div className="actions-category">
                            <Button variant="contained" color="primary" onClick={() => editCategory(category)}>Sửa</Button>
                            <Button variant="contained" color="secondary" onClick={() => hanleDeleteCategory(category)} >Xoá</Button>
                        </div>
                    </Grid>
                ))}
        </Grid>
        <FCConfirmDelete
            open={openDelete}
            handleClose={() => {
                setOpen(!open)
            }}
            title={"Xác nhận xoá"}
            textSuggest={true}
            handleConfirm={async () => handleDeleteCategory(itemDelete)}
        />
    </>
}
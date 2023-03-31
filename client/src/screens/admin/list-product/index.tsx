import { Grid } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Product } from "../../../../../models/product";
import { FCConfirmDelete } from "../../../component/FCConfirmDelete";
import { useAppDispatch, useAppSelector } from "../../../redux/slices/hook";
import { productState, requestDeleteProduct, requestGetAllProduct, requestGetDetailProduct } from "../../../redux/slices/productSlice";
import { ItemProduct } from "./ItemProduct";
import './style.scss';
export const ListProduct = () => {
    const dispatch = useAppDispatch();
    const appSelector = useAppSelector(productState);
    const location = useLocation();
    const [open, setOpen] = useState<boolean>(false)
    const [item, setItem] = useState<Product>()
    useEffect(() => {
        dispatch(requestGetAllProduct({ skip: 0, limit: 10 }))
    }, [])
    const handleDelete = (product) => {
        setOpen(true);
        setItem(product);
    }
    const { enqueueSnackbar } = useSnackbar()
    const handleDeleteProduct = async (product) => {
        try {
            const actionResult = await dispatch(requestDeleteProduct(product))
            const res = unwrapResult(actionResult)
            enqueueSnackbar(`Xoá sản phẩm ${res?.name} thành công`, {
                variant: "success"
            })
            dispatch(requestGetAllProduct({ skip: 0, limit: 10 }))
        } catch (error) {
            enqueueSnackbar("Xoá sản phẩm thất bại", { variant: "error" })
        }
        setOpen(!open);
    }
    return <> {appSelector.products.length <= 0 && !appSelector.loading ? <div className="product-empty">Không có sản phẩm nào !</div> :
        <Grid container spacing={5} className="wrapper-product">
            {appSelector.products?.map((product: Product) => (
                <ItemProduct key={product?._id} item={product} handleDelete={() => handleDelete(product)} />
            ))}
        </Grid>
    }
        <FCConfirmDelete
            open={open}
            handleClose={() => {
                setOpen(!open)
            }}
            title={"Xác nhận xoá"}
            textSuggest={true}
            handleConfirm={async () => handleDeleteProduct(item)}
        />
    </>
}
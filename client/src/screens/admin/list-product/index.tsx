import { Grid } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Product } from "../../../../../models/product";
import { useAppDispatch, useAppSelector } from "../../../redux/slices/hook";
import { productState, requestGetAllProduct, requestGetDetailProduct } from "../../../redux/slices/productSlice";
import { ItemProduct } from "./ItemProduct";
import './style.scss';
export const ListProduct = () => {
    const dispatch = useAppDispatch();
    const appSelector = useAppSelector(productState);
    const location = useLocation();
    useEffect(() => {
        dispatch(requestGetAllProduct({ skip: 0, limit: 10 }))
    }, [])
    return <> {appSelector.products.length <= 0 && !appSelector.loading ? <div className="product-empty">Không có sản phẩm nào !</div> :
        <Grid container spacing={5}>
            {appSelector.products?.map((product: Product) => (
                <ItemProduct key={product?._id} item={product} />
            ))}
        </Grid>
    }
    </>
}
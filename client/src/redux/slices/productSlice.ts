import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { Product } from '../../../../models/product'
import { apiCreateProduct, apiGetAllProduct, apiUpdateProduct, getDetailProduct } from '../../api/product';
import { RootState } from '../store';
import _ from "lodash";
export interface ProductState {
    products: Product[] | null;
    loading: boolean;
}
const initialState: ProductState = {
    products: [],
    loading: false
};
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        loadUserInfo: (state) => {
            state.loading = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestCreateProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestCreateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.products = state.products.concat(action.payload)
            state.loading = false;
        })
        builder.addCase(requestGetAllProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestGetAllProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload
        })
        builder.addCase(requestGetDetailProduct.pending, (state) => {
            state.loading = true
        })

        builder.addCase(requestGetDetailProduct.fulfilled, (state, action: PayloadAction<Product>) => {

        })
        builder.addCase(requestUpdateProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestUpdateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            const index = _.findIndex(state.products, { _id: action.payload._id });
            state.products.splice(index, 1, action.payload);
            state.loading = false;
        })
    }
})
export const requestCreateProduct = createAsyncThunk('product/create', async (props: { product: Product }) => {
    const res = await apiCreateProduct(props);

    return res.data.data;
})
export const requestGetAllProduct = createAsyncThunk('product/get-all-products', async (props: { skip: number, limit: number }) => {
    const res = await apiGetAllProduct(props);
    return res.data.products;
})
export const requestGetDetailProduct = createAsyncThunk('product/get-detail-product', async (props: { id: string }) => {
    const res = await getDetailProduct(props);
    return res.data.detail;
})
export const requestUpdateProduct = createAsyncThunk('product/update-product', async (props: { id: string }) => {
    const res = await apiUpdateProduct(props);
    return res.data.update;
})
export const productState = (state: RootState) => state.product
export default productSlice.reducer;
export const { loadUserInfo } = productSlice.actions;
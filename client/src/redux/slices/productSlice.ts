import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../../models/product'
import { apiCreateProduct, apiGetAllProduct } from '../../api/product';
import { RootState } from '../store';
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
            state.loading = false;
            state.products = [...state.products , action.payload];
        })
        builder.addCase(requestGetAllProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestGetAllProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload
        })
    }
})
export const requestCreateProduct = createAsyncThunk('product/create', async (props: { product: Product, urlImage: string }) => {
    const res = await apiCreateProduct(props);
    console.log({res});
    
    return res.data.data;
})
export const requestGetAllProduct = createAsyncThunk('product/get-all-products', async (props: { skip: number, limit: number }) => {
    const res = await apiGetAllProduct(props);
    return res.data.products;
})
export const productState = (state: RootState) => state.product
export default productSlice.reducer;
export const { loadUserInfo } = productSlice.actions;
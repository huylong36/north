import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../../models/product'
import { apiCreateProduct } from '../../api/product';
import { RootState } from '../store';
export interface ProductState {
    product: Product | null;
    loading: boolean;
}
const initialState: ProductState = {
    product: null,
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
            state.product = action.payload;
        })
    }
})
export const requestCreateProduct = createAsyncThunk('product/create', async (props: { product: Product, urlImage: string[] }) => {
    const res = await apiCreateProduct(props);
    return res.data;
})
export const productState = (state: RootState) => state.product
export default productSlice.reducer;
export const { loadUserInfo } = productSlice.actions;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../../models/product'
import { RootState } from '../store';
export interface ProductState {
    product: Product[];
    loading: boolean;
}
const initialState: ProductState = {
    product: [],
    loading: false
};
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        createProduct: (state, action: PayloadAction<Product>) => {
            state.product.push(action.payload)
            state.loading = true;
        }
    }
})
export const productState = (state: RootState) => state.product
export default productSlice.reducer;
export const { createProduct } = productSlice.actions;
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../../../models/category'
import { apiCreateCategory, apiDeleteCategory, apiDetailCategory, apiLoadCategory, apiUpdateCategory } from '../../api/category';
import { RootState } from '../store';
export interface CategoryState {
    categories: Category[] | null;
    loading: boolean;
    categoryInfo: Category | null;
}
const initialState: CategoryState = {
    categories: [],
    loading: false,
    categoryInfo: null
};
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        loadUserInfo: (state) => {
            state.loading = true
        },
    },
    extraReducers: (builder) => {
        const actionList = [requestCreateCategory, requestLoadCategory, requestDetailCategory, requestEditCategory]
        actionList.forEach((action) => {
            builder.addCase(action.pending, (state) => {
                state.loading = true;
            })
        })
        builder.addCase(requestCreateCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
            state.categories = state.categories.concat(action.payload)
            state.loading = false;
        })
        builder.addCase(requestLoadCategory.fulfilled, (state, action: PayloadAction<{ categories: Category[] }>) => {
            state.categories = action.payload.categories
            state.loading = false;
        })
        builder.addCase(requestDetailCategory.fulfilled, (state, action: PayloadAction<{ categoryUpdate: Category }>) => {
            state.categoryInfo = action.payload.categoryUpdate
            state.loading = false;
        })
        builder.addCase(requestEditCategory.fulfilled, (state, action: PayloadAction<{ categories: Category }>) => {
            state.categoryInfo = action.payload.categories
            state.loading = false;
        })
        builder.addCase(requestDeleteCategory.fulfilled, (state, action: PayloadAction<Category>) => {
            console.log('action', action.payload)
            state.loading = false;
            state.categoryInfo = action.payload;
        })
    }
})
export const requestLoadCategory = createAsyncThunk('category/load-category', async () => {
    const res = await apiLoadCategory();
    return res.data;
})
export const requestCreateCategory = createAsyncThunk('category/create-category', async (props: Category) => {
    const res = await apiCreateCategory(props);
    return res.data;
})
export const requestDetailCategory = createAsyncThunk('category/detail-category', async (props: Category) => {
    const res = await apiDetailCategory(props);
    return res.data;
})
export const requestEditCategory = createAsyncThunk('category/update-category', async (props: Category) => {
    const res = await apiUpdateCategory(props);
    return res.data;
})
export const requestDeleteCategory = createAsyncThunk('category/delete-category', async (props: Category) => {
    const res = await apiDeleteCategory(props);
    return res.data.deleteItem;
})
export const categoryState = (state: RootState) => state.categories
export default categorySlice.reducer;
export const { loadUserInfo } = categorySlice.actions;
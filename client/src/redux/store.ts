import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        categories: categorySlice,
    },
    middleware: (getDefaultMiddle) => getDefaultMiddle({ serializableCheck: false }),
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
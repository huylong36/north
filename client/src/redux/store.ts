import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice
    },
    middleware: (getDefaultMiddle) => getDefaultMiddle({ serializableCheck: false }),
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
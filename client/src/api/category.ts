import { Category } from "../../../models/category";
import { ApiConfig } from "./config";

export const apiLoadCategory = async () => {
    return ApiConfig('/load-category', {}, 'GET');
}
export const apiCreateCategory = async (payload: Category) => {
    return ApiConfig('/create-category', payload);
}
export const apiDetailCategory = async (payload: Category) => {
    return ApiConfig('/detail-category', payload);
}
export const apiUpdateCategory = async (payload: Category) => {
    return ApiConfig('/update-category', payload);
}
export const apiDeleteCategory = async (payload: Category) => {
    return ApiConfig('/delete-category', payload);
}
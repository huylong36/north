import { Product } from "../../../models/product";
import { ApiConfig } from "./config";

export const apiCreateProduct = async (payload: Product) => {
    return ApiConfig('/create', payload);
}
export const apiGetAllProduct = async (payload: { skip: number, limit: number }) => {
    return ApiConfig(`/get-all-products?skip=${payload.skip}&limit${payload.limit}`, {}, 'GET');
}
export const getDetailProduct = async (payload: { id: string }) => {
    return ApiConfig(`/get-detail-product/${payload.id}`, {}, 'GET');
}
export const apiUpdateProduct = async (payload: Product) => {
    return ApiConfig(`/update-product`, payload);
}
export const apiDeleteProduct = async (payload: Product) => {
    return ApiConfig(`/delete-product`, payload);
}
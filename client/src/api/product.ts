import { Product } from "../../../models/product";
import { ApiConfig } from "./config";

export const apiCreateProduct = async (payload: { product: Product }) => {
    return ApiConfig('/create', payload);
}
export const apiGetAllProduct = async (payload: { skip: number, limit: number }) => {
    return ApiConfig(`/get-all-products?skip=${payload.skip}&limit${payload.limit}`, {}, 'GET');
}
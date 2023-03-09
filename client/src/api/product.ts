import { Product } from "../../../models/product";
import { ApiConfig } from "./config";

export const apiCreateProduct = async (payload: { product: Product }) => {
    return ApiConfig('/create', payload);
}
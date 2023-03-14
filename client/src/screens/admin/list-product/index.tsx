import { Grid } from "@material-ui/core";
import { useEffect } from "react"
import { Product } from "../../../../../models/product";
import { useAppDispatch, useAppSelector } from "../../../redux/slices/hook"
import { productState, requestGetAllProduct } from "../../../redux/slices/productSlice"
import { ItemProduct } from "./ItemProduct";

export const ListProduct = () => {
    const dispatch = useAppDispatch();
    const appSelector = useAppSelector(productState);
    console.log('appSelector.products : ', appSelector.products);
    
    useEffect(() => {
        console.log('aasdasd');
        
        dispatch(requestGetAllProduct({ skip: 0, limit: 10 }))
    }, [])
    return <> {appSelector.products.length <= 0 ? "Không có sản phẩm nào" :
        <Grid container>
            {appSelector.products?.map((product: Product) => (
                <ItemProduct key={product?._id} item={product} />
            ))}
        </Grid>
    }

    </>

}
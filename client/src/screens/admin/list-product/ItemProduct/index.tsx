import { Grid } from "@material-ui/core";
import { Product } from "../../../../../../models/product";
import imageDefault from '../../../../assets/images/image-default.jpeg'
import './style.scss'
export const ItemProduct = (props: { item: Product }) => {
    const product = props.item
    return (
        <>
            <Grid item md={3} className="item-product">
                <img className="image-product" src={product.images.length > 0 ? product.images[0] : imageDefault} />
                <div>{product?.name}</div>
            </Grid>
        </>
    )
}
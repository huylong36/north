import { Button, Grid } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../../../../../models/product";
import imageDefault from '../../../../assets/images/image-default.jpeg'
import './style.scss'
export const ItemProduct = (props: { item: Product }) => {
    const { item } = props;
    const history = useNavigate();
    return (
        <>
            <Grid item md={3} className="item-product">
                <div className="item">
                    <img className="image-product" src={item.image ? item.image : imageDefault} />
                    <div>{item.name}</div>
                    <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                </div>
                <div>
                    <Button onClick={() =>
                        history(`/category/${item._id}`)
                    }>Sửa</Button>
                </div>
            </Grid>
        </>
    )
}
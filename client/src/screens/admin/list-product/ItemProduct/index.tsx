import { Button, Grid } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../../../../../models/product";
import imageDefault from '../../../../assets/images/image-default.jpeg'
import './style.scss'
export const ItemProduct = (props: { item: Product, handleDelete(): any }) => {
    const { item, handleDelete } = props;
    const history = useNavigate();
    return (
        <>
            <Grid item md={3} className="item-product">
                <div className="item">
                    <div className="wrapper-product">
                        <img className="image-product" src={item.image ? item.image : imageDefault} />
                    </div>
                    <div className="info-product">
                        <div>{item.name}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} className="description dot-4"></div>
                    </div>
                    <div className="action-product">
                        <Button onClick={() =>
                            history(`/product/${item._id}`)
                        }>Sửa</Button>
                        <Button onClick={() => handleDelete()}>Xoá</Button>
                    </div>
                </div>
            </Grid>
        </>
    )
}
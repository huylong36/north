import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/slices/hook";
import { requestUpdateProduct } from "../../redux/slices/productSlice";

export const DetailItem = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestUpdateProduct({ id }))
    }, [])
    return (
        <div>xxxxxxxx</div>
    )
}
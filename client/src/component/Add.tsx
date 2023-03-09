import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { CreateProduct } from "../product/create";
export const Add = () => {
    const [open, setOpen] = useState<boolean>(false);

    const openCreateProduct = () => {
        setOpen(!open)
    }
    return <>
        <Button onClick={openCreateProduct}>ADD</Button>
        {/* <CreateProduct open={open} onClose={() => setOpen(!open)} /> */}
    </>
}
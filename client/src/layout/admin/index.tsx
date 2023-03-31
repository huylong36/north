import { Collapse, Container } from '@material-ui/core';
import { Button, Grid } from "@mui/material";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../redux/slices/hook';
import { requestGetAllProduct } from '../../redux/slices/productSlice';
import { CategoryPanel } from '../../screens/admin/category';
import { ListProduct } from '../../screens/admin/list-product';
import { CreateProduct } from '../../screens/admin/product/create';
import './style.scss';
interface Props {
    items: {
        title: string,
        content: { title: string; router: string; }[];
    }[];
}


const pages = [
    {
        title: "Nội dung",
        content: [
            {
                title: 'Danh mục',
                router: '/category'
            },
            {
                title: 'Tạo Sản phẩm',
                router: '/product'
            },
            {
                title: 'Danh sách sản phẩm',
                router: '/list-product'
            },
            {
                title: 'Sự kiện',
                router: '/events'
            },
            {
                title: 'Feedback',
                router: '/feedback'
            },
        ]

    },
    {
        title: "Tin tức",
        content: [
            {
                title: 'Tạo tin tức',
                router: '/news'
            }
        ]
    },
]
export const LayoutAdmin = () => {
    const logout = () => {
        Cookies.remove("token");
        window.location.href = "/"
    }
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(requestGetAllProduct({ skip: 0, limit: 10 }))
    // }, [])
    const history = useNavigate();
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);
    const key = Math.floor(Math.random() * 100);
    const MyCollapse: React.FC<Props> = ({ items }) => {
        const handleToggle = (index: number) => {
            const currentIndex = openIndexes.indexOf(index);
            const newOpenIndexes = [...openIndexes];

            if (currentIndex === -1) {
                newOpenIndexes.push(index);
            } else {
                newOpenIndexes.splice(currentIndex, 1);
            }

            setOpenIndexes(newOpenIndexes);
        };
        return (
            <>
                {items?.map((item, index) => (
                    <>
                        <Button onClick={() => handleToggle(index)}>
                            {item.title}
                        </Button>
                        <Collapse key={"index" + index} in={openIndexes.includes(index)}>
                            <div className="list-collapse-utilities">
                                {item.content?.map((item) => (
                                    <div className="item-collapse" onClick={() => history(item.router, { replace: true })}>
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        </Collapse>
                    </>
                ))
                }
            </>
        )
    };
    return (
        <>
            <Grid container className="drawer-admin" >
                <Grid item md={2} className="list-utilities">
                    <MyCollapse key={key} items={pages} />
                </Grid>
                <Grid item md={10}>
                    <Container maxWidth="xl">
                        <Routes>
                            <Route path='/category' element={<CategoryPanel />} />
                            <Route path='/product' element={<CreateProduct />} />
                            <Route path='/list-product' element={<ListProduct />} key={document.location.href} />
                            <Route path='/product/:id' element={<CreateProduct />} />
                        </Routes>
                    </Container>
                </Grid>
            </Grid>

        </>
    )
}
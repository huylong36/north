import { Collapse, Container } from '@material-ui/core';
import { Button, Grid } from "@mui/material";
import Cookies from 'js-cookie';
import { useState } from "react";
import { Route, Routes } from 'react-router';
import { useNavigate } from "react-router-dom";
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
                title: 'Tạo danh mục',
                router: '/category'
            },
            {
                title: 'Sản phẩm',
                router: '/product'
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
                                    <div className="item-collapse" onClick={() => history(item.router)}>
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
                <Grid item md={9}>
                    <Container maxWidth="xl">
                        <Routes>
                            <Route path='/category' element={CreateProduct()} />
                            <Route path='/product' element={<ListProduct />} />
                        </Routes>
                    </Container>
                </Grid>
            </Grid>

        </>
    )
}
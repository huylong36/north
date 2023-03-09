import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import { Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { HomeScreen } from '../../pages/home';
import { NewsScreen } from '../../pages/news';
import { ProductScreen } from '../../pages/product';
import { authState, requestGetUserFromToken } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/slices/hook';
import { Auth } from '../auth/auth';
import './style.scss';
const pages = [
    {
        title: "Trang chủ",
        router: '/'
    },
    {
        title: "Sản phẩm",
        router: '/product'
    },
    {
        title: "Tin tức",
        router: '/news'
    },
    {
        title: "Liên hệ",
        router: '/contact'
    },

];
export const LayoutHome = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const authReducer = useAppSelector(authState)
    const dispatch = useAppDispatch();
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const history = useNavigate();
    const handleLogin = () => {
        setOpen(!open)
    }
    const logout = () => {
        Cookies.remove("token");
        window.location.href = "/"
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const renderHeader = () => {
        return (
            <>
                <AppBar position="static" className="appbar-header">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                LOGO
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page, key) => (
                                        <MenuItem key={key} onClick={() => history(page.router)}>

                                            <Typography textAlign="center" >{page.title}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page, key) => (
                                    <Button
                                        key={key}
                                        onClick={() =>
                                            history(page.router)
                                        }
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page.title}
                                    </Button>
                                ))}
                            </Box>
                            {authReducer.userInfo ?
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={logout}>
                                            <Typography textAlign="center">Đăng xuất</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box> :
                                <Button onClick={handleLogin} className="btn-auth">
                                    Đăng nhập
                                </Button>
                            }
                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        )
    }
    const renderBody = () => {
        return (
            <>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path='/' element={HomeScreen()} />
                        <Route path='/product' element={ProductScreen()} />
                        <Route path='/news' element={NewsScreen()} />
                    </Routes>
                </Container>
            </>
        )
    }
    return (
        <>
            {renderHeader()}
            {renderBody()}
            <Auth onClose={() => setOpen(!open)} open={open} />
        </>
    )
}
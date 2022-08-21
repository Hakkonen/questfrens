import React, { useState, useEffect, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Grid from '@mui/material/Grid';

// icons
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';

// Custom comp
import SearchBar from "./searchBar"

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function MobileSearch(props) {
    
    return (
        <Box
            sx={{ width: "auto", height: "auto",
            position: "absolute", top: 0, left: 0, right: 0, m: 0, p: 0,
            transition: "width: 0.5s linear 0.5s"
        }}>
            <AppBar position="static" sx={{ width: "auto", height: "auto", zIndex: 100, 
            position: "absolute", top: 0, left: 0, right: 0, m: 0, p: 0  }}>
                <Toolbar>
                    <SearchBar searchValue={props.searchValue} setSearchValue={props.handleSearchVal} />
                    <Button 
                        color="secondary"
                        variant="outlined" onClick={props.handleMobiSearchBar}
                        sx={{ ml: 5 }}
                    >Cancel</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ width: "100%", height: "100vh", zIndex: -100, backgroundColor: "rgba(45,45,47,0.75)" }}>

            </Box>
        </Box>
    )
}

export default function Navbar(props) {
    const pages = [{"name": "Market", "to": "market"}, {"name": "Docs", "to": "documentation"}];

    // Search props
    // Handles search input from search bar
    const [ searchValue, setSearchValue ] = useState("")
    const handleSearchVal = (event) => {
        setSearchValue(event)
    }
    // Handle mobi search bar
    const handleMobiSearchBar = (event) => {
        setToggleMobiSearch(!toggleMobiSearch)
    }
    // Handle navigate on enter
    // Splits between asset or address based length and first letter
    const navigate = useNavigate();
    function handleSubmit(event) {
        setToggleMobiSearch(false)
        event.preventDefault();

        // If search query starts with 1, b and is over 25chars search address, else search asset
        console.log(searchValue)
        console.log(searchValue[0])
        console.log(searchValue.length)
        console.log(searchValue[0] == "b" || searchValue[0] == "1")
        console.log((searchValue[0] == "b" || searchValue[0] == "1") && searchValue.length > 25)
        if (searchValue.length > 25 && (searchValue[0] == "b" || searchValue[0] == "1")) {
            navigate(`/address?hash=${searchValue}`, { replace: true });
        } else {
            navigate(`/asset?name=${searchValue}`, { replace: true });
        }
    }

    // Mobi search bar bool
    const [ toggleMobiSearch, setToggleMobiSearch ] = useState(false)

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
    <AppBar position="static">

        {/* Mobi search bar */}
        {
            toggleMobiSearch ?
            <Box 
                component="form" noValidate autoComplete="off"
                onSubmit={handleSubmit}
            >
                <MobileSearch 
                    searchValue={searchValue} 
                    handleMobiSearchBar={handleMobiSearchBar}
                    handleSearchVal={handleSearchVal}
                />
            </Box>
            : null
        }

        <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
            QUESTFRENS
            </Typography>

            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Link to="/" style={{ color: "rgb(254,254,254)", textDecoration: "none" }}>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        pl: 1,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                QF
                </Typography>
            </Link>

            {/* SMALL Menu */}
            <Box sx={{ 
                flexGrow: 1, display: { xs: 'flex', md: 'none' },
                justifyContent: "right"
            }}>
                <IconButton
                    size="large"
                    aria-label="search assets"
                    aria-controls="search-appbar"
                    aria-haspopup="true"
                    onClick={handleMobiSearchBar}
                    color="inherit"
                >
                    <SearchIcon />
                </IconButton>
                <Link to="/market" style={{ color: "rgb(254,254,254)", textDecoration: "none" }}>
                    <IconButton
                        size="large"
                        aria-label="explore collections"
                        aria-controls="explore-appbar"
                        aria-haspopup="true"
                        // onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <ExploreIcon />
                    </IconButton>
                </Link>
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
                    
                    {pages.map((page) => (
                        <MenuItem key={page.to} onClick={handleCloseNavMenu}>
                            <Link to={`/${page.to}`} style={{ textDecoration: "none", color: "rgb(254,254,254)" }}>
                                <Typography textAlign="center">{page.name}</Typography>
                            </Link>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            
            <Box sx={{ 
                flexGrow: 1, display: { xs: 'none', md: 'flex' },
                justifyContent: { xs: "none", md: "left" },
                alignItems: { xs: "none", md: "center" }
            }}>
                <Grid container xs={0} md={12} sx={{ display: "flex", alignItems: "center" }}>
                        <Grid item md={5}>
                            <Box
                                component="form" noValidate autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                            <SearchBar 
                                sx={{ display: "block" }} searchValue={searchValue} 
                                setSearchValue={handleSearchVal}
                            />
                            </Box>
                        </Grid>

                        <Grid item md={7} sx={{ display: "flex", justifyContent: "right", pr: 5 }}>
                            {pages.map((page) => (
                                <Link to={`/${page.to}`} style={{ textDecoration: "none" }}>
                                    <Button
                                        key={page.to}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                    {page.name}
                                    </Button>
                                </Link>
                            ))}
                        </Grid>
                </Grid>
                
            </Box>
            {/* end fullwidth only */}

            <Box sx={{ flexGrow: 0 }}>
                {/* <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="account" src="" />
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
                    {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                    ))}
                </Menu> */}
                
            </Box>
        </Toolbar>
        </Container>
    </AppBar>
    );
};
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        console.log("Logging out")
        document.cookie = "address" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "signature" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // router nav
    const navigate = useNavigate();

    return (
        <Box 
            sx={{ flexGrow: 1 }}
            style={{ zIndex: 100, marginBottom: "1em" }}
        >
        <AppBar position="static" enableColorOnDark
            style={{ backgroundColor: "rgb(45,22,61)" }}
        >
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: "bisque" }}
            >
                <MenuIcon />
            </IconButton>
            {/* MENU */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => (navigate("/account"))}>My Frens</MenuItem>
                <MenuItem onClick={() => (navigate("/market"))}>Market</MenuItem>
                <MenuItem onClick={() => (navigate("/feed"))}>Feed</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            {/* MENU END */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/"
                    style={{ textDecoration: "none", color: "bisque" }}
                >QuestFrens</Link>
            </Typography>
            <Button 
                color="inherit" 
                style={{ color: "bisque" }}
                onClick={() => (navigate("/login"))}
            >Login</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}
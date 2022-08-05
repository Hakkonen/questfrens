import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { Routes, Route, Link } from "react-router-dom";
import { ThemeContext } from '@emotion/react';

const linkStyle = {
    textDecoration: "none",
    color: "white"
};

export const mainListItems = (
    <React.Fragment>
        <Link to="/" style={ linkStyle }>
            <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>

        <Link to="/market" style={ linkStyle }>
            <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Market" />
            </ListItemButton>
        </Link>

        <Link to="/social" style={ linkStyle }>
            <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Social" />
            </ListItemButton>
        </Link>

        <Link to="/leaderboard" style={ linkStyle }>
            <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Leaderboard" />
            </ListItemButton>
        </Link>

        <Link to="/instructions" style={ linkStyle }>
            <ListItemButton>
            <ListItemIcon>
                <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Guides" />
            </ListItemButton>
        </Link>

        <Link to="/search" style={ linkStyle }>
            <ListItemButton>
            <ListItemIcon>
                <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
            </ListItemButton>
        </Link>
    
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>

        <Link to="/login" style={ linkStyle }>
            <ListItemButton>
            <ListItemIcon>
                <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
            </ListItemButton>
        </Link>

    </React.Fragment>
);
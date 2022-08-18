import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShareIcon from '@mui/icons-material/Share';
import Container from '@mui/material/Container';

export default function ShareButton(props) {

    // Twitter share menu
    const tweet = `Check out this collection on the @Questfrens_XCP marketplace:`
    const tweetURL = `window.location.href`
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container sx={{ width: "auto" }}>
            <Button 
                // onClick={() => {navigator.clipboard.writeText(window.location.href)}}
                id="share-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined" startIcon={<ShareIcon />}
                color="secondary"
                fullWidth={false}
            >
                Share
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    handleClose()
                }}>Copy URL</MenuItem>
                <a class="twitter-share-button"
                    href={`https://twitter.com/intent/tweet?text=${tweet}%0A${tweetURL}`}
                    target="_blank"
                    data-size="large"
                    style={{ textDecoration: "none", color: "rgb(254,254,254)" }}
                >
                    <MenuItem onClick={handleClose}>Share on Twitter</MenuItem>
                </a>
                
            </Menu>
        </Container>
    )
}
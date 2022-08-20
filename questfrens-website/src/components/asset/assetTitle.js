import React, { useState, useEffect } from 'react'

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';

import ShareIcon from '@mui/icons-material/Share';



export default function AssetTitle(props) {

    // Asset info for twitter share
    const tweet = `Check out ${props.assetInfo.asset} on the @Questfrens_XCP marketplace:`
    const tweetURL = `https://questfrens.io/asset?name=${props.assetInfo.asset}`
    const tweetVia = "questfrens_xcp"
    // Twitter share menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <Grid container xs={12}>
        <Grid // Collection & Social bar
            item xs={6}
        >
        <Grid container xs={12} sx={{  }}>

            <Grid // Collection
                item xs={12} sx={{ display: "left", justifyContent: "left", alignItems: "center"  }}
            >
                <Typography variant="h6" sx={{ textAlign: "left" }}>Counterparty</Typography>
            </Grid>

            <Grid // Floor
                item xs={12} sx={{ display: "left", justifyContent: "left", alignItems: "center"  }}
            >
                <Typography  sx={{ textAlign: "left", fontWeight: "100", color: "rgb(155,155,155)" }}>VOL 0.00btc</Typography>
            </Grid>

        </Grid>
        </Grid>

        <Grid // Share icons and share to twitter func
            item xs={6}
        >
            <Stack direction="row" spacing={5} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                <Button 
                    // onClick={() => {navigator.clipboard.writeText(window.location.href)}}
                    id="share-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="outlined" startIcon={<ShareIcon />}
                    color="secondary"
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
            </Stack>
        </Grid>

        <Grid  // Contains asset name and descr.
            container xs={12}
            sx={{ pt: 2, pb: 2 }}
        >

            <Grid // Asset name
                item xs={12} sx={{ width: "100%", maxWidth: props.width, display: "flex", justifyContent: "left", pb: 1, overflow: "hidden" }}
            >
                <Typography
                    variant={(props.width > 400 ? "h3" : "h4")}
                    textAlign="left"
                    sx={{ width: "100%", maxWidth: props.width, textOverflow: "ellipsis", whiteSpace: "wrap", fontWeight: "500" }}
                >
                    {props.assetInfo.name ? props.assetInfo.name : <Skeleton width={"10ch"} />}
                </Typography>
            </Grid>

            <Grid // Asset description
                item xs={12} sx={{ display: "flex", justifyContent: "left" }}
            >
                <Typography sx={{ fontWeight: "100", color: "rgb(155,155,155)" }}>
                    { 
                        !(props.assetInfo.description.includes("iframe"))
                        ? props.assetInfo.description
                        : "A Questfren"
                    }
                </Typography>
            </Grid>

        </Grid>

        <Grid // Owner
            container xs={12} sx={{ pb: 5 }}
        >
            <Grid item xs={2} sm={1} sx={{  display: "flex", justifyContent: "left", alignItems: "center" }}>
                <Avatar>
                    {
                        props.assetInfo.issuer
                        ? props.assetInfo.issuer.substring(0,1)
                        : ""
                    }
                </Avatar>
            </Grid>
            <Grid container xs={3} sx={{ pl: 1 }}>
                <Grid item xs={12} textAlign="left" >
                    <Typography sx={{ fontWeight: "100", color: "rgb(155,155,155)" }}>Creator</Typography>
                </Grid>
                <Grid item xs={12} textAlign="left">
                    <Link href={`https://questfrens.io/address?hash=${props.assetInfo.issuer}`} sx={{ textDecoration: "none" }}>
                        <Typography  color="secondary">
                            { props.assetInfo.issuer
                                ? props.assetInfo.issuer.substring(0,5)
                                : <Skeleton width={"6ch"} />
                            }
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    )
}
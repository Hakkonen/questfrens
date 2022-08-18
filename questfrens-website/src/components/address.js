import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { deepOrange, deepPurple } from '@mui/material/colors';

// icons
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Custom imports
import ShareButton from './address/shareButton';
import AssetCard from './cards/assetCard';

import LazyLoad from 'react-lazyload' //https://github.com/twobin/react-lazyload

// test import
import testAddy from "./address/testAddy.json"

export default function(props) {
    // Takes in list of assets, and title, and displays

    // Get address from url
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery();
    let hash = query.get('hash')
    hash ? hash = hash : hash = "Null"
    console.log(hash)

    // Address object
    const [ address, setAddress ] = useState({
        hash: hash,
        balance: []
    })

    // Get assets
    const getBalance = (h) => fetch(`https://questfrens.herokuapp.com/get_balance?hash=${h}`).then(response => response.json())
    useEffect(() => {
        (async () => {
            // Get balance
            const res = await getBalance(address.hash)
            setAddress(prev => ({
                ...prev,
                balance: res
            }))
        })();
    }, [address.hash]);
    useEffect(() => {
        console.log(address.balance)
    }, [address.balance])

    // Get banner from random image
    const [ banner, setBanner ] = useState("")


    return (
        <Box sx={{ width: "100%", minHeight: "90%", height: "auto", p: 0, m: 0 }}>

            <Grid container xs={12} // Box for me peeps
                sx={{ 
                    width: "100%", p: 4, background: `url()`, backgroundColor: "rgb(42,42,44)", backgroundRepeat: "no-repeat"
            }}>
                <Grid item xs={4} md={3}
                    // Avatar and address stack
                >
                    <Stack direction="row" spacing={4}>
                        <Avatar
                            color={deepOrange}
                            sx={{ width: 96, height: 96, bgcolor: props.theme.palette.secondary.main, color: "white" }}
                        >{address.hash.substring(0,3)}</Avatar>
                        <Stack direction="column" sx={{ textAlign: "left" }}>
                            <Typography
                                sx={{ p: 1 }}
                            >{address.hash.substring(0,6)}</Typography>
                            <Button variant="contained" color="grey" endIcon={<ContentCopyIcon />}>
                                {address.hash.substring(0,3)}...{address.hash.substring(30)}
                            </Button>
                        </Stack>
                        
                    </Stack>
                </Grid>

                <Grid item xs={8} md={7}>
                    {/* Spacer */}
                </Grid>

                <Grid // Social icons
                    item xs={12} md={2}
                >
                    <ShareButton />
                </Grid>
            </Grid>



            <Grid // Maps balances
                container xs={12} wrap="wrap" spacing={2}
                sx={{ p: 2 }}
            > 
                    {address.balance.map(asset => (
                        <Grid item xs={6} sm={4} md={3} lg={3}>
                            <LazyLoad height={360}>
                                <AssetCard key={asset.name} asset={asset} />
                            </LazyLoad>
                        </Grid>
                    ))}
            </Grid> 
        </Box>
    )
}
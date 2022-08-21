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

    // Address object
    const [ balance, setBalance ] = useState([])
    const [ address, setAddress ] = useState({
        address: "",
        balance: []
    })

    // Get address from url
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery();
    let hash = query.get('hash')
    hash ? hash = hash : hash = "Null"

    // Get assets
    // const getBalance = () => fetch(`https://goraredb.herokuapp.com/get_balance?hash=${hash}`, {method: "GET"}).then(res => res.json()).then((data) => {
    //     setBalance(data)
    // }).catch(e => { setBalance([]) })

    useEffect(() => { 
        fetch(`https://goraredb.herokuapp.com/get_balance?hash=${hash}`, {method: "GET"}).then(res => res.json()).then((data) => {
            console.log(data)
            setAddress(prev => ({
                ...prev,
                balance: data
            }))
        })
        // .catch(e => { setBalance([]) })
        // getBalance()
    }, [hash])
    // useEffect(() => {
    //     (async () => {
    //         getBalance()
    //         // Get balance
    //         // const res = await getBalance()
    //         // console.log(res)
    //         // // filter balance
    //         // // if(balance.length == 0) {
    //         // //     setBalance(res)
    //         // // }
    //         // setBalance(res)
    //     })();
    // }, [hash]);
    useEffect(() => {
        console.log(address)
    }, [address])

    // Get banner from random image
    const [ banner, setBanner ] = useState("")

    return (
        <Box sx={{ width: "100%", minHeight: "90%", height: "auto", p: 0, m: 0 }}>

            <Grid container xs={12} // Box for me peeps
                sx={{ 
                    width: "100%", p: 4, background: `url()`, backgroundRepeat: "no-repeat", borderBottom: "1px solid rgb(155,155,155)"
            }}>
                <Grid item xs={4} md={3}
                    // Avatar and address stack
                >
                    <Stack direction="row" spacing={4}>
                        <Avatar
                            color={deepOrange}
                            sx={{ width: 96, height: 96, bgcolor: props.theme.palette.secondary.main, color: "white" }}
                        >{hash.substring(0,3)}</Avatar>
                        <Stack direction="column" sx={{ textAlign: "left" }}>
                            <Typography
                                sx={{ p: 1 }}
                            >{hash.substring(0,6)}</Typography>
                            <Button variant="contained" color="grey" endIcon={<ContentCopyIcon />}>
                                {hash.substring(0,3)}...{hash.substring(30)}
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
                {
                    address.balance.map((assetCard) => (
                        <Grid item xs={6} sm={4} md={3} lg={3} key={assetCard.name}>
                            <LazyLoad height={200}>
                                <AssetCard asset={assetCard} />
                            </LazyLoad>
                        </Grid>
                    ))
                }
            </Grid> 
        </Box>
    )
}
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SearchBar from "./searchBar"
import Dashboard from "./dashboard"
import MarketCard from "./cards/marketCard"
import qfIcon from "../assets/QFicontemp.png"

import testDb from "../assets/testDB.json"


export default function Market(props) {
    const [ marketList, setMarketList ] = useState([])
    const [ collection, setCollection ] = useState({
        title: "Questfrens",
        info: "Dynamically generated, interactive NFTs on the Counterparty network."
    })
    const [priceDirection, setPriceDirection] = useState(true)
    const [ filterShow, toggleFilterShow ] = useState(true)

    const handlePriceChange = (event) => {
        setPriceDirection(event.target.value);
    }

    const handleFilterToggle = () => {
        // toggleFilterShow(!filterShow)
    }
    const filterShowing = {
        width: "auto", height: "100%", transition: "1s"
    }
    const filterHidden = {
        opacity: 0, zIndex: "-1", pointerEvents: "none", transition: "1s"
    }

    useEffect(async () => {
        console.log("running")
        const res = await getDispensers()
        
        setMarketList(res)
    }, [])

    useEffect(() => {
        console.log("COMPLETED")
        console.log(marketList)
    }, [marketList])

    // Themeing
    const filterHover = {
        "& MuiGrid-root:hover": {
            backgroundColor: props.theme.palette.secondary.main
        }
    }

    // TODO
    // 1. Create market system that shows unminted tokens and minted tokens

    return (
        <Box sx={{ width: "100vw", minHeight: "90%", height: "auto" }}>

            {/* Header */}
            <Container  maxWidth="0" sx={{ width: "100%", height: "340px", display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignItems: "space-between"}}>

                <Box disableGutters style={{ height: "340px", width: "100%", background: `url(${qfIcon})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "bottom", zIndex: "-1", position: "absolute", left: 0, filter: "blur(0px)", opacity: 0.1, ml:0, p:0, overflow: "hidden" }}></Box>

                <Grid container spacing={0} sx={{ height: "auto" }}>

                    {/* Icon */}
                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1} sx={{ }}>
                        <Box
                            disableGutters
                            component="img"
                            sx={{
                                height: 96,
                                width: 96,
                                maxHeight: 96,
                                maxWidth: 96,
                                p: 0,
                                m: 0
                            }}
                            alt="Questfrens"
                            src={qfIcon}
                        />
                    </Grid>

                    {/* Info */}
                    <Grid item xs={12} sm={12} md={12} lg={10} xl={10} sx={{  }}>
                        <Grid container xs={10} sx={{ height: "auto" }}>
                            <Typography variant="h5" sx={{ fontWeight: "500", pl: 0, pr: 0, borderBottom: "1px solid rgba(40,45,49,1)" }}>
                                {collection.title}
                            </Typography>
                        </Grid>

                        <Grid container xs={12} sm={11} md={11} xl={11} sx={{ height: "auto" }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "1rem", pl: 0, pb: 1, textAlign: "left" }}>
                                {collection.info}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Social */}
                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1} sx={{ }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Link target="_blank" href="https://mobile.twitter.com/questfrens_xcp" rel="noreferrer">
                                <IconButton aria-label="twitter" component="label">
                                        <TwitterIcon />
                                </IconButton>
                            </Link>
                            <Link target="_blank" href="https://t.me/fren_zone" rel="noreferrer">
                                <IconButton aria-label="telegram" component="label" >
                                    <TelegramIcon />
                                </IconButton>
                            </Link>
                        </Stack>
                    </Grid>

                </Grid>

                {/* Bottom Panel */}
                <Grid container spacing={1} sx={{ minHeight: "96px", height: "auto" }}>
                    <Grid item xs={2} sm={1} lg={0.75} xl={0.75} sx={{  }}>
                        <Typography variant="h5">
                            200
                        </Typography>
                        <Typography variant="overline">
                            Items
                        </Typography>
                    </Grid>

                    <Grid item xs={2} sm={1} lg={0.75} xl={0.75} sx={{  }}>
                    <Typography variant="h5">
                            20
                        </Typography>
                        <Typography variant="overline">
                            Owners
                        </Typography>
                    </Grid>

                    <Grid item xs={3} sm={1} lg={0.75} xl={0.75} sx={{  }}>
                    <Typography variant="h5">
                            ₿1
                        </Typography>
                        <Typography variant="overline">
                            Total Vol
                        </Typography>
                    </Grid>

                    <Grid item xs={2} sm={1} lg={0.75} xl={0.75} sx={{  }}>
                        <Typography variant="h5" sx={{ verticalAlign: 'middle', display: 'inline-flex' }}>
                            ₿0.002
                        </Typography>
                        <Typography variant="overline">
                            Floor
                        </Typography>
                    </Grid>
                </Grid>

            </Container>

            {/* Filter / Item selection bar */}
            <Grid 
                container xs={12} 
                sx={{ height: "50px", borderTop: "1px solid rgb(40,45,49)", borderBottom: "1px solid rgb(40,45,49)" }} 
                className="noSelect"
            >
                    {/* Filter tab toggle */}
                    <Grid item xs={4} lg={3} sx={ filterShow ? `pt: "1px"` : filterHidden } className="hoverColor" onClick={() => {handleFilterToggle()}}>
                        <Grid container xs={12} xl={4} sx={{}}>
                            <Grid item xs={1} md={1} xl={1} />
                            <Grid item xs={1} md={1} xl={1} sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                <ArrowBackIosIcon sx={{ pt: 0.1, color: props.theme.palette.secondary.main }} />
                            </Grid>
                            <Grid item xs={3} md={10} xl={10} sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                <Typography variant="overline" sx={{ height: "100%", pt: "2px", pl: 1, fontSize: "1rem", color: props.theme.palette.secondary.main }}>
                                    Filters
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={0} lg={9}>
                        
                    </Grid>
            </Grid>

            {/* <Container disableGutters maxWidth="0" sx={{ width: "100%", height: "100%", display: "flex" }}> */}
            <Grid container xs={12}>
                
                {/* Filter */}
                <Grid 
                    container xs={filterShow ? 12 : 0} lg={filterShow ? 3 : 0} 
                    spacing={0}
                    sx={ 
                        filterShow ? filterShowing : filterHidden 
                    }>
                    {/* Price Range */}
                    <Grid item xs={12} lg={9} sx={{ p: 0, m: 0 }}>
                        <Grid container xs={12}>
                            <Typography variant="overline" sx={{ width: "100%", textAlign: "left", pl: 1.2 }}>
                                Price Range (BTC)
                            </Typography>
                        </Grid>
                        <Grid container xs={12} sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderBottom: "1px solid rgb(40,45,49)"}}>
                            <Grid item xs={5} sx={{ pb: 1 }}>
                                <TextField id="outlined-basic" variant="outlined" size="small" />
                            </Grid>
                            <Grid item xs={5} sx={{ pb: 1 }} >
                                <TextField id="outlined-basic" variant="outlined" size="small" />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Filter properties */}
                </Grid>

                {/* Assets */}
                <Grid container xs={filterShow ? 12 : 0} lg={filterShow ? 9 : 12} sx={{ width: "100%", height: "100%" }}>
                    {/* Search and price direction */}
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", pr: 2, mb: 4 }}>
                        {/* Search bar */}
                        <SearchBar /> 

                        {/* Price direction */}
                        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
                            <InputLabel id="demo-select-small">Price</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={priceDirection}
                                label="Age"
                                onChange={handlePriceChange}
                            >
                                <MenuItem value="Low to High">
                                </MenuItem>
                                <MenuItem value={false}>Low to High</MenuItem>
                                <MenuItem value={true}>High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    {/* Assets */}
                    <Grid container xs={12} spacing={1} sx={{ p:0, m:2, alignContent: "center" }}>
                        {
                            marketList.map(asset => (
                                <Grid item xs={6} lg={4} xl={3} sx={{ p: 0, m: 0 }}>
                                    <MarketCard key={asset.asset} asset={asset} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>

            {/* </Container> */}
            </Grid>

        </Box>
    )
}

const getDispensers = async () => {
    const response = await fetch('https://questfrens.herokuapp.com/get_dispensers');
    const dispenserData = await response.json();
    console.log(dispenserData)
    return dispenserData
    // return testDb
}
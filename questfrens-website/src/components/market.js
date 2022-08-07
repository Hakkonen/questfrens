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
import ButtonGroup from '@mui/material/ButtonGroup';
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

import LazyLoad from 'react-lazyload' //https://github.com/twobin/react-lazyload

import SearchBar from "./searchBar"
import Dashboard from "./dashboard"
import MarketCard from "./cards/marketCard"
import qfIcon from "../assets/QFicontemp.png"
import qfBg from "../assets/qfBg.gif"

import testDb from "../assets/testDB.json"

export default function Market(props) {
    // Dispenser array
    const [ marketList, setMarketList ] = useState([])
    // Sets dispenser list master list
    useEffect(async () => {
        console.log("running")
        const res = await getDispensers()
        
        setMarketList(res)
    }, [])

    const [ collection, setCollection ] = useState({
        title: "Questfrens",
        info: "Dynamically generated, interactive NFTs on the Counterparty network.",
        bg: qfBg
    })
    
    // Filters
    const [ filters, setFilters ] = useState({
        minted: false,
    })
    
    const [ filterMinted, toggleFilterMinted ] = useState(false)
    const handleFilterMinted = () => {
        toggleFilterMinted(!filterMinted)
    }

    // min / max price filter vars
    const [ minPrice, setMinPrice ] = useState("")
    const [ maxPrice, setMaxPrice ] = useState("")

    // Checks for numbers
    const isNumbers = (str) => str == "" || /^[0-9]+(\.[0-9]*)?$|^\w$/.test(str)

    // Search values
    const [ searchValue, setSearchValue ] = useState("")

    // Sorts price direction
    const [priceDirection, setPriceDirection] = useState("")
    const handlePriceChange = (event) => {
        setPriceDirection(event.target.value);
        console.log(event.target.value)
        let sort_list = marketList
        // If ascending
        if(!event.target.value) {
            // sort ascending
            sort_list.sort(function(a, b){return a.satoshirate - b.satoshirate});
        } else if (event.target.value) {
            // sort ascending
            sort_list.sort(function(a, b){return b.satoshirate - a.satoshirate});
        }

        setMarketList(sort_list)
    }
    useEffect(() => {
        console.log(priceDirection)
        
    }, [priceDirection])

    const [ filterShow, toggleFilterShow ] = useState(true)
    const handleFilterToggle = () => {
        // toggleFilterShow(!filterShow)
    }
    const filterShowing = {
        width: "auto", height: "100%", transition: "1s", pl: 1, pr: 1
    }
    const filterHidden = {
        opacity: 0, zIndex: "-1", pointerEvents: "none", transition: "1s"
    }

    // Themeing
    const filterHover = {
        "& MuiGrid-root:hover": {
            backgroundColor: props.theme.palette.secondary.main
        }
    }

    const stats = {
        "items": 624,
        "holders": 137,
        "toal_btc_vol": 0.314,
        "btc_floor": 0.001
    }

    return (
        <Box sx={{ width: "100vw", minHeight: "90%", height: "auto" }}>

            {/* Header */}
            <Container  maxWidth="0" sx={{ width: "100%", height: "340px", display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignItems: "space-between"}}>

                <Box disableGutters style={{ height: "340px", width: "100%", background: `url(${qfBg})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", backgroundPosition: "center", zIndex: "-1", position: "absolute", left: 0, filter: "blur(0px)", opacity: 0.1, ml:0, p:0, overflow: "hidden" }}></Box>

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
                            <Typography variant="h5" sx={{ fontWeight: "500", pl: 0, pr: 0, borderBottom: "1px solid rgba(40,45,49,1)", letterSpacing: "1px" }}>
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
                            {stats.items}
                        </Typography>
                        <Typography variant="overline">
                            Items
                        </Typography>
                    </Grid>

                    <Grid item xs={2} sm={1} lg={0.75} xl={0.75} sx={{  }}>
                    <Typography variant="h5">
                            {stats.holders}
                        </Typography>
                        <Typography variant="overline">
                            Owners
                        </Typography>
                    </Grid>

                    <Grid item xs={3} sm={1} lg={0.75} xl={0.75} sx={{  }}>
                    <Typography variant="h5">
                            ₿{stats.toal_btc_vol}
                        </Typography>
                        <Typography variant="overline">
                            Total Vol
                        </Typography>
                    </Grid>

                    <Grid item xs={2} sm={1} lg={0.75} xl={0.75} sx={{  }}>
                        <Typography variant="h5" sx={{ verticalAlign: 'middle', display: 'inline-flex' }}>
                            ₿{stats.btc_floor}
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
                    <Grid item xs={4} lg={2} sx={ filterShow ? `pt: "1px"` : filterHidden } className="hoverColor" onClick={() => {handleFilterToggle()}}>
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

            <Grid container xs={12} sx={{ }}>
                
                {/* Filter */}
                <Grid 
                    container xs={filterShow ? 12 : 0} sm={filterShow ? 4 : 0} lg={filterShow ? 2 : 0} 
                    spacing={0}
                    sx={ 
                        filterShow ? filterShowing : filterHidden 
                    }>
                    {/* Price Range */}
                    <Grid item xs={12} lg={12} sx={{ p: 0, m: 0 }}>
                        <Grid container xs={12}>
                            <Typography variant="overline" sx={{ width: "100%", textAlign: "left", pl: 1.2 }}>
                                Price Range (BTC)
                            </Typography>
                        </Grid>
                        <Grid container xs={12} sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderBottom: "1px solid rgb(40,45,49)"}}>
                            <Grid item xs={5} sx={{ pb: 1 }}>
                                <TextField id="outlined-basic" variant="outlined" size="small" autoComplete="off"
                                    label="min"
                                    value={minPrice}
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        if (isNumbers(value)) {
                                            setMinPrice(value);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5} sx={{ pb: 1 }} >
                                <TextField id="outlined-basic" variant="outlined" size="small" autoComplete="off" 
                                    label="max"
                                    value={maxPrice}
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        if (isNumbers(value)) {
                                            setMaxPrice(value);
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} lg={12} sx={{  }}>
                        <Grid container xs={12} sx={{ pl:1 }}>
                            <Typography variant="overline">
                                Filter minted tokens
                            </Typography>
                        </Grid>
                        <Grid container xs={12} sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", pl:1 , pb: 2, borderBottom: "1px solid rgb(40,45,49)"}}>
                            <Button 
                                color="secondary"
                                variant={ filterMinted ? "outlined" : "contained"}
                                onClick={() => {handleFilterMinted()}}
                            >
                                { filterMinted ? "Show Minted" : "Hide Minted" }
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Filter properties */}
                </Grid>

                {/* Assets */}
                <Grid container xs={filterShow ? 12 : 0} sm={filterShow ? 8 : 12} lg={filterShow ? 10 : 12} sx={{ width: "100%", height: "100%" }}>
                    {/* Search and price direction */}
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", pr: 2, mb: 4 }}>
                        {/* Search bar */}
                        <SearchBar 
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        /> 

                        {/* Price direction */}
                        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
                            <InputLabel id="demo-select-small">Price</InputLabel>
                            <Select
                                labelId="priceDirection"
                                id="priceDirection"
                                value={priceDirection}
                                label="Price"
                                onChange={handlePriceChange}
                            >
                                <MenuItem value={false}>Low to High</MenuItem>
                                <MenuItem value={true}>High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    {/* Assets */}
                        {
                            marketList.map(asset => (
                                <CardFilter 
                                    asset={asset} filterMinted={filterMinted} 
                                    minPrice={minPrice} maxPrice={maxPrice}
                                    searchValue={searchValue}
                                />
                                // <Grid item xs={6} lg={4} xl={3} sx={{ p: 1, m: 0 }}>
                                //     <MarketCard key={asset.asset} asset={asset} filterMinted={filterMinted} />
                                // </Grid>
                                
                            ))
                        }
                </Grid>

            {/* </Container> */}
            </Grid>

        </Box>
    )
}

// Card filter program
function CardFilter(props) {
    // Btc rate
    const btcRate = parseFloat(props.asset.satoshirate) / 100000000

    const [ minted, setMinted ] = useState(false)
    useState (() => {
        let exists = Object.keys(props.asset).includes("minted");

        if (exists) {
            setMinted(true)
        }
    }, [])

    const Card = (
        <Grid item xs={6} lg={4} xl={3} sx={{ p: 1, m: 0 }}>
            <LazyLoad height={200}>
                <MarketCard key={props.asset.asset} asset={props.asset} filterMinted={props.filterMinted} />
            </LazyLoad>
        </Grid>
    )

    let component = Card

    // Create checks
    let mintCheck = false
    let priceRangeCheck = true
    let searchCheck = true

    // Parse for minted/unminted filter
    if (props.filterMinted && minted == true) {
        mintCheck = true
    } else if ( props.filterMinted == false && minted == false ) {
        mintCheck = true
    } else {
        component = null
    }

    // Parse for min / max price
    let minPrice
    props.minPrice == "" ? minPrice = 0 : minPrice = props.minPrice
    let maxPrice
    props.maxPrice == "" ? maxPrice = 999 : maxPrice = props.maxPrice

    if(btcRate < minPrice) {
        priceRangeCheck = false
    } else if (maxPrice < btcRate) {
        priceRangeCheck = false
    }

    // Search terms
    const alias = props.asset.asset_longname
    if (alias.toLowerCase().includes(props.searchValue) == false) {
        searchCheck = false
    }

    if (mintCheck && priceRangeCheck && searchCheck) {
        return component
    } else {
        return null
    }
}

const getDispensers = async () => {
    const response = await fetch('https://questfrens.herokuapp.com/get_dispensers');
    const dispenserData = await response.json();
    console.log(dispenserData)
    return dispenserData
    // return testDb
}
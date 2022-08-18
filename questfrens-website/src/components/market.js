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

// Colors
import { grey } from '@mui/material/colors'

// Custom imports
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AttrBar from "./market/attrBar"
import FooterEl from './footerEl';

import LazyLoad from 'react-lazyload' //https://github.com/twobin/react-lazyload

// Collection JSON import
// TODO: Streamline collections import

import CollectionsDropDown from "./market/collectionsDropDown"
import SearchBar from "./searchBar"
import Dashboard from "./dashboard"
import MarketCard from "./cards/marketCard"
import qfIcon from "../assets/QFicontemp.png"
import qfBg from "../assets/qfBg.gif"
import punkBg from "../assets/punkBg.png"
import punkIcon from "../assets/pfIcon.png"
import fakeBg from "../assets/fakeBg.jpg"
import fakeIcon from "../assets/feelsfake.jpg"
import commonIcon from "../assets/commonIcon.png"
import commonBg from "../assets/commonBg.jpg"

import testDb from "../assets/testDB.json"
import punkDb from "../assets/punkDb.json"

export default function Market(props) {
    // Gets collection header
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery();
    const collectionParam = query.get('collection')
    console.log(collectionParam)

    // Collection
    const [ collection, setCollection ] = useState({
        params: "",
        title: "",
        info: "",
        icon: qfIcon,
        bg: qfBg,
        dispenserListURL: "",
        statsURL: "",
        attributeList: "",
        minted: false
    })
    // Set collection title

    // Sets collection on load
    useEffect(() => {
        // If collection has a parameter, pass collection if valid
        if (collectionParam) {
            if (collectionParam == "questfrens") { // TODO: Social buttons
                setCollection({
                    param: "questfrens",
                    title: "Questfrens",
                    info: "Dynamically generated, interactive NFTs on the Counterparty network.",
                    icon: qfIcon,
                    bg: qfBg,
                    dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=questfrens",
                    statsURL: "https://frenzone.net/questfrens/stats/questfren_stats.json",
                    attributeList: "",
                    minted: false
                })
            } else if (collectionParam == "mint") {
                setCollection({
                    param: "mint",
                    title: "Questfrens",
                    info: "Dynamically generated, interactive NFTs on the Counterparty network.",
                    icon: qfIcon,
                    bg: qfBg,
                    dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=mint",
                    statsURL: "https://frenzone.net/questfrens/stats/questfren_stats.json",
                    attributeList: "",
                    minted: true
                })
            } else if (collectionParam == "punkfrens") {
                setCollection({
                    param: "punkfrens",
                    title: "Punk Frens",
                    info: "Counterparty's first generative art collection.",
                    icon: punkIcon,
                    bg: punkBg,
                    dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=punkfrens",
                    statsURL: "https://frenzone.net/masterlist/punkfren_stats.json",
                    attributeList: "",
                    minted: true
                })
            } else if (collectionParam == "fakerares") {
                setCollection({
                    param: "fakerares",
                    title: "Fake Rares",
                    info: "The Fakest collection on XCP. Beware.",
                    icon: fakeIcon,
                    bg: fakeBg,
                    dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=fakerares",
                    statsURL: "https://frenzone.net/questfrens/stats/fakerares_stats.json",
                    attributeList: "",
                    minted: true
                })
            } else if (collectionParam == "fakecommons") {
                setCollection({
                    param: "fakecommons",
                    title: "Fake Commons",
                    info: "Faker than fake rares.",
                    icon: commonIcon,
                    bg: commonBg,
                    dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=fakecommons",
                    statsURL: "https://frenzone.net/questfrens/stats/fakecommons_stats.json",
                    attributeList: "",
                    minted: true
                })
            }
        }
    }, [])

    // Dispenser array
    const [ marketList, setMarketList ] = useState([]) // Market list hosts array of objects to display as market cards
    useEffect(() => {
        console.log(marketList)
    }, [marketList])
    const [ stats, setStats ] = useState({
        "items": 0,
        "holders": 0,
        "total_btc_vol": 0,
        "btc_floor": 0
    })
    // Sets dispenser list master list
    const getMarketList = () => fetch(collection.dispenserListURL).then(response => response.json())
    const getStats = () => fetch(collection.statsURL).then(response => response.json())
    useEffect(() => {
        (async () => {
            // Set market list
            // setMarketList(testDb)
            setMarketList(await getMarketList())
            
            // Set stats
            if(collection.statsURL) {
                setStats(await getStats())
            } else {
                setStats({
                    "items": 0,
                    "holders": 0,
                    "total_btc_vol": 0,
                    "btc_floor": 0
                })
            }
            
        })();
    }, [collection]);

    // Market / Activity & switch
    const [ activityList, setActivityList ] = useState([])
    const [ activityToggle, setActivityToggle ] = useState(false)
    const getActivities = () => fetch("https://questfrens.herokuapp.com/get_activity").then(response => response.json())
    const handleActivityToggle = async (type) => {
        (async (type) => {
            // Toggles activity page
            // setActivityToggle(!activityToggle)

            // Load activity
            // setActivityList(await getActivities())
        })();
    }
    useEffect(() => {
        console.log(activityToggle)
    }, [activityToggle])
    useEffect(() => {
        console.log(activityList)
    }, [activityList])

    // FILTERS
    // Filters for attributes
    const [ attrFilters, setAttrFilters ] = useState({
        // Takes in keys from attributes and passes through 
        //      values to filter func when filtering by attr
    })

    // Sets attribute filter list
    const [ attributes, setAttributes ] = useState(false)
    // Gets properties of first found attribute and sets to filters
    useEffect(() => {
        // Parse through array of objects
        //  for each asset that has attributes save to array of objects once
        let filterKeys = {}
        let attributeObject = {}

        // Get attribute values
        for (const asset of marketList) {
            if (Object.keys(asset).includes("attributes")) {

                for (const attr of asset.attributes) {
                    // console.log(`${attr.trait_type}: ${attr.value}`)

                    // Add atttribute key and value if key not found
                    if (!Object.keys(attributeObject).includes(attr.trait_type)) {

                        // Add keys to attribute list
                        const keyName = attr.trait_type
                        attributeObject[keyName] = []

                        // Add values to attribute list
                        const valueName = attr.value
                        attributeObject[attr.trait_type].push(valueName)

                        // Add keys to filter scheme
                        filterKeys[keyName] = []

                    } else {
                        // Else add attribute value if doesn't already exist in key
                        if (!Object.values(attributeObject[attr.trait_type]).includes(attr.value)) {
                            const valueName = attr.value
                            attributeObject[attr.trait_type].push(valueName)
                        }
                    }
                }

            }
        }
        console.log(attributeObject)

        // Sort lists
        for (const [key, value] of Object.entries(attributeObject)) {
            // If numeric
            if(!isNaN(value[0])) {
                attributeObject[key] = value.sort(function (a, b){return a - b})
            } else {
                // If alpha
                attributeObject[key] = value.sort()
            }
        }
        
        // console.log(attributeObject)
        setAttributes(attributeObject)  // Passes attribute keys and values to filter menu
        setAttrFilters(filterKeys)  // Passes keys to attribute filter
    }, [marketList])
    
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
        console.log(marketList)
    }, [priceDirection])

    const [ filterShow, toggleFilterShow ] = useState(true)
    const handleFilterToggle = () => {
        toggleFilterShow(!filterShow)
    }

    return (
        <Box sx={{ width: "100vw", minHeight: "90%", height: "auto" }}>

            {/* Header */}
            <Container  maxWidth="0" 
                sx={{ width: "100%", height: "340px", display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignItems: "space-between"}}
            >

                <Box disableGutters style={{ height: "340px", width: "100%", background: `url(${collection.bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", zIndex: "-1", position: "absolute", left: 0, filter: "blur(0px)", opacity: 0.1, ml:0, p:0, overflow: "hidden" }}></Box>

                <Grid container spacing={0} sx={{ height: "auto" }}>

                    {/* Icon */}
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} sx={{ }}>
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
                            src={collection.icon}
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
                            ₿{stats.total_btc_vol}
                        </Typography>
                        <Typography variant="overline">
                            Total Vol
                        </Typography>
                    </Grid>

                    <Grid item xs={2} sm={1} lg={0.75} xl={0.75} sx={{  }}>
                        <Typography variant="h5" sx={{  }}>
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
                    <Grid item xs={4} lg={2} sx={{}} className="hoverColor" onClick={() => {handleFilterToggle()}}>
                        <Grid container xs={12} xl={4} sx={{}}>
                            <Grid item xs={1} md={1} xl={1} />
                            <Grid item xs={1} md={1} xl={1} sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                <ArrowBackIosIcon sx={{  color: props.theme.palette.secondary.main }} />
                            </Grid>
                            <Grid item xs={3} md={10} xl={10} sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                <Typography variant="overline" sx={{ height: "100%", pt: "2px", pl: 1, fontSize: "1rem", color: props.theme.palette.secondary.main }}>
                                    Filters
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={8} lg={9}>
                        <Grid container xs={12} sx={{ height: "100%", display: "flex", justifyContent: "left", alignItems: "center" }}>
                                <Button  
                                    onClick={handleActivityToggle}
                                    // onClick={() => {setActivityToggle(!activityToggle)}}
                                    sx={{ height: "100%" }}
                                    color={ activityToggle ? "warning" : "secondary" }
                                >Items</Button>
                                {/* <Button 
                                    onClick={handleActivityToggle}
                                    // onClick={() => {setActivityToggle(!activityToggle)}}
                                    sx={{ height: "100%" }}
                                    color={ activityToggle ? "secondary" : "warning" }
                                >Activity</Button> */}
                        </Grid>
                    </Grid>
            </Grid>

            
            <Grid container xs={12} sx={{ }}>
                
                {/* Filter */}
                <Grid 
                    container xs={filterShow ? 12 : 0} sm={filterShow ? 4 : 0} lg={filterShow ? 2 : 0} 
                    spacing={0}
                    sx={{width: "auto", height: "100%", pl: 1, pr: 1}}>

                    <Collapse in={filterShow} timeout="auto" unmountOnExit>
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

                    {/* Collection */}
                    <Grid item xs={12} lg={12} sx={{  }}>
                        <CollectionsDropDown
                            collection={collection}
                        />
                    </Grid>

                    {/* <Grid item xs={12} lg={12} sx={{  }}>
                        { !collection.minted ?
                        <Grid container xs={12} sx={{ pl:1 }}>
                            <Typography variant="overline">
                                Filter minted tokens
                            </Typography>
                        </Grid>
                        : null }
                        { !collection.minted ?
                        <Grid container xs={12} sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", pl:1 , pb: 2, borderBottom: "1px solid rgb(40,45,49)"}}>
                            <Button 
                                color="secondary"
                                variant={ filterMinted ? "outlined" : "contained"}
                                onClick={() => {handleFilterMinted()}}
                            >
                                { filterMinted ? "Show Unminted" : "Show Minted" }
                            </Button>
                        </Grid>
                        : null }
                    </Grid> */}

                    {/* Filter properties */}
                    {
                        Object.entries(attributes).map(([key, value]) => (
                            // <Typography>{key} : {value.toString()}</Typography>
                            <AttrBar name={key} values={value} filters={attrFilters} setFilters={setAttrFilters} />
                        ))
                    }
                </Collapse>
            </Grid>

                {/* Assets */}
                {marketList.length > 0 ?
                <Grid container xs={filterShow ? 12 : 0} sm={filterShow ? 8 : 12} lg={filterShow ? 10 : 12} sx={{ width: "100%", height: "100%" }}>
                    {/* Search and price direction */}
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", pr: 2, p: 2 }}>
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
                    { !activityToggle ?
                        marketList.map((asset) => (
                            <CardFilter 
                                asset={asset}
                                minPrice={minPrice} maxPrice={maxPrice}
                                searchValue={searchValue} collectionMinted={collection.minted}
                                attrFilters={attrFilters}
                            />
                        ))
                    : 
                    <Grid container xs={12} sx={{ pl: 1, pr:1 }}>
                        {activityList.length > 1 ? activityList.map((tx) => (
                            <Grid item xs={12} 
                                sx={{ borderBottom: "1px solid rgb(40,45,49)", backgroundColor: "rgb(34,38,42)" }}
                                // onClick={() => {() => openInNewTab(`https://xchain.io/tx/${tx.source}`)}}
                            >
                                
                                <Grid container xs={12} sx={{ pt: 2, pb: 2, pr: 2 }}>
                                    <Grid item xs={2} sm={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Avatar>{tx.source[2]}</Avatar>
                                    </Grid>

                                    <Grid item xs={8} sm={9} sx={{ display: "left", justifyContent: "left", alignItems: "center", overflow: "hidden" }}>
                                        
                                        
                                            <Typography align="left" sx={{ fontSize: "1.2rem" }}>
                                                <Link href={`https://xchain.io/asset/${tx.asset}`} target="_blank" color="secondary" sx={{ textDecoration: "none" }}>
                                                    {tx.asset}
                                                </Link>
                                                <Typography style={{color: "rgb(155,155,155)"}} variant="caption">
                                            { tx.type == "dispenser" ? 
                                                    "  Open Dispenser"
                                                :
                                                    "  Sale"
                                            }
                                            </Typography>
                                            </Typography>
                                        

                                        <Typography align="left" variant="body2" sx={{ width: "100%" }}></Typography>

                                        
                                        {tx.type == "dispenser" ?
                                            
                                                <Typography align="left" variant="body2" sx={{ width: "100%" }}>
                                                    <span style={{color: "rgb(155,155,155)"}}>Source: </span>
                                                    <Link href={`https://xchain.io/address/${tx.source}`} target="_blank" color="rgb(255,255,255)" sx={{ textDecoration: "none" }}>
                                                        {tx.source}
                                                    </Link>
                                                </Typography>
                                            
                                        : 
                                            
                                                <Typography align="left" variant="body2" sx={{ width: "100%" }}>
                                                    <span style={{color: "rgb(155,155,155)"}}>To: </span>
                                                    <Link href={`https://xchain.io/tx/${tx.tx_hash}`} target="_blank" color="rgb(255,255,255)" sx={{ textDecoration: "none" }}>
                                                        {tx.source}
                                                    </Link>
                                                </Typography>
                                        }
                                        
                                    </Grid>

                                    <Grid item xs={2} sm={2} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                        <Typography align="right" variant='overline' sx={{ fontSize: "1rem" }}>
                                        {tx.type == "dispenser" ?
                                            `₿${tx.satoshirate / 100000000}`
                                            :
                                            `QTY ${tx.dispense_quantity}`
                                        }
                                        </Typography>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                        )) : null}
                        </Grid>
                    }
                </Grid>
                : 
                <Grid 
                    container xs={filterShow ? 12 : 0} sm={filterShow ? 8 : 12} lg={filterShow ? 10 : 12} 
                    sx={{ width: "100%", height: "100%", minHeight: "100px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                >
                    
                    { collection.params !== "" ?
                        <Container sx={{ width: "100%", height: "100%", minHeight: "100px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="overline" sx={{ pt: 3 }}>Reading blockchain transactions...</Typography>
                            <Box sx={{ display: 'flex', pt: 3, pb: 5 }}>
                                <CircularProgress />
                            </Box>
                        </Container>
                    :
                        <Typography variant="overline" sx={{ pt: 3 }}>Please select a collection...</Typography>
                    }
                </Grid>
                }
            </Grid>
            <FooterEl />
        </Box>
    )
}

// Card filter program
function CardFilter(props) {

    // Btc rate
    const btcRate = parseFloat(props.asset.satoshirate) / 100000000

    let minted = Object.keys(props.asset).includes("minted")

    const Card = (
        <Grid item xs={6} lg={4} xl={3} sx={{ p: 1, m: 0 }}>
            <LazyLoad height={200}>
                <MarketCard key={props.asset.asset} asset={props.asset} />
            </LazyLoad>
        </Grid>
    )

    // Create checks
    let priceRangeCheck = true
    let searchCheck = true
    let attributeCheck = true

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
    let alias = null
    // console.log(props.asset.hasOwnProperty("asset_longname"))
    // Splits flow between assets that are named "asset" or "asset_longname"
    if (props.asset.hasOwnProperty("asset_longname")) {
        alias = props.asset.asset_longname
    } else {
        alias = props.asset.asset
    }
    
    // TODO: Figure out bug here
    if (alias.toLowerCase().includes(props.searchValue) == false) {
        searchCheck = false
    }

    // Attributes filter
    // Check card has attributes to save time
    let attrFilterCheck = false     // Only search if filters are active
    for (const [key, value] of Object.entries(props.attrFilters)) {
        if (value.length > 0) {
            attrFilterCheck = true // sets attr filter search on
            attributeCheck = false // turn default off default true
        }
    }
    // if card has attr and attr filters active then
    if (Object.keys(props.asset).includes("attributes") && attrFilterCheck) {

        // For each attr key of asset
        for (const attr of props.asset.attributes) {
            

            // console.log(key)
            // console.log(Object.values(props.attrFilters[key]))
            
            // Check that a value matches relevant filter value
            if (Object.values(props.attrFilters[attr.trait_type]).includes(attr.value)) {
                // console.log("INCLUDED")
                attributeCheck = true
            }
        }
    }



    if (priceRangeCheck && searchCheck && attributeCheck) {
        return Card
    } else {
        return null
    }
}
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
import punkBg from "../assets/punkBg.png"
import punkIcon from "../assets/pfIcon.png"
import fakeBg from "../assets/fakeBg.jpg"
import fakeIcon from "../assets/feelsfake.jpg"
import commonIcon from "../assets/commonIcon.png"
import commonBg from "../assets/commonBg.jpg"

import testDb from "../assets/testDB.json"
import punkDb from "../assets/punkDb.json"

export default function Market(props) {
    // Collection
    const [ collection, setCollection ] = useState({
        title: "Questfrens",
        info: "Dynamically generated, interactive NFTs on the Counterparty network.",
        icon: qfIcon,
        bg: qfBg,
        dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=questfrens",
        statsURL: "https://frenzone.net/questfrens/stats/questfren_stats.json",
        attributeList: "",
        minted: false
    })

    // Dispenser array
    const [ marketList, setMarketList ] = useState([])
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
            // setMarketList(punkDb)
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

    // Sets attribute filter list
    const [ attrFilters, setAttrFilters ] = useState([])
    // Gets properties of first found attribute and sets to filters
    useEffect(() => {
        console.log(marketList)
        // let attrList = []

        // for (const asset of marketList) {
        //     if (Object.keys(asset).includes("attributes")) {
        //         // console.log(asset.attributes)
        //         for (const attribute of Object.entries(asset.attributes)) {
                    
        //             // console.log(attribute)
        //             // let attr_type = attribute[0]
        //             // let attr_val = attribute[1]

        //             // // IF key is not already present, add key
        //             // if (!Object.keys(attrList).includes(attr_type)) {

        //             //     attrList.push({attribute[0]: attribute[1]})
        //             // }

        //             // Add atr value to relevant type
        //             // attrValArray = 
        //             // attrList[attr_type] = 
        //         }

        //         // setAttrFilters(attrList)
        //     }
        // }
    }, [marketList])
    useEffect(() => {
        console.log(attrFilters)
    }, [attrFilters])

    // COLLECTIONS SWAP
    const [ collectionName, setCollectionName ] = useState("Questfrens")
    const handleCollectionChange = (event) => {
        console.log(event.target.value)
        setCollectionName(event.target.value)

        if (event.target.value == "questfrens") {
            setCollection({
                title: "Questfrens",
                info: "Dynamically generated, interactive NFTs on the Counterparty network.",
                icon: qfIcon,
                bg: qfBg,
                dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=questfrens",
                statsURL: "https://frenzone.net/questfrens/stats/questfren_stats.json",
                attributeList: "",
                minted: false
            })
        } else if (event.target.value == "mint") {
            setCollection({
                title: "Questfrens",
                info: "Dynamically generated, interactive NFTs on the Counterparty network.",
                icon: qfIcon,
                bg: qfBg,
                dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=mint",
                statsURL: "https://frenzone.net/questfrens/stats/questfren_stats.json",
                attributeList: "",
                minted: true
            })
        } else if (event.target.value == "punkfrens") {
            setCollection({
                title: "Punk Frens",
                info: "Counterparty's first generative art collection.",
                icon: punkIcon,
                bg: punkBg,
                dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=punkfrens",
                statsURL: "https://frenzone.net/masterlist/punkfren_stats.json",
                attributeList: "",
                minted: true
            })
        } else if (event.target.value == "fakerares") {
            setCollection({
                title: "Fake Rares",
                info: "The Fakest collection on XCP. Beware.",
                icon: fakeIcon,
                bg: fakeBg,
                dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=fakerares",
                statsURL: "",
                attributeList: "",
                minted: true
            })
        } else if (event.target.value == "fakecommons") {
            setCollection({
                title: "Fake Commons",
                info: "Faker than fake rares.",
                icon: commonIcon,
                bg: commonBg,
                dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=fakecommons",
                statsURL: "",
                attributeList: "",
                minted: true
            })
        }
    }
    
    // Filters
    const [ filters, setFilters ] = useState({
        minted: false,
    })
    
    const [ filterMinted, toggleFilterMinted ] = useState(true)
    // const handleFilterMinted = () => {
    //     setCollection({
    //         title: "Questfrens",
    //         info: "Dynamically generated, interactive NFTs on the Counterparty network.",
    //         icon: qfIcon,
    //         bg: qfBg,
    //         dispenserListURL: "https://questfrens.herokuapp.com/get_dispensers?collection=mint",
    //         statsURL: "https://frenzone.net/questfrens/stats/questfren_stats.json",
    //         attributeList: "",
    //         minted: false
    //     })
    //     toggleFilterMinted(!filterMinted)
    // }

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
        // toggleFilterShow(!filterShow)
    }
    const filterShowing = {
        width: "auto", height: "100%", transition: "1s", pl: 1, pr: 1
    }
    const filterHidden = {
        opacity: 0, zIndex: "-1", pointerEvents: "none", transition: "1s"
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

                    {/* Collection */}
                    <Grid item xs={12} lg={12} sx={{  }}>
                        <Grid container xs={12} sx={{ pt: 1, pl:1 , pr: 1, pb: 2, borderBottom: "1px solid rgb(40,45,49)" }}>
                            <Typography variant="overline">
                                Collections
                            </Typography>
                            <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
                            <Select
                                labelId="collection-label"
                                id="collection-select"
                                value={collectionName}
                                // label="Collection"
                                onChange={handleCollectionChange}
                            >
                                <MenuItem value={"questfrens"}>Questfrens</MenuItem>
                                <MenuItem value={"mint"}>Questfren Mint Tokens</MenuItem>
                                <MenuItem value={"punkfrens"}>Punk Frens</MenuItem>
                                <MenuItem value={"fakerares"}>Fake Rares</MenuItem>
                                <MenuItem value={"fakecommons"}>Fake Commons</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
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
                    {/* {
                            .map(asset => (
                                
                            ))
                        }
                    } */}
                </Grid>

                {/* Assets */}
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
                        {
                            marketList.map(asset => (
                                <CardFilter 
                                    asset={asset} filterMinted={filterMinted} 
                                    minPrice={minPrice} maxPrice={maxPrice}
                                    searchValue={searchValue} collectionMinted={collection.minted}
                                />
                            ))
                        }
                </Grid>
            </Grid>

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

    // TODO:
    // https://d3vy6llg1tejsu.cloudfront.net/images/1.png
    // PUNK FRENS NEED "images" folder

    // Create checks
    let mintCheck = false
    let priceRangeCheck = true
    let searchCheck = true

    // Parse for minted/unminted filter
    if (props.filterMinted && minted == true) {
        mintCheck = true
    } else if ( props.filterMinted == false && minted == false ) {
        mintCheck = true
    } 
    // Cencels out if project is fully minted
    if (props.collectionMinted) { mintCheck = true }

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
    
    
    if (alias.toLowerCase().includes(props.searchValue) == false) {
        searchCheck = false
    }

    if (mintCheck && priceRangeCheck && searchCheck) {
        return Card
    } else {
        return null
    }
}
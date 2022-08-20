import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Skeleton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

// Custom comps
import Properties from "./asset/properties"
import AssetTitle from './asset/assetTitle'
import AssetMedia from "./asset/assetMedia"
import PriceInfo from './asset/priceInfo';
import DispenserList from './asset/dispenserList';
import HolderList from './asset/holderList';
import FooterEl from './footerEl';

// TODO:
// Fix a name delivery
// parse rare pepes through back end and attach images

// TODO: 
// ADD SKELETON ON LOAD

// TODO:
// Use divisble to parse correct quants

export default function Asset(props) {

    // Gets url params
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery();
    const assetName = query.get('name')

    // Asset Info
    const [ assetInfo, setAssetInfo ] = useState({
        "version": "",
        "name": "",
        "artist": "",
        "description": "",
        "attributes": [],
        "issuer": "",
        "media": {
            "image": "",
            "video": "",
            "iframe": {
                "height": 0,
                "width": 0,
                "src": ""
            }
        },
        "external_url": "",
        "divisible": "",
        "locked": "",
        "supply": "",
        "dispensers": [],
        "divisible": false
    })
    const [ assetMedia, setAssetMedia ] = useState({
        "image_large": "",
    })
    // Get dispensers
    const [ dispensers, setDispensers ] = useState([])
    // Get asset holders
    const [ assetHolders, setAssetHolders ] = useState({})

    // Set important asset display variables
    const [ floorDispenser, setFloorDispenser ] = useState("")
    const [ floor, setFloor ] = useState(0.0)
    const [ lastSold, setLastSold ] = useState(0.0)
    // const [ description, setDescription ] = useState("")
    // const [ issuer, setIssuer ] = useState("")
    const [ cardMediaType, setCardMediaType ] = useState('img')

    // Window size hook
    const [ width, setWidth ] = useState(0)
    useEffect(() => {
        setWidth(props.windowSize.width)
    }, [props.windowSize])

    // iframe for QF
    const [ iframeDimensions, setiFrameDimensions ] = useState({width: 420, height: 560 })

    // Make call to goraredb
    const getAsset = () => fetch(`https://goraredb.herokuapp.com/get_asset?name=${assetName}`).then(response => response.json())
    // Get dispensers call
    const getDispensers = () => fetch(`https://goraredb.herokuapp.com/get_dispenser?name=${assetName}`).then(response => response.json())
    // Get holder call
    const getHolders = () => fetch(`https://questfrens.herokuapp.com/get_holders?name=${assetName}`).then(response => response.json())
    useEffect(() => {
        (async () => {
            let error = false
            // Get asset info
            console.log(assetName)
            const assetRes = await getAsset()
            if ("error" in assetRes) {
                console.log(assetRes)
                return false
            } else {
                setAssetInfo(assetRes)
                console.log(assetRes)

                // Get dispensers
                const dispRes = await getDispensers()
                console.log("DISP RESULUTS")
                console.log(dispRes)

                setDispensers(dispRes)

                // Get asset holders from flask
                const holdersRes = await getHolders()
                setAssetHolders(holdersRes)
            }
        })();
    }, [assetName]);
    // Calculate BTCs
    useEffect(() => {
        // set card media type
        if (assetInfo.media.iframe.src !== "") {
            setCardMediaType("iframe")
        } else if (assetInfo.media.video !== "") {
            setCardMediaType("video")
        } else {
            setCardMediaType("img")
        }
    }, [assetInfo])
    // Calculate dispenser shiet
    useEffect(() => {
        // Calculate BTC shiznit
        let tempFloor = -1
        let tempFloorDisp = ""
        let lastDate = 0
        let lastPrice = 0.0
        // If there is a dispenser history, parse data
        if (dispensers.length > 0) {
            for (let dispenser of dispensers) {
                
                // Check floor
                if (parseInt(dispenser.status) === 0) {
                    if (tempFloor === -1) {
                        tempFloor = dispenser.satoshirate
                        tempFloorDisp = dispenser.tx_hash
                    }
                    if (parseInt(dispenser.satoshirate) < parseInt(tempFloor)) {
                        tempFloor = parseInt(dispenser.satoshirate)
                        tempFloorDisp = dispenser.tx_hash
                    }
                }

                // Check last closed disp
                if (parseInt(dispenser.status) == 10) {
                    if (dispenser.block_index > lastDate) {
                        lastDate = dispenser.block_index
                        lastPrice = (parseInt(dispenser.satoshirate) / 100000000)
                    }
                }
            }

            if (tempFloor !== -1) {
                const conversion = tempFloor / 100000000
                setFloor(conversion)
                setFloorDispenser(tempFloorDisp)
            }
            if (lastDate > 0) {
                setLastSold(lastPrice)
            }
        }
    }, [dispensers])


    return (
        <Container sx={{ height: "100%", width: "100%"}} >

            <Grid // Asset grid wrapper
                container xs={12}
                sx={{ pt: 2, pb: 5 }}
            >

                <Grid // Left Panel
                    item xs={12} sm={4} md={4} lg={5} sx={{ height: "100%", width: "100%", pr: 1, pl: 1 }}
                >
                { (parseInt(width) < 400) == true
                     ?  <AssetTitle // Asset title when portrait
                            assetInfo={assetInfo}
                            // description={description}
                            // issuer={issuer}
                        />
                    : null
                }

                    <Grid container xs={12} sx={{ height: "100%", width: "100%", pb: 1 }}>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <Card // Asset media
                                // Prioritises iFrame, then ternary operate between mp4 and IMG
                                sx={{ width: "100%", height: "100%" }}
                            > 
                                <AssetMedia 
                                    cardMediaType={cardMediaType} 
                                    iframeDimensions={iframeDimensions}
                                    assetInfo={assetInfo}
                                    width={width}
                                />
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid // Properties card
                        container xs={12}
                        sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1, pb: 1 }}
                    >
                        <Properties title="Properties" bgColor="rgb(19,22,25)"
                            content={
                                <Box sx={{ p: 2 }}>
                                    <Grid container xs={12} sx={{  }}>

                                        <Grid container xs={12} sx={{  }}>
                                            
                                                {/* <Typography textAlign="right">N/A</Typography> */}
                                                { 
                                                assetInfo.attributes ?
                                                        assetInfo.attributes.map((attr) => (
                                                        <Grid container xs={12}>
                                                            <Grid item xs={6}>
                                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>{attr.trait_type}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography textAlign="right">{attr.value}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        ))
                                                    :   <Grid container xs={12}>
                                                            <Grid item xs={6}>
                                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Properties</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography textAlign="right">N/A</Typography>
                                                            </Grid>
                                                        </Grid>
                                                }
                                            
                                        </Grid>

                                    </Grid>
                                </Box>
                            } 
                        />
                    </Grid>

                    <Grid // Token details card
                        container xs={12}
                        sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1, pb: 1 }}
                    >
                        <Properties 
                            title="Token Details" bgColor="rgb(19,22,25)"
                            content={
                                <Box sx={{ p:2 }}>
                                    <Grid container xs={12} sx={{  }}>
                                    
                                        <Grid container xs={12} sx={{  }}>
                                            <Grid item xs={6}>
                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Token ID</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography textAlign="right">{assetInfo.id}</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container xs={12} sx={{  }}>
                                            <Grid item xs={6}>
                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Blockchain</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography textAlign="right">XCP</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container xs={12} sx={{  }}>
                                            <Grid item xs={6}>
                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Divisible</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography textAlign="right">
                                                    {
                                                        assetInfo.divisible.toString()
                                                    }
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container xs={12} sx={{  }}>
                                            <Grid item xs={6}>
                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Locked</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography textAlign="right">{assetInfo.locked.toString()}</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sx={{ borderBottom: "1px solid rgb(155,155,155)", pt: 1}}></Grid>

                                        <Grid container xs={12} sx={{ pt: 1 }}>
                                            <Grid item xs={6}>
                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Supply</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography textAlign="right">{assetInfo.supply.toString()}</Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Box>
                        } />
                    </Grid>

                    <Grid // Collection details card
                        container xs={12}
                        sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1, pb: 1 }}
                    >
                        <Properties title="Collection Details" bgColor="rgb(19,22,25)"
                            content={
                                <Box sx={{ p: 2 }}>
                                    <Grid container xs={12} sx={{  }}>

                                        <Grid container xs={12} sx={{  }}>
                                            <Grid item xs={6}>
                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Collection</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography textAlign="right">N/A</Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Box>
                            } 
                        />
                    </Grid>

            </Grid>

                <Grid // Right panel
                    item xs={12} sm={8} md={8} lg={7} sx={{ pr: 1, pl: 1 }}
                >

                { (parseInt(width) < 400) == false
                     ?  <AssetTitle // Asset title when portrait
                            assetInfo={assetInfo}
                            // description={description}
                            // issue={owner}
                            width={width}
                        />
                    : null
                }


                <Grid // Dispenser floor container
                    container xs={12} sx={{ pt: 2, pl: 0 }}
                >
                    <Grid item xs={12}>
                        <PriceInfo 
                            assetInfo={assetInfo} 
                            dispensers={dispensers}
                            lastSold={lastSold}
                            floor={floor}
                            floorDispenser={floorDispenser}
                        />
                    </Grid>
                </Grid>

                <Grid // Dispenser list container
                    container xs={12} sx={{ pt: 2, pl: 0 }}
                >
                    <DispenserList assetInfo={assetInfo} width={width} dispensers={dispensers} />
                </Grid>

                <Grid // Dispenser list container
                    container xs={12} sx={{ pt: 2, pl: 0 }}
                >
                    <HolderList assetHolders={assetHolders} width={width} supply={assetInfo.supply} />
                </Grid>

            </Grid>

            </Grid>
            <FooterEl />
        </Container>
    )
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
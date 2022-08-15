import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
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
import DispenserList from './asset/dispenserList';
import FooterEl from './footerEl';

// TODO:
// Fix a name delivery
// parse rare pepes through back end and attach images

// TODO: 
// ADD SKELETON ON LOAD

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
        "dispensers": []
    })
    const [ assetMedia, setAssetMedia ] = useState({
        "image_large": "",
    })

    // Set important asset display variables
    const [ floorDispenser, setFloorDispenser ] = useState("")
    const [ floor, setFloor ] = useState(0.0)
    const [ lastSold, setLastSold ] = useState(0.0)
    const [ description, setDescription ] = useState("")
    const [ owner, setOwner ] = useState("")
    const [ cardMediaType, setCardMediaType ] = useState('img')

    // Window size hook
    const [ width, setWidth ] = useState(0)
    useEffect(() => {
        setWidth(props.windowSize.width)
    }, [props.windowSize])

    // iframe for QF
    const [ iframeDimensions, setiFrameDimensions ] = useState({width: 420, height: 560 })

    // Make call to XCP node
    const getAsset = () => fetch(`https://questfrens.herokuapp.com/get_asset?name=${assetName}`).then(response => response.json())
    useEffect(() => {
        (async () => {
            // Get asset info
            const res = await getAsset()
            setAssetInfo(res)
            // Set important  info vars
            setDescription(res.description)
            setOwner(res.owner)
        })();
    }, [assetName]);
    // Calculate BTCs
    useEffect(() => {
        console.log(assetInfo)

        // Calculate BTC shiznit
        let tempFloor = -1
        let tempFloorDisp = ""
        let lastDate = 0
        let lastPrice = 0.0
        // If there is a dispenser history, parse data
        for (let dispenser of assetInfo.dispensers) {
            
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

        // set card media type
        if (assetInfo.media.iframe.src !== "") {
            setCardMediaType("iframe")
        } else if (assetInfo.media.video !== "") {
            setCardMediaType("video")
        } else {
            setCardMediaType("img")
        }

    }, [assetInfo])


    return (
        <Container sx={{ height: "100%", width: "100%"}} >

            <Grid // Asset grid wrapper
                container xs={12}
                sx={{ pt: 2, pb: 5 }}
            >

                <Grid // Left Panel
                    item xs={12} md={4} lg={5} sx={{ height: "100%", width: "100%", pr: 1, pl: 1 }}
                >
                { (parseInt(width) < 400) == true
                     ?  <AssetTitle // Asset title when portrait
                            assetInfo={assetInfo}
                            description={description}
                            owner={owner}
                        />
                    : null
                }

                    <Grid container xs={12} sx={{ height: "100%", width: "100%", pb: 1 }}>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                        <Card // Asset media
                            // Prioritises iFrame, then ternary operate between mp4 and IMG
                            sx={{ width: "100%", height: "100%", maxWidth: iframeDimensions.width }}
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
                                                <Typography textAlign="right">{assetInfo.divisible.toString()}</Typography>
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
                    item xs={12} md={8} lg={7} sx={{ pr: 1, pl: 1 }}
                >

                { (parseInt(width) < 400) == false
                     ?  <AssetTitle // Asset title when portrait
                            assetInfo={assetInfo}
                            description={description}
                            owner={owner}
                            width={width}
                        />
                    : null
                }


                <Grid // Dispenser floor container
                    container xs={12} sx={{ pt: 2, pl: 0 }}
                >
                    <Card
                        sx={{ width: "100%", border: "1px solid rgba(155,155,155, 0.1)", p: 0, m: 0 }}
                    >
                        <Grid container xs={12} sx={{ p: 2 }}>
                            
                            <Grid // unlisted / price
                                item xs={6} sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}
                            >
                                { 
                                    assetInfo.dispensers.length > 0 
                                    ?   <Box sx={{ textAlign: "left" }}>
                                            <Typography variant="caption" sx={{ color: "rgb(155,155,155)" }}>Dispenser Floor Price</Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 500 }}>₿ {floor}</Typography>
                                            <Typography variant="caption" sx={{ color: "rgb(155,155,155)" }}>Last Listed Price</Typography>
                                            <Typography>₿ {lastSold}</Typography>
                                        </Box>
                                    : "Unlisted"
                                }
                            </Grid>
                            <Grid // dispenser button
                                item xs={6} sx={{ display: "flex", justifyContent: "right", alignItems: "top" }}
                            >
                                {
                                    floor > 0.0
                                    ?   <Link href={`https://xchain.io/tx/${floorDispenser}`} target="_blank" sx={{ textDecoration: "none" }}>
                                            <Button color="secondary" variant="outlined">Buy Now</Button>
                                        </Link>
                                        
                                    : <Box><Button color="secondary" variant="outlined" disabled={true}>Make Offer</Button></Box>
                                }
                                
                            </Grid>
                            
                        </Grid>
                    </Card>
                </Grid>

                <Grid // Dispenser list container
                    container xs={12} sx={{ pt: 2, pl: 0 }}
                >
                    <DispenserList assetInfo={assetInfo} />
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
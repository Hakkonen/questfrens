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

// TODO:
// Fix a name delivery
// parse rare pepes through back end and attach images

export default function Asset(props) {

    // Gets url params
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery();
    const assetName = query.get('name')

    // Asset Info
    const [ assetInfo, setAssetInfo ] = useState({
        "asset": "",
        "asset_longname": "",
        "dispensers": [],
        "description": "",
        "divisible": "false",
        "locked": "",
        "owner": "",
        "supply": 0
    })
    const [ assetMedia, setAssetMedia ] = useState({
        "image_large": "",
    })

    // Set important asset display variables
    const [ price, setPrice ] = useState(0.0)
    const [ floorDispenser, setFloorDispenser ] = useState("")
    const [ floor, setFloor ] = useState(0.0)
    const [ lastSold, setLastSold ] = useState(0.0)
    const [ description, setDescription ] = useState("")
    const [ owner, setOwner ] = useState("")

    // WIndow size hook
    const [ width, setWidth ] = useState(0)
    useEffect(() => {
        setWidth(props.windowSize.width)
    }, [props.windowSize])

    // Make call to XCP node
    const getAsset = () => fetch(`https://questfrens.herokuapp.com/get_asset?name=${assetName}`).then(response => response.json())
    // Get asset image, multimedia, or iframe
    const getAssetMedia = () => fetch(assetInfo.description).then(response => response.json())
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
    useEffect(() => {
        (async () => {
            console.log(assetInfo)
            try {
                if (isValidHttpUrl(assetInfo.description)) {
                    setAssetMedia(await getAssetMedia())
                }
            } catch {}
        })();
        // If description is a url
        // if (assetInfo.description)
    }, [assetInfo])
    useEffect(() => {
        console.log(assetMedia)
    }, [assetMedia])
    // Calculate BTCs
    useEffect(() => {
        let tempFloor = 999999.0
        let tempFloorDisp = ""
        let lastDate = 0
        let lastPrice = 0.0
        // If there is a dispenser history, parse data
        for (let dispenser of assetInfo.dispensers) {
            

            // Check floor
            if (parseInt(dispenser.status) === 0) {
                if (parseInt(dispenser.satoshirate / 100000000) < parseInt(tempFloor)) {
                    tempFloor = dispenser.satoshirate / 100000000
                    tempFloorDisp = dispenser.tx_hash
                }
            }

            // Check last closed disp
            if (parseInt(dispenser.status) == 10) {
                if (dispenser.block_index > lastDate) {
                    lastDate = dispenser.block_index
                    lastPrice = (dispenser.satoshirate / 100000000)
                }
            }
        }

        if (tempFloor < 999999) {
            setFloor(tempFloor)
            setFloorDispenser(tempFloorDisp)
        }
        if (lastDate > 0) {
            setLastSold(lastPrice)
        }

    }, [assetInfo])


    return (
        <Container sx={{ height: "100%", width: "100%"}} >

            <Grid // Asset grid wrapper
                container xs={12}
                sx={{ pt: 2, pb: 5 }}
            >

                <Grid // Left Panel
                    item xs={12} md={4} sx={{ height: "100%", width: "100%", pr: 1 }}
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
                        <Card // Asset image
                            sx={{ width: "100%", height: "100%", maxWidth: 360 }}
                        >
                            <CardMedia
                                component="img"
                                height="auto"
                                maxHeight="360"
                                width="100%"
                                image={assetMedia.image_large}
                                alt={assetInfo.asset}
                                sx={{ borderRadius: "5px", objectFit: "contain" }}
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
                                            <Grid item xs={6}>
                                                <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Properties</Typography>
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
                                                <Typography textAlign="right">N/A</Typography>
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
                    item xs={12} md={6} sx={{  }}
                >

                { (parseInt(width) < 400) == false
                     ?  <AssetTitle // Asset title when portrait
                            assetInfo={assetInfo}
                            description={description}
                            owner={owner}
                        />
                    : null
                }


                <Grid container xs={12} sx={{ pt: 2, pl: 0 }}>
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

                </Grid>

            </Grid>
            
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
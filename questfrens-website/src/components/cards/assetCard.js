import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { address } from 'bitcoinjs-lib';
import { Link } from "react-router-dom";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

const SkeletonCard = () => (

        <Card sx={{ 
            display: 'flex', alignItems: 'center', p: 1, borderRadius: 3
        }}>
            <Skeleton
                sx={{ bgcolor: 'grey.900', borderRadius: 3 }}
                variant="rectangular"
                width="100%"
                height={360}
            />
        </Card>

)

export default function AssetCard(props) {

    // Asset card object
    const [ loading, setLoading ] = useState(true)
    const [ asset, setAsset ] = useState({
        "version": "xip100",
        "id": 1,
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
        "external_url": ""
    })
    
    // Single asset direct xcp call
    const getAssetData = (h) => fetch(`https://questfrens.herokuapp.com/get_asset_data?name=${h}`).then(response => response.json())
    const [ xcpData, setXcpData ] = useState({})
    const getDescrData = (url) => fetch(`${url}`).then(response => response.json())
    useEffect(() => {
        setAsset(props.asset)

        // check for xip
        if ("media" in props.asset) {
            console.log("Media found")
        } else {
            (async () => {
                // Call xcp directly for more data
                try {
                    const assetData = await getAssetData(props.asset.asset)
                    console.log(assetData)
                    setXcpData(assetData[0])
                } catch(e) {
                    console.error(e)
                }
            })();
        }
    }, [props.asset])
    // Convert direct xcp call to media
    useEffect(() => {
        (async () => {
            
            if ("description" in xcpData && xcpData.description.includes(".json")) {
                try {
                    // Check for http prefix
                    if (!xcpData.description.includes("https://")) {
                        xcpData.description = "https://" + xcpData.description
                    }
                    const descrRes = await getDescrData(xcpData.description)
                    console.log(descrRes)
                    // Get name
                    let name = ""
                    if (xcpData.asset_longname !== "") {
                        name = xcpData.asset_longname
                    } else {
                        name = xcpData.asset
                    }
                    // Get media
                    if ("image_large" in descrRes) {
                        setAsset(prev => ({
                            ...prev,
                            "name": name,
                            "supply": xcpData.supply,
                            media: {
                                "image": descrRes.image_large,
                            }
                        }))
                        setLoading(false)
                    } else if ("image" in descrRes) {
                        setAsset(prev => ({
                            ...prev,
                            "name": name,
                            "supply": xcpData.supply,
                            media: {
                                "image": descrRes.image,
                            }
                        }))
                        setLoading(false)
                    }
                } catch(e) {
                    console.error(e)
                }
            }
        })();
    }, [xcpData])
    useEffect(() => {
        console.log(asset)
    }, [asset])


    
    // Ingests xip100,
    if ("media" in props.asset) {
        console.log("xip100 found")
    } else {
    }

    // Ingests sell or buy field

    // if (!loading) {
    return(
        <Card 
            sx={{ 
                width: "auto", height: "100%", border: "1px solid rgba(155,155,155,0.2)" 
            }} className="hoverColor"
        >

            {
                loading
                ?   <Skeleton sx={{ bgcolor: 'grey.900', p: 1, borderRadius: 3, height: "360px", width: "360px"}} variant="rectangular" />
                :   <CardMedia
                        component="img"
                        height="360px"
                        width="100%"
                        image={ asset.media.image }
                        alt={ asset.name }
                        sx={{ p: 1, borderRadius: 3 }}
                    />
            }


            <CardContent sx={{ textAlign: "left", p: 1 }}>
                <Typography gutterBottom variant="body1" component="div" sx={{ pl: 2, pr: 2, pt: 2 }}>
                    { loading ? <Skeleton sx={{ }} /> : asset.name}
                </Typography>
                <Typography variant="h6" color="" sx={{ pl: 2, pb: 2 }}>
                    {/* 0.00 btc */}
                </Typography>
            </CardContent>

            <CardActions sx={{ borderTop: "1px solid rgba(155,155,155,0.2)" }} className="hoverColor">
                {
                    loading
                    ? <Button size="small" disabled>Loading</Button>
                    :   <Link to={"/asset?name=" + asset.name}  target="_blank"  style={{ textDecoration: "none" }}>
                            <Button size="small" color="secondary">Explore</Button>
                        </Link>
                }
                
                {/* <Button size="small" sx={{color:"rgb(155,155,155)"}} href={"https://xchain.io/tx/" + props.asset.tx_hash} target="_blank">Dispenser</Button> */}
            </CardActions>

        </Card>
    )
    // }
    // else { 
    //     return (
    //     <SkeletonCard />
    // )}
}
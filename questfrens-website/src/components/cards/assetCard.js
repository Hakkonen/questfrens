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

const FailedCard = () => (
    <Card 
        sx={{ 
            width: "auto", height: "100%", border: "1px solid rgba(155,155,155,0.2)" 
        }} className="hoverColor"
    >
        <Skeleton sx={{ bgcolor: 'grey.900', p: 1, borderRadius: 3, height: "360px", width: "360px"}} variant="rectangular" />

        <CardContent sx={{ textAlign: "left", p: 1 }}>
            <Typography gutterBottom variant="body1" component="div" sx={{ pl: 2, pr: 2, pt: 2 }}>
                { <Skeleton sx={{ }} /> }
            </Typography>
        </CardContent>
        <CardActions sx={{ borderTop: "1px solid rgba(155,155,155,0.2)" }} className="hoverColor">
                <Button size="small" disabled>No metadata</Button>
        </CardActions>
    </Card>
)

export default function AssetCard(props) {

    // Asset card object
    const [ loading, setLoading ] = useState(true)
    const [ failed, setFailed ] = useState(false)
    const [ asset, setAsset ] = useState({
        "version": "xip100",
        "id": 1,
        "name": "",
        "artist": "",
        "description": "",
        "attributes": [],
        "supply": 0,
        "quantity": 1,
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

    // GoRareDb call
    const getAsset = () => fetch(`https://goraredb.herokuapp.com/get_asset?name=${props.asset.asset}`).then(response => response.json())
    useEffect(() => {
        (async () => {
            if (props.asset.asset !== "") {
                try {
                    const res = await getAsset()
                    res.quantity = props.asset.quantity
    
                    setAsset(res)
                    setLoading(false)
                } catch(e) {
                    setFailed(true)
                }

            } else {
                setFailed(true)
            }
        })();
    }, [props])
    
    // // Single asset direct xcp call
    // const getAssetData = (h) => fetch(`https://questfrens.herokuapp.com/get_asset_data?name=${h}`).then(response => response.json())
    // const [ xcpData, setXcpData ] = useState({})
    // const getDescrData = (url) => fetch(`${url}`).then(response => response.json())
    // useEffect(() => {
    //     setAsset(props.asset)

    //     // check for xip
    //     if ("media" in props.asset) {
    //         console.log("Media found")
    //     } else {
    //         (async () => {
    //             // Call xcp directly for more data
    //             try {
    //                 const assetData = await getAssetData(props.asset.asset)
    //                 // console.log(assetData)
    //                 setXcpData(assetData[0])

    //                 // Get name
    //                 let name = ""
    //                 if (assetData[0].asset[0] == "A") {
    //                     name = assetData[0].asset_longname
    //                 } else if (assetData[0].asset[0] != null) {
    //                     name = assetData[0].asset
    //                 } else {
    //                     setFailed(true)
    //                 }
    //                 setAsset(prev => ({
    //                     ...prev,
    //                     "name": name
    //                 }))
    //             } catch(e) {
    //                 console.error(e)
    //                 setFailed(true)
    //             }
    //         })();
    //     }
    // }, [props.asset])
    // // Convert direct xcp call to media
    // useEffect(() => {
    //     (async () => {
            
    //         if ("description" in xcpData && xcpData.description.includes(".json")) {
    //             try {
    //                 // Check for http prefix
    //                 if (!xcpData.description.includes("https://")) {
    //                     xcpData.description = "https://" + xcpData.description
    //                 }

    //                 // Get descr json data
    //                 const descrRes = await getDescrData(xcpData.description)
    //                 if ("image_large" in descrRes) {
    //                     setAsset(prev => ({
    //                         ...prev,
    //                         "supply": xcpData.supply,
    //                         media: {
    //                             "image": descrRes.image_large,
    //                         }
    //                     }))
    //                     setLoading(false)
    //                 } else if ("image" in descrRes) {
    //                     setAsset(prev => ({
    //                         ...prev,
    //                         "supply": xcpData.supply,
    //                         media: {
    //                             "image": descrRes.image,
    //                         }
    //                     }))
    //                     setLoading(false)
    //                 } else {
    //                     setFailed(true)
    //                 }
    //             } catch(e) {
    //                 console.error(e)
    //                 setFailed(true)
    //             }
    //         } else if (Object.keys(xcpData).length) {
    //             setFailed(true)
    //         }
    //     })();
    // }, [xcpData])
    // useEffect(() => {
    //     console.log(asset)
    // }, [asset])


    
    // Ingests xip100,
    if ("media" in props.asset) {
        console.log("xip100 found")
    } else {
    }

    // Ingests sell or buy field

    if (!failed) {
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
    }
    else { 
        return (
        <FailedCard />
    )}
}
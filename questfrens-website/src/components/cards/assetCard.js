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
import { red } from '@mui/material/colors';

const FailedCard = (props) => (
    <Card 
        sx={{ 
            width: "auto", height: "100%", border: "1px solid rgba(155,155,155,0.2)" 
        }} className="hoverColor"
    >
        <Skeleton sx={{ bgcolor: 'grey.900', p: 1, borderRadius: 3, height: { xs: 200, sm: 240, md: 300, lg: 300 }, width: "360px"}} variant="rectangular" />

        <CardContent sx={{ textAlign: "left", p: 1 }}>
            <Typography gutterBottom variant="caption" component="div" sx={{ pl: 2, pr: 2, pt: 2 }}>
                { props.asset.asset }
            </Typography>
            <Typography gutterBottom variant="caption" component="div" sx={{ pl: 2, pr: 2 }}>
                <span style={{ color: "rgb(155,155,155)" }}>QTY</span> { props.asset.quantity }
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
    const [ quant, setQuant ] = useState(0)
    // const [ failed, setFailed ] = useState(false)
    const [ asset, setAsset ] = useState({
        "version": "xip100",
        "id": 1,
        "name": "",
        "artist": "",
        "description": "",
        "attributes": [],
        "supply": 0,
        "quantity": 1,
        "issuer": 0,
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
    // useEffect(() => {
    //     console.log(asset)
    // }, [asset])

    // GoRareDb call
    const getAsset = () => fetch(`https://goraredb.herokuapp.com/get_asset?name=${props.asset.asset}`).then(response => response.json()).catch(e => {console.error(e)})

    useEffect(() => {
        (async () => {
            let retries = 0
            // setAsset(prev => ({
            //     ...prev,
            //     name: props.asset.asset,
            //     quantity: props.asset.quantity
            // }))
            setQuant(props.asset.quantity)
            if (props.asset.name !== "") {
                try {
                    const res = await getAsset()
                    // Error cases
                    if ("error" in res) {
                        console.log(res.error)
                        return false
                    }

                    // if divisible then divide
                    if(res.divisible == true) {
                        console.log(res.divisible)
                        console.log(props.asset.quantity / 100000000)
                        res.quantity = (props.asset.quantity / 100000000)
                    } else {
                        res.quantity = props.asset.quantity
                    }
    
                    if (res !== undefined) {
                        if (res.media.image == "") {
                            res.media.image = "https://counterparty.io/wp-content/uploads/2015/01/counterparty-mono.png"
                        }
                        setAsset(res)
                        setLoading(false)
                    }

                } 
                catch(e) {
                //     console.error(e)
                //     if (retries < 1) {
                //         retries += 1
                //         console.log("rety " + retries)
                //         const res = await getAsset()
                //         res.quantity = props.asset.quantity
                //         setAsset(res)
                //     } else if (retries >= 1) {
                //         console.error(e)
                //     }
                }
            }
        })();
    }, [props.asset])
    useEffect(() => {
    //     setAsset(prev => ({
    //         ...prev,
    //         quantity: props.asset.quantity
    //     }))
    }, [asset])

    // Ingests xip100,
    if ("media" in props.asset) {
        console.log("xip100 found")
    } 

    // Ingests sell or buy field

    if (asset.name !== "") {
    return(
        <Card 
            sx={{ 
                width: "auto", height: "100%", border: "1px solid rgba(155,155,155,0.2)" 
            }} className="hoverColor"
        >

            {
                asset.media.image !== "" && loading
                ?   <Skeleton sx={{ bgcolor: 'grey.900', p: 1, borderRadius: 3, width: "360px",
                height: { xs: 200, sm: 240, md: 300, lg: 300 } }} variant="rectangular" />
                :   <CardMedia
                        component="img"
                        image={ asset.media.image }
                        alt={ asset.name }
                        sx={{
                            width: "100%", p: 1, borderRadius: 3, objectFit: "contain",
                            height: { xs: 200, sm: 240, md: 300, lg: 300 }
                        } }
                    />
            }

            <CardContent sx={{ textAlign: "left", p: 1 }}>
                <Typography gutterBottom variant="caption" component="div" sx={{ pl: 2, pr: 2, pt: 2 }}>
                    { 
                        loading ? <Skeleton sx={{ }} /> : asset.name 
                    }
                </Typography>
                <Typography gutterBottom variant="caption" component="div" sx={{ pl: 2, pr: 2 }}>
                    <span style={{ color: "rgb(155,155,155)" }}>QTY</span> { asset.quantity }
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
        <FailedCard asset={props.asset} />
    )}
}
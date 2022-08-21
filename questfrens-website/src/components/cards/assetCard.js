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

    // GoRareDb call
    const getAsset = () => fetch(`https://goraredb.herokuapp.com/get_asset?name=${props.asset.asset}`).then(response => response.json()).catch(e => {console.error(e)})

    useEffect(() => {
        (async () => {
            let retries = 0
            setAsset(prev => ({
                ...prev,
                name: props.asset.asset
            }))
            if (props.asset.asset !== "") {
                try {
                    const res = await getAsset()
                    if (props.asset.asset == "PPMONRESIST.MARTIAL") {
                        console.log(res)
                    }
                    res.quantity = props.asset.quantity
    
                    setAsset(res)

                } catch(e) {
                    console.error(e)
                    if (retries < 1) {
                        retries += 1
                        const res = await getAsset()
                        res.quantity = props.asset.quantity
        
                        setAsset(res)
                    }
                }
            }
        })();
    }, [props])
    useEffect(() => {
        if (asset.media.image) {
            setLoading(false)
        }
    }, [asset.media.image])

    // Ingests xip100,
    if ("media" in props.asset) {
        console.log("xip100 found")
    } 

    // Ingests sell or buy field

    if (true) {
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
                        image={ asset.media.image }
                        alt={ asset.name }
                        sx={{
                            width: "100%", p: 1, borderRadius: 3, objectFit: "contain",
                            height: { xs: 200, sm: 240, md: 300, lg: 300 }
                        } }
                    />
            }

            <CardContent sx={{ textAlign: "left", p: 1 }}>
                <Typography gutterBottom variant="body1" component="div" sx={{ pl: 2, pr: 2, pt: 2 }}>
                    { !asset.name ? <Skeleton sx={{ }} /> : asset.name}
                </Typography>
            </CardContent>

            <CardActions sx={{ borderTop: "1px solid rgba(155,155,155,0.2)" }} className="hoverColor">
                {
                    asset.name == ""
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
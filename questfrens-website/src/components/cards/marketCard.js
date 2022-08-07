import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { address } from 'bitcoinjs-lib';

import mintPlaceholder from "../../assets/mintToken.png"
import defaultBg from "../../assets/defaultBg.gif"

export default function MarketCard(props) {

    const [ minted, setMinted ] = useState(false)
    useState (() => {
        let exists = Object.keys(props.asset).includes("minted");

        if (exists) {
            setMinted(true)
        }
    }, [])

    const [ attributes, setAttributes ] = useState({})
    useEffect(() => {
        // Check if attr exits in object
        let exists = Object.keys(props.asset).includes("attributes");
        // console.log("Attributes: " + exists)

        // Set card attributes
        if (exists) {
            setAttributes(
                props.asset.attributes
            )
        }

    }, [])

    const btcRate = parseFloat(props.asset.satoshirate) / 100000000

    return (
        <CardElement 
            asset={props.asset} 
            attributes={attributes}
            filterMinted={props.filterMinted} 
            btcRate={btcRate}
        />
    );
}

function CardElement(props) {
    const mintedStyle = {
        objectFit: "contain", background: "radial-gradient(rgb(50,55,59), rgb(28,28,30))"
    }

    const unmintedStyle = {
        objectFit: "contain"
    }

    return (
        <Card sx={{ width: "300", height: "100%", border: "1px solid rgba(155,155,155,0.2)" }} className="hoverColor">
                
            <CardMedia
                component="img"
                height="auto"
                minHeight="150px"
                width="100%"
                image={props.asset.image_large ? props.asset.image_large : mintPlaceholder}
                alt={props.asset.asset_longname}
                sx={ props.asset.minted ? mintedStyle : unmintedStyle }
            />
            
            <CardContent sx={{ textAlign: "left" }} className="hoverColor">
                <Typography gutterBottom variant="caption" component="div" sx={{ pl: 2, pt: 2 }}>
                    {props.asset.asset_longname}
                </Typography>
                <Typography variant="h6" color="" sx={{ pl: 2, pb: 2 }}>
                    {props.btcRate} btc
                </Typography>
            </CardContent>
            <CardActions sx={{ borderTop: "1px solid rgba(155,155,155,0.2)" }} className="hoverColor">
                <Button size="small" color="secondary" href={"https://xchain.io/tx/" + props.asset.tx_hash} target="_blank">Dispenser</Button>
            </CardActions>
        </Card>
    )
}
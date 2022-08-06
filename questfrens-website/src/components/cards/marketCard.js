import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { address } from 'bitcoinjs-lib';

import mintPlaceholder from "../../assets/mintToken.png"

export default function SplashCard(props) {
    const number = "1"
    const address = "1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5"

    const btcRate = parseFloat(props.asset.satoshirate) / 100000000

    // console.log(props.asset)

    return (
        <Card sx={{ width: "300", height: "100%", border: "1px solid rgba(155,155,155,0.2)" }}>
            <CardMedia
                component="img"
                height="auto"
                minHeight="150px"
                width="100%"
                image={mintPlaceholder}
                alt={props.asset.asset_longname}
                sx={{ padding: 1, objectFit: "contain" }}
            />
            
            <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="caption" component="div" sx={{ pl: 2, pt: 0 }}>
                    {props.asset.asset_longname}
                </Typography>
                <Typography variant="h6" color="" sx={{ pl: 2, pb: 2 }}>
                    {btcRate} btc
                </Typography>
            </CardContent>
            <CardActions sx={{ borderTop: "1px solid rgba(155,155,155,0.2)" }}>
                <Button size="small" color="secondary" href={"https://xchain.io/tx/" + props.asset.tx_hash} target="_blank">Dispenser</Button>
            </CardActions>
        </Card>
    );
}
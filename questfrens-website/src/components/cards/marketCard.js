import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { address } from 'bitcoinjs-lib';

import mintPlaceholder from "../../assets/mintPlaceholder.png"

export default function SplashCard(props) {
    const number = "1"
    const address = "1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5"

    const btcRate = parseFloat(props.asset.satoshirate) / 100000000

    console.log(props.asset)

    return (
        <Card sx={{ width: "100%", height: "100%" }}>
            <CardMedia
                component="img"
                height="auto"
                image={mintPlaceholder}
                alt={props.asset.asset_longname}
            />
            <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="caption" component="div" sx={{ pl: 2, pt: 1 }}>
                    {props.asset.asset_longname}
                </Typography>
                <Typography variant="h5" color="" sx={{ pl: 2 }}>
                    {btcRate} btc
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" href={"https://xchain.io/tx/" + props.asset.tx_hash} target="_blank">Dispenser</Button>
            </CardActions>
        </Card>
    );
}
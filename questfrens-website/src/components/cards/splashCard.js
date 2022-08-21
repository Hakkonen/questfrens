import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { address } from 'bitcoinjs-lib';
import { CardMedia } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';

export default function SplashCard(props) {
    const number = "1"
    const address = "1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5"

    let width = "401"
    if (props.windowSize.width < 400) {
        width = "100%"
    }
    console.log(props.windowSize)

    return (
        <Card sx={{ border: "1px solid rgba(150,150,150,0.15)" }}>
            <CardContent style={{ textAlign: "left" }}>

                {
                    props.asset.media.image
                    ?  <CardMedia 
                        component="img"
                        image={ props.asset.media.image }
                        alt={ props.asset.name }
                    />
                    : <Skeleton height="560px" width="400px" />
                }


                {/* <Box sx={{ width: "100%" }}>
                <iframe 
                    style={{border: "1px solid rgba(150,150,150,0.15)"}}
                    // width="100%" height="560"
                    width={width} height="560"
                    src={`https://frenzone.net/questfrens/card/index.html?fren=1`}
                ></iframe> 
                </Box> */}

                <Box sx={{ pl: 2, pb: 1, pt: 1, display: "flex", flexDirection: "column" }} spacing={0}>
                    <Typography color="secondary" variant="button" style={{ fontWeight: 500 }}>{props.asset.name}</Typography>
                    <Link href={`/address?hash=${props.asset.issuer}`} style={{textDecoration: "none"}}><Typography variant="button" style={{ fontWeight: 300, color: "white" }}> by {props.asset.issuer}</Typography></Link>
                </Box>
                
            </CardContent>

            {/* <CardActions>
                <Button color="secondary" size="small" >Explore</Button>
                
            </CardActions> */}
        </Card>
    );
}